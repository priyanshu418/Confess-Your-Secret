const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');



app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended:true
}));


mongoose.connect('mongodb://localhost:27017/pracDB',{useNewUrlParser:true});
const userSchema=new mongoose.Schema({
  username:String,
  password:String
});
const User = new mongoose.model('User', userSchema );


app.get('/',function(req,res){
  res.render('home');
});

app.get('/register',function(req,res){
  res.render('register');
});

app.get('/login',function(req,res){
  res.render('login');
});

app.post('/register',function(req,res){
  const user =new User({
    username:req.body.username,
    password:req.body.password
  });
  User.insertOne(user,function(err,res){
    if(err){
      console.log(err);
    }else{
      res.redirect('/login');
    }
  });
  User.save();
});

app.listen(3000,function(req,res){
  console.log("Server is running.");
});
