const taskHandler = {}

const TASKS = []

//Retrieve All tasks
taskHandler.getTasks = async (req , res) => {
    const queryParams = req.query;
    const {sort , completed} = queryParams;
    let data = TASKS
    if(typeof completed != "undefined" && (typeof completed === 'string' && typeof JSON.parse(completed) === 'boolean')) {
        data = TASKS.filter(t => t.completed === JSON.parse(completed))
    }
    if(typeof sort != "undefined" && (typeof sort === 'string' && (sort === 'asc' || sort === 'desc'))){
        
        if(sort === 'desc') {
            data.sort((a, b) => b.creationDate - a.creationDate);
        }else{
            data.sort((a, b) => a.creationDate - b.creationDate);
        }
    }
    return res.status(200).json(data)
}

//Get task By ID
taskHandler.getTaskById = async (req , res) => {
    const taskId = req.params.id;
    const identifiedTask = TASKS.filter(t => t.id == taskId);
    if(identifiedTask.length === 0) {
        return res.status(404).json({
            status:false,
            data: ["Task Id not found"],
            message: "Task Id not found"
        })
    }
    return res.status(200).json(identifiedTask[0])
}

// Create Task
taskHandler.createTask = async (req , res) => {
    let {title , description , completed , priority } = req.body;
 
    if(!title || !description){
        return res.status(400).json({
            status:false,
            data: {},
            message: "title or description cannot be empty"
        })
    }

    if(!priority) priority = 'low'

    if(priority !== 'low' && priority!='medium' && priority != 'high') {
        return res.status(400).json({
            status:false,
            data: {},
            message: "priority should be set to low,high or medium"
        })
    }

    if(typeof completed == "undefined" || (typeof completed === 'string' && typeof JSON.parse(completed) !== 'boolean')) {
        return res.status(400).json({
            status:false,
            data: {},
            message: "completed status should be either true or false"
        })
    }else {
        completed = JSON.parse(completed)
    }

    const obj = {
        id: new Date().getTime(),
        creationDate: new Date().getTime(),
        title,
        description,
        completed,
        priority
    }
    TASKS.push(obj);

    return res.status(201).json({
        status:true,
        data: obj
    })
}


//Update task By ID
taskHandler.updateTaskById = async (req , res) => {
    const taskId = req.params.id;
    const identifiedTask = TASKS.filter(t => t.id == taskId);
    let  {description , title , completed , priority} = req.body;

    if(identifiedTask.length === 0) {
        return res.status(404).json({
            status:false,
            data: ["Task Id not found"],
            message: "Task Id not found"
        })
    }

    const tsk = identifiedTask[0];

   
    if(!description) description = tsk.description;
    if(!title) title = tsk.title;
    if(!priority) priority = tsk.priority;
  
    if(typeof completed == "undefined") completed = tsk.completed
    if(typeof completed === 'string') {
        return res.status(400).json({
            status:false,
            data: {},
            message: "completed status should be either true or false"
        })
    }else {
        completed = JSON.parse(completed)
    }

    const idx = TASKS.findIndex((item) => item.id == taskId);
    tsk.description = description
    tsk.title = title
    tsk.completed = completed
    tsk.priority = priority
    
    TASKS[idx] = tsk;

    return res.status(200).json({
        status:true,
        data: tsk,
        message: "Updated"
    })
}

//Delete task By ID
taskHandler.deleteTaskById = async (req , res) => {
    const taskId = req.params.id;
    const idx = TASKS.findIndex((item) => item.id == taskId);
    if(idx < 0) {
        return res.status(404).json({
            status:false,
            data: ["Task Id not found"],
            message: "Task Id not found"
        })
    }
    const obj = TASKS[idx];
    TASKS.splice(idx , 1);
    return res.status(200).json({
        status:true,
        data: obj,
        message: "Deleted"
    })

   
}


//Get tasks By Priority
taskHandler.getTasksByPriority = async (req , res) => {
    const level = req.params.level;

    if(level !== 'low' && level!='medium' && level != 'high') {
        return res.status(401).json({
            status:false,
            data: {},
            message: "priority should be set to low,high or medium"
        })
    }
    const identifiedTask = TASKS.filter(t => t.priority === level);
    if(identifiedTask.length === 0) {
        return res.status(404).json({
            status:false,
            data: ["Task not found"],
            message: "Task not found"
        })
    }
    return res.status(200).json({
        status:true,
        data: identifiedTask,
        message: "Fetched"
    })
}





module.exports = taskHandler