const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const {studentArray} = require("./InitialData")
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const std = app.use(studentArray.json())
// GET request to retrieve all student records
app.get('/students', (req, res) => {
    res.send(studentArray);
  });
  
  // GET request to retrieve a specific student record by ID
  app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = studentArray.find(student => student.id === id);
  
    if (!student) {
      return res.status(404).send('Student not found');
    }
  
    res.send(student);
  });
  
  // POST request to add a new student record
  app.post('/students', (req, res) => {
    const student = req.body;
    studentArray.push(student);
  
    res.send('Student added successfully');
  });
  
  // PUT request to update an existing student record
  app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStudent = req.body;
    const index = studentArray.findIndex(student => student.id === id);
  
    if (index === -1) {
      return res.status(404).send('Student not found');
    }
  
    studentArray[index] = { ...studentArray[index], ...updatedStudent };
  
    res.send('Student updated successfully');
  });
  
  // DELETE request to delete an existing student record
  app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = studentArray.findIndex(student => student.id === id);
  
    if (index === -1) {
      return res.status(404).send('Student not found');
    }
  
    studentArray.splice(index, 1);
  
    res.send('Student deleted successfully');
  });


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   