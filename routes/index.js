const routerx = require('express-promise-router');
const categoriaRouter = require('./categoria.js');
const articuloRouter = require('./articulo.js');
const usuarioRouter = require('./usuario.js');
const router = routerx();

//ruta de categorias
router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);
router.use('/usuario', usuarioRouter);

module.exports = router;