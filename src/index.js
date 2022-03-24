const XLSX = require("xlsx");
const path = require("path");
const xl = require("excel4node");
const cobecaList = require("./cobeca");

function leerExcel(ruta) {
  const workbook = XLSX.readFile(ruta);
  const workbookSheets = workbook.SheetNames;
  const sheet = workbookSheets[0];
  const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;
}

const farmaciaList = leerExcel(
  path.join(__dirname, "..", "exelFarmacia", "exelFarmacia.xlsx")
);

const farmaciaListFinal = farmaciaList.map((item) => {
  const cobecaItem = cobecaList.filter(
    (cobecaItem) => cobecaItem.cod_barra == item.Codigo
  );
  const cobecaItemFinal = cobecaItem.map((item2) => {
    return item2.cod_articulo;
  });
  item.cod_articulo = cobecaItemFinal[0];
  return item;
});


var wb = new xl.Workbook();
var ws = wb.addWorksheet("cobeca");

ws.cell(1, 1).string("cod_articulo");
ws.cell(1, 2).string("cantidad");
ws.cell(1, 3).string("Codigo");
ws.column(3).setWidth(20);
ws.cell(1, 4).string("Descripcion");
ws.column(4).setWidth(50);
ws.cell(1, 5).string("Cantidad");
ws.cell(1, 6).string("Existencia");

farmaciaListFinal.forEach(function (item, index) {
  if(item.cod_articulo) ws.cell(index + 2, 1).number(item.cod_articulo);
  ws.cell(index + 2, 2).number(1);
  ws.cell(index + 2, 3).string(`${item.Codigo}`);
  ws.cell(index + 2, 4).string(`${item.Descripcion}`);
  ws.cell(index + 2, 5).number(item.Cantidad);
  ws.cell(index + 2, 6).number(item.Existencia);
});

const pathExel = path.join(__dirname, "..", "exelCobeca", "exelCobeca.xlsx");

wb.write(pathExel, function (err, stats) {
  if (err) {
    console.error(err);
  } else {
    console.log("archivo creado");
  }
});

const algoliaApi = 'https://vcojeyd2po-dsn.algolia.net/1/indexes/properties/query?x-algolia-agent=Algolia%20for%20JavaScript%20(3.35.1)%3B%20Browser%20(lite)&x-algolia-application-id=VCOJEYD2PO&x-algolia-api-key=e6f5ccbcdea95ff5ccb6fda5e92eb25c';
