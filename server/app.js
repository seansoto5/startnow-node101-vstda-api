const express     = require('express');
      morgan      = require('morgan');
      app         = express();
      bodyParser  = require('body-parser');

var statusResponse = {
    status: 'ok'
}

var toDoList = [{
    todoItemId: 0,
    name: 'an item',
    priority: 3,
    completed: false
},
{
    todoItemId: 1,
    name: 'another item',
    priority: 2,
    completed: false
},
{
    todoItemId: 2,
    name: 'a done item',
    priority: 1,
    completed: true
}
];

app.use(bodyParser.json()); //supports JSON encoded bodies
app.use(bodyParser.urlencoded({extended: true})); //support encoded bodies

//Respond with a generic object
app.get('/', (req, res) => {
    res.status(200).send(statusResponse);
});

//Respond with all items in the dataset
app.get('/api/TodoItems', (req, res) => {
    res.status(200).send(toDoList);
});

//Using a route parameter to respond with a specific item with matching ID
app.get('/api/todoItems/:number', (req, res) => {
    for (var i = 0; i < toDoList.length; i++) {
        if (toDoList[i].todoItemId == req.params.number) {
            res.status(200).send(toDoList[i]);
        }   
    }
    res.send('Incorrect code');
})

//Posting an item to the dataset
app.post('/api/TodoItems/', (req, res, next) => {
    res.status(201).json(req.body);
})

//Delete an item from the dataset
app.delete('/api/TodoItems/:number', (req, res) => {
    var deleteNumber = req.params.number;
    var deleteTodoItem = null;

    for (var i = 0; i < toDoList.length; i++) {
        if (toDoList[i].todoItemId == deleteNumber) {
            deleteTodoItem = toDoList[i]
            toDoList.splice(i, 1);
        }
    }
    if (deleteTodoItem) {
        res.status(200).send(deleteTodoItem);
        return
    }
    res.send('Incorrect Code');
})

module.exports = app;
