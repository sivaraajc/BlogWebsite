const express = require('express');
const db = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const bcrypt = require('bcrypt');
// const multer = require('multer');
const path = require('path');
const fs = require('fs');


const app = express();
app.use(bodyparser.json({ limit: '10mb' }));
app.use(cors()); // Use cors middleware to enable CORS

db.connect('mongodb://localhost:27017/details', {
    family: 4
});

db.connection.on('error', console.error.bind(console, "error throw while connecting to db"));

db.connection.once('open', () => {
    console.log('db connected');
});



const Student = db.model('list', new db.Schema({
    username: String,
    password: String,
    age: Number,
    gender: String,
    mobile: Number
}));

app.post('/post', async (req, res) => {
    var { username, password, age, gender, mobile } = req.body;
    const pass = await bcrypt.hash(password, 10);
    var password = pass;

    const stu = {
        username,
        password,
        age,
        gender,
        mobile
    };
    const lists = await new Student(stu).save();

    res.send(lists);
});

app.post('/login', async (req, res) => {
    const { username, password, mail } = req.body;

    try {
        const user = await Student.findOne({username:username });
        console.log(user);

        if (user) {
            const pass = await bcrypt.compare(password, user.password);

            if (username === user.username && pass) {
                console.log("Success");
                res.status(200).json({ message: "Login Success", user });
            } else {
                console.log("Invalid password");
                res.status(401).json({ message: "Invalid Password" });
            }
        } else {
            console.log("User not found");
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log('Error:', error);
        res.status(500).json({ message: "Login Error" });
    }
});


app.get('/getbyName/:username',async (req,res)=>{
    const { username } = req.params;
    const uu=await Student.findOne({username:username });
    res.send(uu);
});

// const uploadDir = path.join(__dirname, 'uploads');

// // Create the 'uploads' directory if it doesn't exist
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(__dirname, 'uploads')); // Use path.join to create an absolute path
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   const upload = multer({ storage: storage });
  

// Define MongoDB schema for the Blog model
const blogSchema = new db.Schema({
  title: String,
  content: String,
  // photo: String,
  location: String,
  experience: String,
  username: String,
  mobile: Number,
  image:String,
  date:String
});

const Blog = db.model('Blog', blogSchema);

app.post('/postBlog', async (req, res) => {
  const { title, content, location, experience, username, mobile,image} = req.body;

  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const newBlog = new Blog({
    title,
    content,
    location,
    experience,
    username,
    mobile,
    image,
    date:currentDate
  });

  try {
    const savedBlog = await newBlog.save();
    console.log('Blog saved successfully:', savedBlog);
    res.status(200).json({ message: 'Blog posted successfully', blog: savedBlog });
  } catch (error) {
    console.error('Error saving blog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



app.get('/getbyBlog/:username',async (req,res)=>{
    const { username } = req.params;
    const uu=await Blog.find({username:username });
    res.send(uu);
});
app.get('/getbyIdBlog/:id',async (req,res)=>{
    const { id } = req.params;
    const uu=await Blog.find({_id:id });
    res.send(uu);
});


app.get('/getAllBlog',async (req,res)=>{
  
    const uu=await Blog.find({});
    res.send(uu);
});

app.delete('/deleteByBlog/:id',async (req,res)=>{

    const {id}=req.params;
    const uu=await Blog.deleteOne({_id:id});
    res.send(uu);

})

app.put('/updateById/:id',async (req,res)=>{

    const {id}=req.params;
    const { title, content, location, experience, username, mobile,image}=req.body;
    const currentDate = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    const uu=await Blog.updateOne({_id:id},{$set:{title:title,content:content,location:location,experience:experience,image:image,date:currentDate}});
   
    res.send(uu);
})












app.listen(3000);