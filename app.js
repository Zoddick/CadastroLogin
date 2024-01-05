// esse app.js é o arquivo raiz do projeto

const express = require ('express'); // isso é uma função, meio que importando o express

const app = express(); // aqui eu to inicializando a função e atribuindo a constante app
const User = require ('./models/User'); // importando a tabela la de User
const path = require('path');
const bodyParser = require ("body-parser");
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

const handlebars = require ("express-handlebars");

app.engine('handlebars', handlebars.engine({ defaultLayout: __dirname + '/views/layouts/main' }));
app.set('view engine','handlebars');


app.use(express.json());


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get ("/login", function (req, res){ // isso é uma rota get, rota principal
    res.render(path.join(__dirname,'./views/layouts/login'));

}); 


app.get ("/cadastrar", function (req, res){ // isso é uma rota get, rota principal
    res.render(path.join(__dirname,'./views/layouts/cadastro'));

}); 

app.get("/home", function(req,res){
    res.render(path.join(__dirname,'./views/layouts/home'));
    
})

app.post('/cadastrar', function(req,res){
 
User.create({

    name: req.body.nome,
    email:req.body.email,
    password: req.body.senha
  }).then(function(){
   return res.redirect ('/login')

  }).catch (function(erro){
  return  res.send("Erro ao cadastrar usuario")
  })

});



app.post ("/cadastrar", async (req, res) => { // rota de cadastro do tipo Post
 var dados = req.body;
   dados.senha = await bcrypt.hash(dados.password,8);

    await User.create(dados)
     
    .then (()=> {
       
        return res.json({
            erro:false,
            mensagem: "Usuario cadastrado"
        });

    }).catch (()=>{
        return res.status(400)({

            erro:true,
            mensagem: "Usuario não cadastrado"
        });
    
    });

    
});
app.post('/login', async (req,res)=>{
 const user = await User.findOne({
    attributes: ['id','email','password'],
    where: {
        email:req.body.email,
        password: req.body.senha
    }
 })
 if (user === null){
    return res.send("<h1>Email ou senha incorretos, ou usuario não cadastrado</h1>")
    }else {res.redirect('/home')}
 

})



app.listen(8080, () =>{

    console.log("Servidor iniciado na porta 8080")
});