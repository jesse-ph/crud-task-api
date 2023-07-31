const express = require('express');
const app = express();
const mongoose = require('./db/mongoose');

const TaskList = require('./db/models/taskList');
const Task = require('./db/models/task');

/**
 * CORS - Cross Origin Request Security
 * Backend - Ex. http://localhost:3000
 * Frontend - http://localhost:4200
 */

// 3rd party library is app.use(cors())
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Pass to next layer of middleware
    next();
});

// Example of middleware
app.use(express.json()); // or 3rd party body parser

//Routes or Rest API Endpoints or Restful webservices endpoints
/**
 * TaskList - Create, Update, ReadTaskListById, ReadAllTaskList,
 * Task - Create, Update, ReadTaskById, ReadAllTasks
 */
// Routes or API Endpoints for TaskList model
//Get All Task Lists
app.get('/tasklists', (req, res) => {
    TaskList.find({})
        .then((lists) => {
            res.status(200);
            res.send(lists)
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        })
});

//route/endpoint to get one tasklist by tasklistid
app.get('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;

    TaskList.find({ _id: tasklistId })
        .then((tasklist) => {
            res.status(200);
            res.send(tasklist)
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        })
});

// Route/endpoint for creating a taskList
app.post('/tasklists', (req, res) => {
    console.log(req.body);
    let taskListObj = { 'title': req.body.title };
    TaskList(taskListObj).save()
        .then((lists) => {
            res.status(201);
            res.send(lists);
        })
        .catch((error) => {
            console.log(error);
            res.status(500);
        })
});

// Update - put is full update of object
app.put('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;

    TaskList.findOneAndUpdate({ _id: tasklistId}, { $set: req.body })
        .then((tasklist) => {
            res.status(200);
            res.send(tasklist)
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        })
});
// Update - Patch is partial update of one field of an object
app.patch('/tasklists/:tasklistId', (req, res) => {
    let tasklistId = req.params.tasklistId;
    TaskList.findOneAndUpdate({ _id: tasklistId}, { $set: req.body })
        .then((tasklist) => {
            res.status(200);
            res.send(tasklist)
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        })
});
//Delete a tasklist by id
app.delete('/tasklists/:tasklistId', (req, res) => {
    TaskList.findByIdAndDelete(req.params.tasklistId)
        .then((tasklist) => {
            res.status(201).send(tasklist)
        })
        .catch((error) => {
            console.log(error);
            res.status(500)
        })
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});