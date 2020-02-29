import React from 'react';
import pdfjsLib from 'pdfjs-dist/webpack';
import logo from './spinner.gif';
import howtoImg from './howto.png';
import async from 'async';
import './App.css';
import PouchDB from 'pouchdb';
import sha256 from 'sha256';
import 'react-tabulator/lib/styles.css';
import 'tabulator-tables/dist/css/tabulator.min.css'; //import Tabulator stylesheet
import {ReactTabulator} from 'react-tabulator';
import {Doughnut, Pie, Bar} from 'react-chartjs-2';
import rcolor from 'rcolor';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

window.pdfjsLib = pdfjsLib;

const defaultState = {
  value: null,
  files: [],
  loading: false,
  done: false,
  tableViewEnabled: false,
  categorySpendingEnabled: false,
	monthMap: [
		'january',
		'februari',
		'march',
		'april',
		'may',
		'june',
		'july',
		'augustus',
		'september',
		'october',
		'november',
		'december',
	],
  jeniusCategories: [
    'Account receivable',
    'Additional Income',
    'Allowance',
    'Bonus',
    'Books',
    'Business profit',
    'Cable TV',
    'Cafe',
    'Capital Gain',
    'Cash withdrawal',
    'Charity & donation',
    'Children',
    'Cinema',
    'Cost & taxes',
    'Credit Card',
    'Doctor fee',
    'Domestic helper',
    'Drugs/ medicine',
    'Education',
    'Entertainment',
    'Fashion',
    'Food & Drinks',
    'Gadget & electronics',
    'Games',
    'Gas',
    'Gasoline',
    'Gifts',
    'Groceries',
    'Hang out',
    'Healthcare',
    'Hobby',
    'House & apartment rent',
    'Housing',
    'Income',
    'Incoming',
    'Insurance',
    'Interest',
    'Investment',
    'Loans',
    'Mobile & Internet',
    'Others',
    'Outgoing',
    'Parking fee',
    'Personal care',
    'Pet',
    'Refund',
    'Reimbursment',
    'Renovation',
    'Restaurant',
    'Salary',
    'Savings',
    'Sports',
    'Top up card',
    'Top up Wallet',
    'Transportation',
    'Utilities',
    'Vehicle maintenance',
    'Wedding',
  ],
  // Main data
  rows: [],
  columns: [
    {title: 'id', field: 'id'},
    {title: 'transactionNumber', field: 'transactionNumber'},
    {title: 'dateTime', field: 'dateTime'},
    {title: 'mutationType', field: 'mutationType'},
    {title: 'category', field: 'category'},
    {title: 'entityName', field: 'entityName'},
    {title: 'entityDetail', field: 'entityDetail'},
    {title: 'amount', field: 'amount'},
  ],
  pieData: {
    all: {
      datasets: [{data: [], backgroundColor: []}],
      labels: [],
    },
  },
  pieDataCurrentRange: 'all',
  timeRangeKeys: [],
	spendingByCategoryChartType: 'Doughnut',
	chartTypes: ['Doughnut', 'Pie', 'Bar'],
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    new PouchDB('jentor').destroy().then(() => {
      window.db = new PouchDB('jentor');
      this.setState(defaultState);
    });
  };
  renderToText = pageData => {
    return new Promise((resolve, reject) => {
      let render_options = {
        normalizeWhitespace: false,
        disableCombineTextItems: false,
      };
      return pageData
        .getTextContent(render_options)
        .then(function(textContent) {
          let lastY,
            text = '';
          for (let item of textContent.items) {
            if (lastY === item.transform[5] || !lastY) {
              text += item.str;
            } else {
              text += '\n' + item.str;
            }
            lastY = item.transform[5];
          }
          resolve(text);
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  parse = data => {
    let splitted = data.text.split('CategoryTransaction Type');
    splitted.splice(0, 1);
    let text = splitted.join('CateoryTransaction Type');
    let lines = text.split('\n');
    let report = [];
    let isOnItem = false;
    let currentItem = {};
    let currentItemFieldNumber = 0;
    let lastLineThatMatters = 0;
    for (let i in lines) {
      console.log('-----------------------------------');
      console.log('line ', i);
      //if (report.length > 16) break;
      if (isOnItem) {
        switch (currentItemFieldNumber) {
          case 1:
            console.log('Field 1, time');
            currentItem.time = lines[i].trim();
            currentItemFieldNumber++;
            break;
          case 2:
            console.log('Field 2, entityName');
            currentItem.entityName = lines[i].trim();
            currentItemFieldNumber++;
            break;
          case 3:
            if (lines[i].trim().indexOf(' | ') < 0) {
              console.log('Field 3, entityDetail');
              currentItem.entityDetail = lines[i].trim();
              currentItemFieldNumber++;
              break;
            } else {
              console.log('Field 3, entityDetail skipped');
              currentItemFieldNumber++;
            }
          // eslint-disable-next-line
          case 4:
            console.log('Field 4, transactionNumber & category');
            currentItem.transactionNumber = lines[i].trim().split(' | ')[0];
            currentItem.category = lines[i].trim().split(' | ')[1];
            currentItemFieldNumber++;
            break;
          case 5:
            console.log('Field 5, amount');
            if (lines[i].trim().split(' ')[0] === '-') {
              currentItem.mutationType = 'credit';
            } else if (lines[i].trim().split(' ')[0] === '+') {
              currentItem.mutationType = 'debit';
            }
            currentItem.amount = lines[i].trim().split(' ')[1];
            isOnItem = false;
            currentItemFieldNumber = 0;
            report.push(currentItem);
            currentItem = {};
            lastLineThatMatters = i;
            break;
          default:
            // Do nothing
            break;
        }
      } else {
        let isError = false;
        let date;
        let dateString;
        try {
          date = new Date(lines[i]);
          dateString = date.toString();
        } catch (e) {
          isError = true;
        }
        if (
          !isError &&
          dateString !== 'Invalid Date' &&
          lines[i].split(' ').length === 3
        ) {
          console.log('====================================================');
          isOnItem = true;
          currentItem.date = date;
          currentItemFieldNumber = 1;
        }
      }
      console.log(lines[i]);
    }
    console.log(report);
    return report;
  };
  handlePDF = arrayBuffer => {
    let doc;
    let metaData;
    let ret = {
      numpages: 0,
      numrender: 0,
      info: null,
      metadata: null,
      text: '',
      version: null,
    };
    pdfjsLib
      .getDocument(arrayBuffer)
      .then(result => {
        doc = result;
        ret.numpages = doc.numPages;
        return doc.getMetadata();
      })
      .then(result => {
        metaData = result;
        let counter = doc.numPages;
        counter = counter > doc.numPages ? doc.numPages : counter;

        ret.text = '';
        let it = [];
        for (var i = 1; i <= counter; i++) {
          it.push(i);
        }
        async.eachSeries(
          it,
          (i, cb) => {
            doc
              .getPage(i)
              .then(pageData => {
                return this.renderToText(pageData);
              })
              .then(pageText => {
                ret.text += '\n\n' + pageText;
                cb();
                return;
              })
              .catch(err => {
                console.log(err);
                //cb(err);
                return;
              });
          },
          err => {
            if (err) console.log(err);
            ret.metaData = metaData;
            ret.numrender = counter;
            doc.destroy();
            let data = this.parse(ret);
            this.processDb(data);
          },
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  processDb = data => {
    let count = 0;
    async.eachSeries(
      data,
      (record, cb) => {
        count++;
        // Ensure it has unique id
        record._id = sha256(
          count +
            record.transactionNumber +
            record.date.toISOString() +
            record.time +
            '',
        );
        record.id = count + 1;
        record.date = new Date(record.date);
        if (
          record.time &&
          record.time.length === 5 &&
          record.time.indexOf(':') > -1
        ) {
          record.dateTime = record.date;
          record.dateTime.setHours(parseInt(record.time.split(':')[0], 10));
          record.dateTime.setMinutes(parseInt(record.time.split(':')[1], 10));
        }
        record.amount = parseInt(record.amount.replace(/,/g, ''), 10);
        window.db
          .put(record)
          .then(() => {
            cb();
          })
          .catch(err => cb(err));
      },
      err => {
        console.log(err);
        window.db.allDocs({include_docs: true}).then(docs => {
          let rows = [];
          for (let i in docs.rows) {
            rows.push(docs.rows[i].doc);
          }
          this.setState(
            {
              rows: rows,
              tableViewEnabled: true,
              categorySpendingEnabled: true,
            },
            () => {
              this.processChart();
            },
          );
        });
      },
    );
  };

  processChart = () => {
    let pieData = [];
    let cat = {all: {}};
    let end = new Date(this.state.rows[0].dateTime);
    let beginning = new Date(
      this.state.rows[this.state.rows.length - 1].dateTime,
    );
    console.log('beginning', beginning);
    console.log('end', end);
    let currentTime = new Date(beginning);
    let timeRange = {};
    timeRange[currentTime.getFullYear().toString()] =
      timeRange[currentTime.getFullYear().toString()] || [];
    timeRange[currentTime.getFullYear().toString()].push(
      currentTime.getMonth(),
    );
    let breakTimeLoop = true;
    currentTime.setDate(1);
    while (breakTimeLoop) {
      timeRange[currentTime.getFullYear().toString()] =
        timeRange[currentTime.getFullYear().toString()] || [];
      timeRange[currentTime.getFullYear().toString()].push(
        currentTime.getMonth() + 1,
      );
      if (currentTime.getMonth() + 1 === 12) {
        currentTime.setYear(currentTime.getFullYear() + 1);
        currentTime.setMonth(0);
      } else {
        currentTime.setMonth(currentTime.getMonth() + 1);
      }
      if (
        currentTime.getFullYear() === end.getFullYear() &&
        currentTime.getMonth() === end.getMonth()
      ) {
        breakTimeLoop = false;
        timeRange[currentTime.getFullYear().toString()] =
          timeRange[currentTime.getFullYear().toString()] || [];
        timeRange[currentTime.getFullYear().toString()].push(
          currentTime.getMonth() + 1,
        );
      }
    }
    for (let i in this.state.jeniusCategories) {
      cat.all[this.state.jeniusCategories[i]] = 0;
      for (let j in Object.keys(timeRange)) {
        let year = Object.keys(timeRange)[j];
        for (let k in timeRange[year]) {
          cat[year + '_' + this.state.monthMap[timeRange[year][k]-1]] =
            cat[year + '_' + this.state.monthMap[timeRange[year][k]-1]] || {};
          cat[year + '_' + this.state.monthMap[timeRange[year][k]-1] ][
            this.state.jeniusCategories[i]
          ] = 0;
        }
      }
    }
    this.setState({timeRangeKeys: Object.keys(cat).reverse()});

    console.log(JSON.parse(JSON.stringify(cat)));
    for (let i in this.state.rows) {
      let dateTime = new Date(this.state.rows[i].dateTime);
      let currentRange =
        dateTime.getFullYear() + '_' + this.state.monthMap[dateTime.getMonth()];
      console.log(currentRange);
      if (this.state.rows[i].mutationType === 'credit') {
        cat.all[this.state.rows[i].category] += this.state.rows[i].amount;
        cat[currentRange][this.state.rows[i].category] += this.state.rows[
          i
        ].amount;
      } else {
        cat.all[this.state.rows[i].category] -= this.state.rows[i].amount;
        cat[currentRange][this.state.rows[i].category] -= this.state.rows[
          i
        ].amount;
      }
    }
    let data = {
      all: {
        datasets: [{data: [], backgroundColor: []}],
        labels: [],
      },
    };
    let blankData = JSON.parse(JSON.stringify(data.all));
    let catKeys = Object.keys(cat.all);
    for (let i in catKeys) {
      let keys = Object.keys(cat);
      for (let j in keys) {
        data[keys[j]] = data[keys[j]] || JSON.parse(JSON.stringify(blankData));
        if (cat[keys[j]][catKeys[i]] > 0) {
          let color = rcolor();
          data[keys[j]].datasets[0].data.push(cat[keys[j]][catKeys[i]]);
          data[keys[j]].datasets[0].backgroundColor.push(color);
          data[keys[j]].labels.push(catKeys[i]);
        }
      }
    }
    this.setState({
      pieData: data,
      loading: false,
      done: true,
    });
  };

  handleChange = files => {
    console.log(files);
    let reader = new FileReader();
    reader.onload = () => {
      let typedArray = new Uint8Array(reader.result);
      this.setState({loading: true}, () => {
        this.handlePDF(typedArray);
      });
    };
    reader.readAsArrayBuffer(files[0]);
  };

  render() {
    return (
      <div className="App">
        {this.state.loading && (
          <img src={logo} className="App-logo" alt="logo" />
        )}
        {!this.state.done && (
          <header className="App-header">
            {!this.state.loading && (
              <div style={{width:'100%'}}>
              	<div style={{width:'100%', height:'60vh', paddingTop:'30vh'}}>
              	  <h1>Jentor</h1>
              	  <p>Your Jenius Transaction History Parser</p>
              	  <input
              	    type="file"
              	    onChange={e => this.handleChange(e.target.files)}
              	  />
              	</div>
                <div style={{backgroundImage: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMTVweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04NTMuODkzLDg2Ljk5OGMtMzguODU5LDAtNTguODExLTE2LjQ1NS03Ny45NTYtMzUuMDUxYzE4LjI5NS0xMC41MzYsNDAuODkxLTE4LjI3Niw3My4zNzgtMTguMjc2IGMzOC42ODUsMCw2NC4xMzIsMTIuNTY0LDg1LjQ4OSwyOC4zNDdDOTE2LjE5Miw3Mi4wMTIsOTAwLjgsODYuOTk4LDg1My44OTMsODYuOTk4eiBNNTI2LjI2NSw4MC45NDUgYy02LjUxNy0wLjU2Mi0xMy41OTktMC44NzktMjEuNDEtMC44NzljLTcwLjc5OSwwLTkxLjMzNywyNy4yMjktMTM0LjQzMywzNS42NjJjMTQuOTAxLDMuNzIsMzIuMTE4LDYuMDcsNTIuODk4LDYuMDcgQzQ3MC4xNzEsMTIxLjc5Nyw1MDAuMzQsMTAzLjQyMSw1MjYuMjY1LDgwLjk0NXoiIGZpbGwtb3BhY2l0eT0iLjMiLz48cGF0aCBkPSJNNjYzLjQ1OCwxMDkuNjcxYy02Ny4xMzcsMC04MC4zNDUtMjMuODI0LTEzNy4xOTMtMjguNzI2QzU2Ny4wODYsNDUuNTU1LDU5Ny4zODEsMCw2NjUuNjkxLDAgYzYxLjg1NywwLDg1LjM2OSwyNy43ODIsMTEwLjI0Niw1MS45NDdDNzM2Ljg4OCw3NC40MzQsNzE3LjQ1OSwxMDkuNjcxLDY2My40NTgsMTA5LjY3MXogTTIxNy42OCw5NC4xNjMgYzU1Ljk3MSwwLDYyLjUyNiwyNC4wMjYsMTI2LjMzNywyNC4wMjZjOS44NTgsMCwxOC41MDgtMC45MTYsMjYuNDA0LTIuNDYxYy01Ny4xODYtMTQuMjc4LTgwLjE3Ny00OC44MDgtMTM4LjY1OS00OC44MDggYy03Ny4wNjMsMC05OS45Niw0OC41NjktMTUxLjc1MSw0OC41NjljLTQwLjAwNiwwLTYwLjAwOC0xMi4yMDYtODAuMDExLTI5LjUwNnYxNi44MDZjMjAuMDAzLDEwLjg5MSw0MC4wMDUsMjEuNzgyLDgwLjAxMSwyMS43ODIgQzE2MC4wMTQsMTI0LjU3LDE1OC42MDgsOTQuMTYzLDIxNy42OCw5NC4xNjN6IE0xMjAwLjExMiw0Ni4yOTJjLTU3LjQ5MywwLTU2LjkzNSw0Ni41OTUtMTE1LjAxNSw0Ni41OTUgYy01My42MTIsMC01OS43NTUtMzkuNjE4LTExNS42MDItMzkuNjE4Yy0xNS4yNjcsMC0yNS4zODEsMy43NTEtMzQuNjksOC43NDljMzYuMDk2LDI2LjY3NSw2MC41MDMsNjIuNTUyLDExNy4zNDIsNjIuNTUyIGM2OS4yNDksMCw3NS45NTEtNDMuNTU5LDE0Ny45NjQtNDMuNTU5YzM5LjgwNCwwLDU5Ljk4NiwxMC45NDMsNzkuODg4LDIxLjc3N1Y4NS45ODIgQzEyNjAuMDk3LDY4Ljc3MSwxMjM5LjkxNiw0Ni4yOTIsMTIwMC4xMTIsNDYuMjkyeiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0xMDUyLjE0NywxMjQuNTdjLTU2Ljg0LDAtODEuMjQ3LTM1Ljg3Ni0xMTcuMzQyLTYyLjU1MmMtMTguNjEzLDkuOTk0LTM0LjAwNSwyNC45OC04MC45MTIsMjQuOTggYy0zOC44NTksMC01OC44MTEtMTYuNDU1LTc3Ljk1Ni0zNS4wNTFjLTM5LjA1LDIyLjQ4Ny01OC40NzksNTcuNzI0LTExMi40OCw1Ny43MjRjLTY3LjEzNywwLTgwLjM0NS0yMy44MjQtMTM3LjE5My0yOC43MjYgYy0yNS45MjUsMjIuNDc1LTU2LjA5Myw0MC44NTItMTAyLjk0Niw0MC44NTJjLTIwLjc3OSwwLTM3Ljk5Ni0yLjM0OS01Mi44OTgtNi4wN2MtNy44OTUsMS41NDUtMTYuNTQ2LDIuNDYxLTI2LjQwNCwyLjQ2MSBjLTYzLjgxMSwwLTcwLjM2Ni0yNC4wMjYtMTI2LjMzNy0yNC4wMjZjLTU5LjA3MiwwLTU3LjY2NSwzMC40MDctMTM3LjY2OSwzMC40MDdjLTQwLjAwNiwwLTYwLjAwOC0xMC44OTEtODAuMDExLTIxLjc4MlYxNDBoMTI4MCB2LTM3LjIxMmMtMTkuOTAzLTEwLjgzNS00MC4wODQtMjEuNzc3LTc5Ljg4OC0yMS43NzdDMTEyOC4wOTgsODEuMDExLDExMjEuMzk3LDEyNC41NywxMDUyLjE0NywxMjQuNTd6Ii8+PC9nPjwvc3ZnPg==)', height: '115px', marginTop: '-115px'}}></div>
                <div className="App-secondary-landing">
              		<img src={howtoImg} className="App-howto" alt="howto" />
                  <div className="disclaimer">Jentor is originally an unsuccessfull submission for <a href="https://www.cocreate.id/cocreation-week-2020/hackathon/">Jenius's CoCreation Week 2020 Hackathon</a>. See our proposal here.</div>
                  <div className="disclaimer">Our app does not and will not upload the PDF file to the cloud. Your document will be parsed and processed in the app/browser itself, hence zero user data will be out from your device. We know and fully understand about privacy.<br/><br/>Still unsure? Check our source code here.</div>
                </div>
              </div>
            )}
          </header>
        )}
        {this.state.done && (
          <div className="App-done-header">
            Jentor{' '}
            <button
              style={{position: 'absolute', left: 15}}
              onClick={() => {
                this.componentDidMount();
              }}>
              Reset
            </button>
          </div>
        )}
				{/* Charts! */}
        {this.state.categorySpendingEnabled && (
          <div style={{marginBottom: 50, padding: 15}}>
						<h4>Spending by Category</h4>
            <Dropdown
              options={this.state.timeRangeKeys}
              placeHolder="All (from beginning)"
              onChange={selected => {
                this.setState({pieDataCurrentRange: selected.value});
              }}
              value={this.state.pieDataCurrentRange}
            />
						{this.state.spendingByCategoryChartType === 'Doughnut' &&
            	<Doughnut
            	  data={this.state.pieData[this.state.pieDataCurrentRange]}
            	  width={500}
            	  height={300}
            	  options={{maintainAspectRatio: false}}
            	/>
						}
						{this.state.spendingByCategoryChartType === 'Pie' &&
            	<Pie
            	  data={this.state.pieData[this.state.pieDataCurrentRange]}
            	  width={500}
            	  height={300}
            	  options={{maintainAspectRatio: false}}
            	/>
						}
						{this.state.spendingByCategoryChartType === 'Bar' &&
            	<Bar
            	  data={this.state.pieData[this.state.pieDataCurrentRange]}
            	  width={500}
            	  height={300}
            	  options={{maintainAspectRatio: false}}
            	/>
						}
						<div
							style={{width:'120px', float:'right'}}
						>
            	<Dropdown
            	  options={this.state.chartTypes}
            	  placeHolder="Doughnut"
            	  onChange={selected => {
            	    this.setState({spendingByCategoryChartType: selected.value});
            	  }}
            	  value={this.state.spendingByCategoryChartType}
            	/>
						</div>
            <br />
          </div>
        )}
        {this.state.rows &&
          this.state.rows.length > 0 &&
          this.state.tableViewEnabled && (
            <ReactTabulator
              data={this.state.rows}
              columns={this.state.columns}
              tooltips={true}
              layout={'fitData'}
            />
          )}
      </div>
    );
  }
}

export default App;
