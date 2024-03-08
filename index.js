
import  express  from "express";
import mongoose from "mongoose";
import Tasks from "./models/tasksmodel.js";


const app=express()
app.use(express.json())
const port = 5555;
    
app.get('/', async(req, res)=>{
     
    const Task = await Tasks.find()
    res.json(Task)

})

app.post('/', async(req, res)=>{
     
const  {title, date, finished } =req.body;
const newTasks = new Tasks({
    title, date, finished
})
 const task = await newTasks.save()
  res.json(task)
})

app.put('/:id', async(req, res)=>{
    const  {title, date, finished } =req.body;
   
    const task =  await Tasks.findById(req.params.id)

    if(task){
        task.title = title
        task.date = date
        task.finished = finished

        const updateTask = await task.save()
         res.json(updateTask)
    }

})

app.delete('/:id', async(req, res)=>{
   
    const task = await Tasks.findByIdAndDelete(req.params.id)
    res.json({Message:"task deleted"})

})




app.listen(port,()=>{
    console.log(`server is renning on port ${port}`);
})

mongoose.connect("mongodb+srv://Ecommerce:Ecommerce@atlascluster.tupy7l1.mongodb.net/task?retryWrites=true&w=majority&appName=AtlasCluster").then(()=>{
    console.log('connected to database')
})