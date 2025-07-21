const express = require('express')
const mongoose = require('mongoose')
const cors = require ('cors')
const TodoModel = require('./Models/Todo');



const app = express()
app.use(cors())
app.use(express.json());
mongoose.connect('mongodb+srv://sakarpartha222:7FKP2Dv9KA8UQ4Na@cluster0.yhd4aig.mongodb.net/todoApp?retryWrites=true&w=majority&appName=Cluster0')
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