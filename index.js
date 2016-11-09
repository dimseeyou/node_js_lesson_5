var express = require('express');
var bodyParser = require('body-parser');
var todoList = require('./todolist');
var app = express();
var port = 8000;
var pug = require('pug'); // решил работать с pug, посмотрев на работы ребят. он удобнее

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){ //вывод всех статей в index.pug
    todoList.getTasks(function(err, tasks){
        if (err) throw err;
        res.render('index',{ 
            tasks:  tasks,
            title: 'To Do List'
            }
        );
    });
});

app.get('/new', function(req, res) { //страница для создания новой задачи new.pug
    res.render('new');
});

app.get('/delete/:id', function(req, res){ //удаление по get-запросу 
    todoList.deleteTask(req.params.id, function(err){
        if (err) throw err;
        res.redirect('/');
    });
});

app.get('/edit/:id', function(req, res){ //апдейтинг по get-запросу
    todoList.getTask(req.params.id, function(err, task){
        if (err) throw err;
        res.render('edit', {text: task[0].text, completed: task[0].completed, id: task[0].id});
    });
});

app.post('/', function(req, res) {
    todoList.updateTask(req.body.id, req.body.text, req.body.completed, function(err) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.post('/post', function(req, res){
    todoList.addTask(req.body.text, req.body.completed, function(err) {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(port, function () {
    console.log(`Server is running at port`, +port);
});

