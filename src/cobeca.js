const cobeca = require('../jsonCobeca/cobeca.json')

const cobecaList = cobeca.map(item => {
    const itemR = {
        "cod_articulo": item.cod_articulo,
        "cod_barra": item.cod_barra,
        "desc_articulo": item.desc_articulo,
        "proveedor": item.proveedor.descripcion,
        "porcentaje": item.porcentaje_cobeca,
        "precio": item.monto_final,
        "diasCredito": item.dias,
        "componenteBase": item.componenteBase.descripcion,
        'existencia': item.existencia,
    }
    return itemR
})

module.exports = cobecaList