const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

if (!process.env.TOKEN_SECRET ) {
    throw 'Assurer vous d\'avoir  TOKEN_SECRET dans le ficher .env';
}

const PORT = process.env.PORT || 5000
const app =express()


app.use(express.json())
app.use(bodyParser.json())

//=== User infos
const user1 ={
    'id':'AKIAIOSFODNN72349094',
    'accessKeyId':'6779ef20e75817b79602',
    'accessSecretKey':'zaijdDIahuif24ze7de',
    'name':'webmaster',
    'password': 'kawabunga'
}

//=== ROUTES

app.get('/api', function(_, res) {
    res.send({
        msg:'Hello world!'
    });
});

app.post('/api/common/auth/authorize', function(req, res) {
    const name = req.body.name
    const password = req.body.password
    if(!name || !password) res.status(400).send("Veuillez renseigner le nom et le mdps")

    if(name == user1.name && password == user1.password){
        const token = jwt.sign({id: user1.id}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.send({
            accesKeyId: user1.accessKeyId,
            accessSecretKey: user1.accessSecretKey,
            token: token
        });
    }
    else  res.status(400).send("login ou mot de passe incorrect")
});

app.get('/api/project', verifyToken, function(_, res) {
    res.send({
        msg:'Bienvenue dans le projet'
    });
});


//=== Middlewear
function verifyToken(req,res,next){
    //on verifie les clés 
    if(!(req.header('HEADERS')) ) return res.status(401).send('Accès refusé');
    let  accessKeyId = req.header('HEADERS').split(' ')[0]
    let  accessSecretKey = req.header('HEADERS').split(' ')[1]
    try {
        if (accessKeyId != user1.accessKeyId) throw "refusé!"
        if (accessSecretKey != user1.accessSecretKey) throw "refusé!"
    } catch (error) {
        res.status(401).send('Accès '+ error);
    }
    

    //On verifie le token 
    if(!(req.header('AUTH')) ) return res.status(401).send('Accès refusé!!');
    if( req.header('AUTH').split(' ')[0] === 'Bearer') 
        var token = req.header('AUTH').split(' ')[1]
    try {

        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Accès refusé!!!');
    }
}


app.listen(PORT, () => {
    console.log(`Server started: ${PORT}`)
})
