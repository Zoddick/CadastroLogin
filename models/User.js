const Sequelize = require ('sequelize');
const db = require ('./db'); // importando a conexão que eu fiz em db e colocando ela na constante db aqui

const User = db.define( 'usuarios', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allwNull: false,
        primaryKey: true
    
    },
    name:{
        type:Sequelize.STRING,
        allwNull: false,
    },
    email:{
        type: Sequelize.STRING,
        allwNull: false
    },
    password:{
        type: Sequelize.STRING,
        allwNull: false
    }

});

// User.sync();
// verifica se tem diferença na tabela e realiza a alteração
 // User.sync({alter:true});

module.exports = User;