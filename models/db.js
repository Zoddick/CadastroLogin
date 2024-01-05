const Sequelize = require ('sequelize');

const conexao = new Sequelize ("banco","root", "detran123",{
    host: 'localhost',
    dialect: 'mysql'
});

conexao.authenticate()
.then(function(){
console.log("Conexão feita");
}).catch(function(){
console.log("Conexão falhou");
});

module.exports = conexao;