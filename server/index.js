const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const port = 5000;
const fs = require("fs");
const imageModel = require("./models");
const Character=require("./characterModel");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    //"mongodb+srv://sahul:FEmG5ZQcSav3DndD@cluster0.alht5.mongodb.net/imageData?retryWrites=true&w=majority",
    //"mongodb+srv://Testing:123@image.gvui4fp.mongodb.net/imageData?retryWrites=true&w=majority",
    //"mongodb+srv://Testing:123@image.gvui4fp.mongodb.net/?retryWrites=true&w=majority",
    //"mongodb+srv://Testing:123@image.gvui4fp.mongodb.net/Images?retryWrites=true&w=majority",
    "mongodb+srv://Testing:123@image.gvui4fp.mongodb.net/imageCollection?retryWrites=true&w=majority",
  
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("connected successfully"))
  .catch((err) => console.log("it has an error", err));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("Image"), (req, res) => {
  const saveImage =  imageModel({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});


app.get('/',async (req,res)=>{
  const allData = await imageModel.find()
  res.json(allData)
})


//Getting all contact
app.get('/character/:id',retri,(req,res)=>{
  //console.log(res.contactData.desc)
  //res.send(res.contactData)
  res.json(res.characterData)
  
    
 /* try{
      const contactData=await Contact.find()
      res.status(200).json(contactData)
      console.log(contactData)
  }catch(err){

      res.status(500).json({
          message:err.message
      })
  }
*/
})



app.get('/search',async (req,res)=>{
  const allData = await imageModel.find({data:req.body.text.trim()})
  res.json(allData)
})


async function retri(req,res,next){
  let characterData

  try{
      
    characterData= await Character.findById(req.params.id)
      
      if (characterData==null){
          return res.status(404).json({message:"Cannot find user"})
      }
  }catch(err){
      return res.status(500).json({message: err.message})
  }
  res.characterData = characterData
  //console.log(contactData)
  next()
}










app.listen(port, () => {
  console.log("server running successfully");
});
