const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const TodoModel = require('./Models/Todo');
require('dotenv').config();



const app = express()
app.use(cors())
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
app.get('/', (req, res) => {
  res.send('Todo API is running ✅');
});

app.get('/get',(req, res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.post('/add', (req, res)=>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})
app.put('/ubdate/:id',(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id:id},{done:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json(result))
    .catch(err => res.json(err));
});


app.listen(3001, () => {
    console.log("server is running");
})