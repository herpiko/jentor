(this.webpackJsonpjentor=this.webpackJsonpjentor||[]).push([[0],{14:function(t,e){function a(t){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}a.keys=function(){return[]},a.resolve=a,t.exports=a,a.id=14},209:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),i=a(4),s=a.n(i),r=(a(76),a(56)),l=a(57),c=a(69),u=a(58),g=a(70),d=a(31),m=a.n(d),y=a(59),M=a.n(y),p=a(60),h=a.n(p),w=a(61),N=a.n(w),j=a(62),T=a.n(j),C=a(63),b=a.n(C),D=a(64),L=a.n(D),f=a(32),E=a.n(f),O=(a(96),a(65)),v=a.n(O),S=(a(99),a(100),a(66)),x=a(21),k=a(68),I=a.n(k),z=a(33),Y=a.n(z),A=a(34),U={incomingCategories:["Account receivable","Additional Income","Allowance","Bonus","Business profit","Capital Gain","Income","Incoming","Interest","Reimbursment","Salary"],outgoingCategories:["Books","Cable TV","Cafe","Cash withdrawal","Charity & donation","Children","Cinema","Cost & taxes","Credit Card","Doctor fee","Domestic helper","Drugs/ medicine","Education","Entertainment","Fashion","Food & Drinks","Gadget & electronics","Games","Gas","Gasoline","Gifts","Groceries","Hang out","Healthcare","Hobby","House & apartment rent","Housing","Insurance","Investment","Loans","Mobile & Internet","Others","Outgoing","Parking fee","Personal care","Pet","Refund","Renovation","Restaurant","Savings","Sports","Top up card","Top up Wallet","Transportation","Utilities","Vehicle maintenance","Wedding"]},B=(a(207),a(211)),Q=a(35);window.pdfjsLib=m.a,window.addCommas=function(t){for(var e=(t+="").split("."),a=e[0],n=e.length>1?"."+e[1]:"",o=/(\d+)(\d{3})/;o.test(a);)a=a.replace(o,"$1,$2");return a+n};var F={value:null,files:[],loading:!1,done:!1,tableViewEnabled:!1,categorySpendingEnabled:!1,incomingOutgoingEnabled:!1,csvString:"",csvFileName:"transaction_history",monthMap:["january","februari","march","april","may","june","july","augustus","september","october","november","december"],jeniusCategories:[],rows:[],columns:[{title:"id",field:"id"},{title:"transactionNumber",field:"transactionNumber"},{title:"dateTime",field:"dateTime"},{title:"mutationType",field:"mutationType"},{title:"category",field:"category"},{title:"entityName",field:"entityName"},{title:"entityDetail",field:"entityDetail"},{title:"amount",field:"amount"}],spendingByCategoryDataCurrentRange:"all",spendingByCategoryData:{all:{datasets:[{data:[],backgroundColor:[]}],labels:[]}},incomingOutgoingDataCurrentRange:"all",incomingOutgoingData:{all:{datasets:[{data:[],backgroundColor:[]}],labels:[]}},incomingOutgoingStackedData:{datasets:[{data:[],backgroundColor:[]},{data:[],backgroundColor:[]}],labels:[]},timeRangeKeys:[],spendingByCategoryChartType:"Pie",chartTypes:["Pie","Bar"]},P=function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(c.a)(this,Object(u.a)(e).call(this,t))).componentDidMount=function(){F.jeniusCategories=U.incomingCategories.concat(U.outgoingCategories),a.setState(F)},a.renderToText=function(t){return new Promise((function(e,a){return t.getTextContent({normalizeWhitespace:!1,disableCombineTextItems:!1}).then((function(t){var a,n="",o=!0,i=!1,s=void 0;try{for(var r,l=t.items[Symbol.iterator]();!(o=(r=l.next()).done);o=!0){var c=r.value;a!==c.transform[5]&&a?n+="\n"+c.str:n+=c.str,a=c.transform[5]}}catch(u){i=!0,s=u}finally{try{o||null==l.return||l.return()}finally{if(i)throw s}}e(n)})).catch((function(t){a(t)}))}))},a.downloadCsv=function(){},a.parse=function(t){t.text=t.text.replace(/\t/g," ");var e=t.text.split("CategoryTransaction Type");e.splice(0,1);var a=e.join("CategoryTransaction Type").split("Disclaimer")[0].split(/\r?\n/),n=[],o=!1,i={},s=0;for(var r in a)if(o)switch(s){case 1:i.time=a[r].trim(),s++;break;case 2:i.entityName=a[r].trim(),s++;break;case 3:if(a[r].trim().indexOf(" | ")<0){i.entityDetail=a[r].trim(),s++;break}s++;case 4:i.transactionNumber=a[r].trim().split(" | ")[0],i.category=a[r].trim().split(" | ")[1],s++;break;case 5:"-"===a[r].trim().split(" ")[0]?i.mutationType="credit":"+"===a[r].trim().split(" ")[0]&&(i.mutationType="debit"),o=!1,s=0,i.amount=a[r].trim().split(" ")[1],Number.isNaN(i.amount)||n.push(i),i={}}else{var l=!1,c=void 0,u=void 0;try{u=(c=new Date(a[r])).toString()}catch(g){l=!0}l||"Invalid Date"===u||3!==a[r].split(" ").length||(o=!0,i.date=c,s=1)}return n},a.handlePDF=function(t){var e,n,o={numpages:0,numrender:0,info:null,metadata:null,text:"",version:null};m.a.getDocument(t).then((function(t){return e=t,o.numpages=e.numPages,e.getMetadata()})).then((function(t){n=t;var i=e.numPages;i=i>e.numPages?e.numPages:i,o.text="";for(var s=[],r=1;r<=i;r++)s.push(r);E.a.eachSeries(s,(function(t,n){e.getPage(t).then((function(t){return a.renderToText(t)})).then((function(t){o.text+="\n\n"+t,n()})).catch((function(t){console.log(t)}))}),(function(t){t&&console.log(t),o.metaData=n,o.numrender=i,e.destroy();var s=null;try{s=a.parse(o)}catch(t){alert("An error occured!")}a.processDb(s)}))})).catch((function(t){console.log(t)}))},a.processDb=function(t){var e=-1,n=[],o="";E.a.eachSeries(t,(function(t,a){e++,t._id=v()(e+t.transactionNumber+t.date.toISOString()+t.time+""),t.id=e+1,t.date=new Date(t.date),t.time&&5===t.time.length&&t.time.indexOf(":")>-1&&(t.dateTime=t.date,t.dateTime.setHours(parseInt(t.time.split(":")[0],10)),t.dateTime.setMinutes(parseInt(t.time.split(":")[1],10))),t.amount=parseInt(t.amount.replace(/,/g,""),10),Number.isNaN(t.amount)||(n.push(t),o+="".concat(t._id,",").concat(Object(B.a)(t.dateTime,"yyyy-MM-dd HH:mm"),",").concat(t.transactionNumber,",").concat(t.mutationType,",").concat(t.category,",").concat(t.entityName,",").concat(t.entityDetail,",").concat(t.amount,"\n")),a()}),(function(t){console.log(t),a.setState({csvString:o,rows:n,tableViewEnabled:!0,categorySpendingEnabled:!0,incomingOutgoingEnabled:!0},(function(){a.processChart()}))}))},a.processChart=function(){var t={all:{}},e=new Date(a.state.rows[0].dateTime),n=new Date(a.state.rows[a.state.rows.length-1].dateTime),o=new Date(n),i={};i[o.getFullYear().toString()]=i[o.getFullYear().toString()]||[],i[o.getFullYear().toString()].push(o.getMonth());var s=!0;for(o.setDate(1);s;)i[o.getFullYear().toString()]=i[o.getFullYear().toString()]||[],i[o.getFullYear().toString()].push(o.getMonth()+1),o.getMonth()+1===12?(o.setYear(o.getFullYear()+1),o.setMonth(0)):o.setMonth(o.getMonth()+1),o.getFullYear()===e.getFullYear()&&o.getMonth()===e.getMonth()&&(s=!1,i[o.getFullYear().toString()]=i[o.getFullYear().toString()]||[],i[o.getFullYear().toString()].push(o.getMonth()+1));for(var r in a.state.jeniusCategories)for(var l in t.all[a.state.jeniusCategories[r]]=0,Object.keys(i)){var c=Object.keys(i)[l];for(var u in i[c])t[c+"_"+a.state.monthMap[i[c][u]-1]]=t[c+"_"+a.state.monthMap[i[c][u]-1]]||{},t[c+"_"+a.state.monthMap[i[c][u]-1]][a.state.jeniusCategories[r]]=0}for(var g in a.setState({timeRangeKeys:Object.keys(t).reverse()}),a.state.rows){var d=new Date(a.state.rows[g].dateTime),m=d.getFullYear()+"_"+a.state.monthMap[d.getMonth()];t[m]=t[m]||{},"credit"===a.state.rows[g].mutationType?(t.all.totalOutgoing=t.all.totalOutgoing||0,t.all.totalOutgoing+=a.state.rows[g].amount,t[m].totalOutgoing=t[m].totalOutgoing||0,t[m].totalOutgoing+=a.state.rows[g].amount):(t.all.totalIncoming=t.all.totalIncoming||0,t.all.totalIncoming+=a.state.rows[g].amount,t[m].totalIncoming=t[m].totalIncoming||0,t[m].totalIncoming+=a.state.rows[g].amount),t.all[a.state.rows[g].category]+=a.state.rows[g].amount,t[m][a.state.rows[g].category]+=a.state.rows[g].amount}var y={all:{datasets:[{data:[],backgroundColor:[]}],labels:[]}},M={all:{datasets:[{data:[],backgroundColor:[]}],labels:[]}},p={datasets:[{data:[],backgroundColor:[]},{data:[],backgroundColor:[]}],labels:[]},h=JSON.parse(JSON.stringify(y.all)),w=Object.keys(t.all);for(var N in w){console.log(w[N]);var j=Object.keys(t);for(var T in j){if(y[j[T]]=y[j[T]]||JSON.parse(JSON.stringify(h)),t[j[T]][w[N]]>0&&"totalIncoming"!==w[N]&&"totalOutgoing"!==w[N]){var C=I()();y[j[T]].datasets[0].data.push(t[j[T]][w[N]]),y[j[T]].datasets[0].backgroundColor.push(C),y[j[T]].labels.push(w[N])}if(M[j[T]]=M[j[T]]||JSON.parse(JSON.stringify(h)),M[j[T]].labels.length<2&&(M[j[T]].datasets[0].backgroundColor.push("green"),M[j[T]].labels.push("Incoming"),M[j[T]].datasets[0].data[0]=0,M[j[T]].datasets[0].backgroundColor.push("red"),M[j[T]].labels.push("Outgoing"),M[j[T]].datasets[0].data[1]=0),"totalIncoming"===w[N]){var b=t[j[T]][w[N]]||0;b+=t[j[T]][w[N]],M[j[T]].datasets[0].data[0]=b}else if("totalOutgoing"===w[N]){var D=M[j[T]].datasets[0].data[1]||0;D+=t[j[T]][w[N]],M[j[T]].datasets[0].data[1]=D}if(p.labels.indexOf(j[T])<0&&"all"!==j[T]&&p.labels.push(j[T]),p.datasets[0].label=p.datasets[0].label||"Incoming",p.datasets[0].backgroundColor="deepskyblue","totalIncoming"===w[N]&&t[j[T]][w[N]]&&parseInt(t[j[T]][w[N]],10)>0&&p.datasets[0].data.push(parseInt(t[j[T]][w[N]],10)),p.datasets[1].label=p.datasets[1].label||"Outgoing",p.datasets[1].backgroundColor="maroon","totalOutgoing"===w[N]&&t[j[T]][w[N]]&&parseInt(t[j[T]][w[N]],10)>0){var L=parseInt(t[j[T]][w[N]],10);L=0-L,p.datasets[1].data.push(L)}}}console.log(p),a.setState({spendingByCategoryData:y,incomingOutgoingData:M,incomingOutgoingStackedData:p,loading:!1,done:!0})},a.handleChange=function(t){var e=new FileReader;e.onload=function(){var t=new Uint8Array(e.result);a.setState({loading:!0},(function(){a.handlePDF(t)}))},e.readAsArrayBuffer(t[0])},a.state={},a}return Object(g.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return o.a.createElement("div",{className:"App"},this.state.loading&&o.a.createElement("div",{style:{marginTop:"40vh"}},o.a.createElement("img",{src:M.a,className:"App-logo",alt:"logo"})),!this.state.done&&o.a.createElement("header",{className:"App-header"},!this.state.loading&&o.a.createElement("div",{style:{width:"100%"}},o.a.createElement("div",{style:{width:"100%",height:"60vh",paddingTop:"30vh"}},o.a.createElement("h1",null,"Jentor"),o.a.createElement("p",null,"Your Jenius Transaction History Parser"),o.a.createElement("input",{type:"file",onChange:function(e){return t.handleChange(e.target.files)}}),o.a.createElement("p",{style:{fontSize:"11px"}},"The parser only supports English version of transaction history document")),o.a.createElement("div",{style:{backgroundImage:"url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMTVweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGZpbGw9IiNmZmZmZmYiPjxwYXRoIGQ9Ik04NTMuODkzLDg2Ljk5OGMtMzguODU5LDAtNTguODExLTE2LjQ1NS03Ny45NTYtMzUuMDUxYzE4LjI5NS0xMC41MzYsNDAuODkxLTE4LjI3Niw3My4zNzgtMTguMjc2IGMzOC42ODUsMCw2NC4xMzIsMTIuNTY0LDg1LjQ4OSwyOC4zNDdDOTE2LjE5Miw3Mi4wMTIsOTAwLjgsODYuOTk4LDg1My44OTMsODYuOTk4eiBNNTI2LjI2NSw4MC45NDUgYy02LjUxNy0wLjU2Mi0xMy41OTktMC44NzktMjEuNDEtMC44NzljLTcwLjc5OSwwLTkxLjMzNywyNy4yMjktMTM0LjQzMywzNS42NjJjMTQuOTAxLDMuNzIsMzIuMTE4LDYuMDcsNTIuODk4LDYuMDcgQzQ3MC4xNzEsMTIxLjc5Nyw1MDAuMzQsMTAzLjQyMSw1MjYuMjY1LDgwLjk0NXoiIGZpbGwtb3BhY2l0eT0iLjMiLz48cGF0aCBkPSJNNjYzLjQ1OCwxMDkuNjcxYy02Ny4xMzcsMC04MC4zNDUtMjMuODI0LTEzNy4xOTMtMjguNzI2QzU2Ny4wODYsNDUuNTU1LDU5Ny4zODEsMCw2NjUuNjkxLDAgYzYxLjg1NywwLDg1LjM2OSwyNy43ODIsMTEwLjI0Niw1MS45NDdDNzM2Ljg4OCw3NC40MzQsNzE3LjQ1OSwxMDkuNjcxLDY2My40NTgsMTA5LjY3MXogTTIxNy42OCw5NC4xNjMgYzU1Ljk3MSwwLDYyLjUyNiwyNC4wMjYsMTI2LjMzNywyNC4wMjZjOS44NTgsMCwxOC41MDgtMC45MTYsMjYuNDA0LTIuNDYxYy01Ny4xODYtMTQuMjc4LTgwLjE3Ny00OC44MDgtMTM4LjY1OS00OC44MDggYy03Ny4wNjMsMC05OS45Niw0OC41NjktMTUxLjc1MSw0OC41NjljLTQwLjAwNiwwLTYwLjAwOC0xMi4yMDYtODAuMDExLTI5LjUwNnYxNi44MDZjMjAuMDAzLDEwLjg5MSw0MC4wMDUsMjEuNzgyLDgwLjAxMSwyMS43ODIgQzE2MC4wMTQsMTI0LjU3LDE1OC42MDgsOTQuMTYzLDIxNy42OCw5NC4xNjN6IE0xMjAwLjExMiw0Ni4yOTJjLTU3LjQ5MywwLTU2LjkzNSw0Ni41OTUtMTE1LjAxNSw0Ni41OTUgYy01My42MTIsMC01OS43NTUtMzkuNjE4LTExNS42MDItMzkuNjE4Yy0xNS4yNjcsMC0yNS4zODEsMy43NTEtMzQuNjksOC43NDljMzYuMDk2LDI2LjY3NSw2MC41MDMsNjIuNTUyLDExNy4zNDIsNjIuNTUyIGM2OS4yNDksMCw3NS45NTEtNDMuNTU5LDE0Ny45NjQtNDMuNTU5YzM5LjgwNCwwLDU5Ljk4NiwxMC45NDMsNzkuODg4LDIxLjc3N1Y4NS45ODIgQzEyNjAuMDk3LDY4Ljc3MSwxMjM5LjkxNiw0Ni4yOTIsMTIwMC4xMTIsNDYuMjkyeiIgZmlsbC1vcGFjaXR5PSIuNSIvPjxwYXRoIGQ9Ik0xMDUyLjE0NywxMjQuNTdjLTU2Ljg0LDAtODEuMjQ3LTM1Ljg3Ni0xMTcuMzQyLTYyLjU1MmMtMTguNjEzLDkuOTk0LTM0LjAwNSwyNC45OC04MC45MTIsMjQuOTggYy0zOC44NTksMC01OC44MTEtMTYuNDU1LTc3Ljk1Ni0zNS4wNTFjLTM5LjA1LDIyLjQ4Ny01OC40NzksNTcuNzI0LTExMi40OCw1Ny43MjRjLTY3LjEzNywwLTgwLjM0NS0yMy44MjQtMTM3LjE5My0yOC43MjYgYy0yNS45MjUsMjIuNDc1LTU2LjA5Myw0MC44NTItMTAyLjk0Niw0MC44NTJjLTIwLjc3OSwwLTM3Ljk5Ni0yLjM0OS01Mi44OTgtNi4wN2MtNy44OTUsMS41NDUtMTYuNTQ2LDIuNDYxLTI2LjQwNCwyLjQ2MSBjLTYzLjgxMSwwLTcwLjM2Ni0yNC4wMjYtMTI2LjMzNy0yNC4wMjZjLTU5LjA3MiwwLTU3LjY2NSwzMC40MDctMTM3LjY2OSwzMC40MDdjLTQwLjAwNiwwLTYwLjAwOC0xMC44OTEtODAuMDExLTIxLjc4MlYxNDBoMTI4MCB2LTM3LjIxMmMtMTkuOTAzLTEwLjgzNS00MC4wODQtMjEuNzc3LTc5Ljg4OC0yMS43NzdDMTEyOC4wOTgsODEuMDExLDExMjEuMzk3LDEyNC41NywxMDUyLjE0NywxMjQuNTd6Ii8+PC9nPjwvc3ZnPg==)",height:"115px",marginTop:"-115px"}}),o.a.createElement("div",{className:"App-secondary-landing"},o.a.createElement("h2",null,"How to"),o.a.createElement("img",{src:h.a,className:"App-howto",alt:"howto",style:{marginBottom:15}}),o.a.createElement("br",null),o.a.createElement("h2",null,"Screenshots"),o.a.createElement("img",{src:N.a,className:"App-demo",alt:"howto",style:{marginBottom:15}}),o.a.createElement("br",null),o.a.createElement("img",{src:T.a,className:"App-demo",alt:"howto",style:{marginBottom:15}}),o.a.createElement("br",null),o.a.createElement("img",{src:b.a,className:"App-demo",alt:"howto",style:{marginBottom:15}}),o.a.createElement("br",null),o.a.createElement("img",{src:L.a,className:"App-demo",alt:"howto",style:{marginBottom:50}}),o.a.createElement("br",null),o.a.createElement("h2",null,"About"),o.a.createElement("div",{className:"disclaimer"},"Jentor was originally an unsuccessful submission for"," ",o.a.createElement("a",{href:"https://www.cocreate.id/cocreation-week-2020/hackathon/"},"Jenius's CoCreation Week 2020 Hackathon"),". See"," ",o.a.createElement("a",{href:"https://github.com/herpiko/jentor/blob/master/jentor.pdf"},"our proposal here"),"."),o.a.createElement("div",{className:"disclaimer"},o.a.createElement("h4",null,"Disclaimer"),"This is still a work-in-progress, may contains bugs, and only supports the English version of transaction history document. Also there is no guarantee that the parser will always work as expected or the generated data will be in full accuracy. If Jenius decided to change the PDF layout or column of the report then Jentor may fail. The use or reliance of any information generated on this app is solely at your own risk.",o.a.createElement("br",null),o.a.createElement("br",null),"Our app does not and will not upload the PDF file to the cloud. Your document will be parsed and processed in the app/browser itself, hence zero user data will be out from your device. We can not and will not try to obtain your data. We know and fully understand about privacy. ",o.a.createElement("br",null),o.a.createElement("br",null),"Unsure? Check our"," ",o.a.createElement("a",{href:"https://github.com/herpiko/jentor"},"source code here"),"."),o.a.createElement("div",{className:"disclaimer footer"},o.a.createElement("span",{style:{fontSize:11}},"Made in rush with <3.",o.a.createElement("br",null),o.a.createElement("br",null),"Jenius is a trademark or a registered trademark of PT. Bank Tabungan Pensiunan Nasional"))))),this.state.done&&o.a.createElement("div",{className:"App-done-header"},"Jentor"," ",o.a.createElement("button",{style:{position:"absolute",left:15},onClick:function(){t.componentDidMount()}},"Reset")),this.state.categorySpendingEnabled&&o.a.createElement("div",{style:{marginBottom:50,padding:15}},o.a.createElement("h4",null,"Spending by Category"),o.a.createElement("div",{style:{width:"300px",margin:"0 auto"}},o.a.createElement(Y.a,{options:this.state.timeRangeKeys,placeHolder:"All (from beginning)",onChange:function(e){t.setState({spendingByCategoryDataCurrentRange:e.value})},value:this.state.spendingByCategoryDataCurrentRange})),"Pie"===this.state.spendingByCategoryChartType&&o.a.createElement(x.b,{data:this.state.spendingByCategoryData[this.state.spendingByCategoryDataCurrentRange],width:500,height:300,options:{maintainAspectRatio:!1,tooltips:{callbacks:{label:function(t,e){var a=e.labels[t.index];return a+": Rp. "+window.addCommas(e.datasets[0].data[t.index].toString())}}}}}),"Bar"===this.state.spendingByCategoryChartType&&o.a.createElement(x.a,{data:this.state.spendingByCategoryData[this.state.spendingByCategoryDataCurrentRange],width:500,height:300,options:{maintainAspectRatio:!1,tooltips:{callbacks:{label:function(t,e){return"Rp. "+window.addCommas(e.datasets[0].data[t.index].toString())}}}}}),o.a.createElement("div",{style:{width:"120px",float:"right"}},o.a.createElement(Y.a,{options:this.state.chartTypes,placeHolder:"Pie",onChange:function(e){t.setState({spendingByCategoryChartType:e.value})},value:this.state.spendingByCategoryChartType})),o.a.createElement("br",null)),this.state.incomingOutgoingEnabled&&o.a.createElement("div",{style:{marginBottom:50,padding:15}},o.a.createElement("h4",null,"Total Incoming vs Total Outgoing"),o.a.createElement("div",{style:{marginTop:"-15px",marginBottom:15,fontSize:11}},"Based on ",o.a.createElement("a",{href:"https://raw.githubusercontent.com/herpiko/jentor/master/src/categories.js"},"this classification")),o.a.createElement(x.a,{data:this.state.incomingOutgoingStackedData,options:{tooltips:{callbacks:{label:function(t,e){return"Rp. "+window.addCommas(t.value)}}},scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0}]}}})),o.a.createElement("div",null,o.a.createElement(A.BrowserView,null,this.state.rows&&this.state.rows.length>0&&this.state.tableViewEnabled&&o.a.createElement("div",null,o.a.createElement("h4",null,"Table"),o.a.createElement("div",null,"CSV file name: ",o.a.createElement("input",{placeHolder:"transaction_history",value:this.state.csvFileName,onChange:function(e){t.setState({csvFileName:e.target.value})}}),"\xa0\xa0",o.a.createElement("a",{href:"data:application/octet-stream;base64,"+Object(Q.encode)(this.state.csvString),download:this.state.csvFileName+".csv"},"Download CSV")),o.a.createElement("br",null),o.a.createElement(S.ReactTabulator,{data:this.state.rows,columns:this.state.columns,tooltips:!0,layout:"fitData"}))),o.a.createElement(A.MobileView,null,this.state.rows&&this.state.rows.length>0&&this.state.tableViewEnabled&&o.a.createElement("div",{style:{margin:15}},o.a.createElement("h4",null,"Table"),o.a.createElement("div",null,"CSV file name: ",o.a.createElement("input",{placeHolder:"transaction_history",value:this.state.csvFileName,onChange:function(e){t.setState({csvFileName:e.target.value})}}),"\xa0\xa0",o.a.createElement("a",{href:"data:application/octet-stream;base64,"+Object(Q.encode)(this.state.csvString),download:this.state.csvFileName+".csv"},"Download CSV")),o.a.createElement("br",null),"Table view does not work well on mobile browser, please use a desktop browser instead."))))}}]),e}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},59:function(t,e,a){t.exports=a.p+"static/media/spinner.c460e012.gif"},60:function(t,e,a){t.exports=a.p+"static/media/howto.577ef68a.png"},61:function(t,e,a){t.exports=a.p+"static/media/spending_by_category.b7a0b8c1.png"},62:function(t,e,a){t.exports=a.p+"static/media/spending_by_category_pie.090cf567.png"},63:function(t,e,a){t.exports=a.p+"static/media/incoming_outgoing.52dcea3b.png"},64:function(t,e,a){t.exports=a.p+"static/media/table.58e21afc.png"},71:function(t,e,a){t.exports=a(209)},76:function(t,e,a){},81:function(t,e){},83:function(t,e){},84:function(t,e){},85:function(t,e){},86:function(t,e){},96:function(t,e,a){}},[[71,1,2]]]);