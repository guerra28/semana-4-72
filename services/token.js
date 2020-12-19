const jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async(token) => {
    let __id = null;
    try {
        const { id } = await jwt.decode(token);
        __id = id;
    } catch (e) {
        return false;
    }
    const user = await models.Usuario.findOne({ where: { id: __id, estado: 1 } });

    if (user) {
        const token = jwt.sign({ id: __id }, 'config.secret', { expiresIn: '1d' });
        return { token, rol: user.rol };
    } else { return false; }
}
module.exports = {

    //generar el token
    encode: async(id, rol) => {

        const token = jwt.sign({ id: id, rol: rol },
            'config.secret', {
                expiresIn: 84600
            });

        return token;
    },
    //permite decodificar el token
    decode: async(token) => {

        try {


            const { id } = await jwt.verify(token, 'config.secret');

            const user = await models.Usuario.findOne({ where: { id: id } });

            if (user) {

                return user;
            } else {

                return false;
            }
        } catch (e) {

            const newToken = await checkToken(token);

            return newToken;
        }


    }
}