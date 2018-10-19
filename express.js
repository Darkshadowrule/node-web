const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var port=process.env.PORT||3000;
var app=express();
app.set('view engine','hbs')
hbs.registerPartials(__dirname+'/views/template')
app.use(express.static(__dirname+'/public'));
// app.use((req,res,next)=>{
//   res.render("maintenance.hbs",{
//     title:'darkshadow'
//   });
// })

app.get('/',(req,res)=>
{
  res.render('home.hbs',{
    title:'Darkshadow',
    msg:'Welcome',
    currentyear:new Date().getFullYear()
  })
})
app.use((req,res,next)=>{
  var now=new Date().toString()
  var log=`${now} : ${req.method} ${req.url}`
  console.log(log);
  fs.appendFileSync("Hello.log",log+"\n")
  next()
})
app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    title:'Darkshadow',
    msg:'Portfolio'
  })
})

app.get('/about',(req,res)=>{
  res.render("about.hbs",{
    pagetitle:'Darkshadow',
    currentyear:new Date().getFullYear()
  })
})
app.listen(port,()=>
{
  console.log(`Server is running on port ${port}`);
})
