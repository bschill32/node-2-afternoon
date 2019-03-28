require("dotenv").config()
const express = require("express")
const massive = require("massive")
// const { json } = require("body-parser")

const app = express()
const { SERVER_PORT, CONNECTION_STRING } = process.env
const pc = require("./products_controller")

app.use(express.json())

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db)
    console.log("db is coming to kill us!")
    console.log(db.listTables())
  })
  .catch(err => console.log("There is an error", err))

app.get(`/api/products`, pc.getAll)
app.get(`/api/products/:id`, pc.getOne)
app.put(`/api/products/:id`, pc.update)
app.post(`/api/products`, pc.create)
app.delete(`/api/products/:id`, pc.delete)

app.listen(SERVER_PORT, () =>
  console.log(`The Red Coats are Coming on ${SERVER_PORT}`)
)

// const express = require('express');
// const bodyParser = require('body-parser');
// const massive = require('massive');
// require('dotenv').config()
// const products_controller = require('./products_controller')

// const app = express();
// app.use(bodyParser.json());

// massive(process.env.CONNECTION_STRING).then(dbInstance => {
//     app.set('db', dbInstance)
// }).catch(err => console.log(err));

// app.post('/api/products', products_controller.create);
// app.get('/api/products', products_controller.getAll);
// app.get('/api/products/:id', products_controller.getOne);
// app.put('/api/products/:id', products_controller.update);
// app.delete('/api/products/:id', products_controller.delete);

// const port = process.env.PORT || 3000;
// app.listen(port, () => {console.log(`server listening on port ${port}.`);})
