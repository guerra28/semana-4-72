const routerx = require('express-promise-router');
const usuarioController = require('../controllers/UsuarioController');
const auth = require('../middlewares/auth');

const router = routerx();

router.post('/login', usuarioController.login);
router.get('/list', usuarioController.list);
router.put('/update', auth.verifyUsuario, usuarioController.update);
router.post('/register', usuarioController.register);
router.put('/activate', auth.verifyUsuario, usuarioController.activate);
router.put('/deactivate', auth.verifyUsuario, usuarioController.deactivate);

module.exports = router;