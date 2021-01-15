require('dotenv').config();

const express = require('express'),
      session = require('express-session'),
      massive = require('massive'),
      authCtrl = require('./controllers/authController'),
      app = express()

const PORT = 4000;

const {SESSION_SECRET, CONNECTION_STRING} = process.env

app.use(express.json());

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db);
  console.log('database connected');
})

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
}));

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);


app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));