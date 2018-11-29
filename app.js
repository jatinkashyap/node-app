import express from 'express';
import bodyParser from 'body-parser';
import db from './db/db';

const app = express();

//Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// GET request
app.get('/api/v1/todos', (req,res) => {
    res.status(200).send({
        success:'true',
        messages: 'todos retrieved successfully',
        todos: db
    })
});

//GET request to get one id
app.get('/api/v1/todos/:id',(req,res) => {
    const id = parseInt(req.params.id,10);
    db.map((todo) => {
        if(todo.id === id){
            return res.status(200).send({
                success: 'true',
                message: 'todo retrieved successfully',
                todo
            });
        }
    });
    
    return res.status(400).send({
        success: 'false',
        message: "todo doesn't exist"
    });
});


//POST request
app.post('/api/v1/todos',(req,res) => {
    if(!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }else if(!req.body.description){
        return res.status(400).send({
            success: 'false',
            message: 'description is required'
        });
    }
    const todo = {
        id : db.length + 1,
        title: req.body.title,
        description: req.body.description
    }
    db.push(todo);
    return res.status(200).send({
        success: 'true',
        message: 'todo added successfully'
    });
});

// Delete request

app.delete('/api/v1/todos/:id',(req,res) => {
    const id = parseInt(req.params.id,10);
    db.map((todo,index) => {
        if(todo.id === id){
            db.splice(index,1);
            return res.status(200).send({
                success: 'true',
                message: 'todo deleted successfully'
            });
        }
    });
    return res.status(400).send({
        success: 'false',
        message: 'todo not found'
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});