const express= require('express');
const BookData = require('./src/model/Bookdata');
const authorData = require('./src/model/authordata');
const cors = require('cors');
var bodyparser=require('body-parser');
const app = new express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(bodyparser.json());

username="admin"
password="1234"


app.get('/books',function(req,res){
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    BookData.find()
    .then(function (books) {
        // console.log(books);
        res.send(books);
        
    });
});

app.get('/authors',function(req,res){
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    authorData.find()
    .then(function (authors) {
        // console.log(books);
        res.send(authors);
        
    });
});

app.get('/book/:id',(req, res) => {
  
    const id = req.params.id;
      BookData.findById({_id:id})
      .then((book)=>{
        //   console.log(book)
          res.send(book);
      });
  })

  app.get('/author/:id',(req, res) => {
  
    const id = req.params.id;
      authorData.findById({_id:id})
      .then((author)=>{
        //   console.log(book)
          res.send(author);
      });
  })



app.post('/insert',function(req,res){
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    // console.log(req.body);
    var item={
        bookname: req.body.book.bookname,
        author: req.body.book.author,
        genre: req.body.book.genre,
        imageurl: req.body.book.imageurl
    }
    // console.log(item);

    var  product= new BookData(item);
    product.save(function(){
        // console.log(product);
    });



});


app.delete('/remove/:id',(req,res)=>{
   
    id = req.params.id;
    BookData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })


  app.delete('/removeauthor/:id',(req,res)=>{
   
    id = req.params.id;
    authorData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  })



app.post('/addauthor',function(req,res){
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    // console.log(req.body);
    var item={
        authorname: req.body.author.authorname,
        genre: req.body.author.genre,
        work: req.body.author.work,
        imageurl: req.body.author.imageurl
    }
    // console.log(item);

    var  author= new authorData(item);
    author.save(function(){
        // console.log(product);
    });



});


app.post('/admin',(req,res)=>{

    let userdata=req.body;

    if(username !=userdata.uname){
        res.status(401).send('invalid username')
    }else if(password != userdata.password){
        res.status(401).send('invalid password')
    }else{
        res.status(200).send()
    }

});



app.put('/update',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    // console.log(req.body);
    console.log(req.body.bookname)
    id=req.body._id;
    console.log(id)
    var item1={
        bookname: req.body.bookname,
        author: req.body.author,
        genre: req.body.genre,
        imageurl: req.body.imageurl
    }
    console.log(item1);
    BookData.findByIdAndUpdate({'_id':id},
                                {$set:{'bookname': req.body.bookname,
                                    'author': req.body.author,
                                    'genre': req.body.genre,
                                    'imageurl': req.body.imageurl}})
   .then(function(){
      
           
      
        res.send();
      

   })
 })
 app.put('/authorupdate',(req,res)=>{
    res.header("Access-Control-Allow-Orgin","*")
    res.header('Access-Control-Allow-Method:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    // console.log(req.body);
    console.log(req.body.authorname)
    id=req.body._id;
    console.log(id)
    var item1={
        authorname: req.body.authorname,
        genre: req.body.genre,
        work: req.body.work,
        imageurl: req.body.imageurl
    }
    console.log(item1);
   authorData.findByIdAndUpdate({'_id':id},
                                {$set:{'authorname': req.body.authorname,
                                    'genre': req.body.genre,
                                    'work': req.body.work,
                                    'imageurl': req.body.imageurl}})
   .then(function(){
      
           
      
        res.send();
      

   })
 })


app.listen(port,()=>{console.log("server Ready at " + port)});