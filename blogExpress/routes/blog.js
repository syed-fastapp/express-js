const express = require('express')
const path = require('path')
const blogs = require('../data/blogs')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const dbservice = require('../dbservice')
const { response } = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname, '../templates/index.html'))
    
    res.render('home');
})

router.get('/blog', (req, res)=>{ 
    // res.sendFile(path.join(__dirname, '../templates/bloghome.html'))
    const db = dbservice.getDbServiceInstance();
    const result = db.getAllBlogs();
    // const blogs = () => {
    result.then(blog => {
        res.render('blogHome', {
            blogs: blog
        });
    })
})
router.get('/admin', (req,res) =>{
    const db = dbservice.getDbServiceInstance();
    const result = db.getAllBlogs();
    result.then(blog => {
        res.render('admin', {
            blogs: blog
        });
    })
    // res.sendFile(path.join(__dirname, '../admin/admin.html'))
})

router.get('/blogs', (req,res) =>{
    const db = dbservice.getDbServiceInstance();
    const result = db.getAllBlogs();
    result.then(blog => {
        res.json({data: blog})
    })
})

router.post('/add', (req,res) => {
    const { title } = req.body;
    const { body } = req.body;
    const db = dbservice.getDbServiceInstance();
    const result = db.addBlog(title, body);
    result.then(data => res.json({data: data}))
    .catch(err=> console.log(err))
});

router.get('/blogpost/:id', (req, res)=>{ 
    const db = dbservice.getDbServiceInstance();
    const result = db.getBlog(req.params.id); 
    result.then(blog => {
        console.log(blog)
        res.render('blogPage', {
            blogs: blog[0]
        });
    })  

})

router.patch('/update', (request, response) => {
    const { id, title, body } = request.body;
    console.log(request.body)
    const db = dbservice.getDbServiceInstance();

    const result = db.updateBlogById(id, title, body);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

router.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbservice.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

module.exports = router