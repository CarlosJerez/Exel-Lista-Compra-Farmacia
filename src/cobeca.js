const cobeca = require('../jsonCobeca/cobeca.json')

const cobecaList = cobeca.map(item => {
    const itemR = {
        "cod_articulo": item.cod_articulo,
        "cod_barra": item.cod_barra,
        "desc_articulo": item.desc_articulo,
        "proveedor": item.proveedor.descripcion,
    }
    return itemR
})

module.exports = cobecaList