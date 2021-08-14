const { urlencoded } = require('express');
const express= require('express');
const port = 8000;
const path = require('path');
const db= require('./config/mongoose');
const app=express();
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
const Contact =require('./models/contact');
var ContactList = [
    {name: "Stuart",
    phone: "0987650000"
    },
    {name: "Dexter",
    phone: "8765432000"
    },
    {name: "Celina",
    phone: "8765505432"
    }
]
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err){
        console.log('Error in loading from DB');
        return ;
        }
       return res.render('home',{
       title: "Contact List",
       contacts: contacts
    });
  });
});
app.get('/practice',function(req,res){
    return res.render('practice');
 });  
app.post('/create-contact', function(req,res){
    //ContactList.push(req.body);
    Contact.create(req.body
    ,function(err,newContact){
        if(err){
       console.log("Error in creating contact !");
        return;}
        console.log('*******',newContact);
        return res.redirect('back');
    });
});     
app.get('/delete-contact',function(req,res){
    //console.log(req.params);
    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting from database');
            return;
        }
        return res.redirect('back');
    });
});                                   
app.listen(port, function(err){
    if(err)
    console.log('Error in running the server',err);
    console.log('Server is running ',port);
});