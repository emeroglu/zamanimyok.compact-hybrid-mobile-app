var modules = "/usr/local/lib/node_modules";
//var modules = "C:/Users/emero/AppData/Roaming/npm/node_modules";

var connect = require(modules + '/connect');
var serveStatic = require(modules + '/serve-static');

var path = "/Users/emeroglu/Documents/SourceTree/zamanimyok/Web/zamanimyok.com";

var web = connect().use(serveStatic(path + "/zamanimyok.com/Files"));
var cms = connect().use(serveStatic(path + "/cms.zamanimyok.com/Files"));
var crm = connect().use(serveStatic(path + "/crm.zamanimyok.com/Files"));
var cpi = connect().use(serveStatic(path + "/cpi.zamanimyok.com/Files"));
var app = connect().use(serveStatic(path + "/app.zamanimyok.com/Files"));

web.listen(8081, function () { console.log('zamanimyok.com running on 8081...'); });
cms.listen(8082, function () { console.log('cms.zamanimyok.com running on 8082...'); });
crm.listen(8083, function () { console.log('crm.zamanimyok.com running on 8083...'); });
cpi.listen(8084, function () { console.log('cpi.zamanimyok.com running on 8084...'); });
app.listen(8085, function () { console.log('app.zamanimyok.com running on 8085...'); });