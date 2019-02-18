const express = require('express')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

/**************************************** DATABSE CONNECTION USING KNEX *********************************/
const postgres = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'adrian',
		password:'bishop',
		database: 'smart-brain'
	}
});


const app = express();


app.use(bodyParser.json());/* allows you to "scan" and tranform them in json automaticaly */
app.use(cors());


app.get('/', (req,res) => {res.send('ok') })
app.get('/profile/:id', (req,res) => {profile.handleProfileGet(req, res, postgres)})
app.post('/signin', (req,res) => { signin.handleSignin(req, res, postgres, bcrypt)})
app.post('/register', (req,res) => { register.handleRegister(req, res, postgres, bcrypt)})
app.put('/image', (req,res) => {image.handleImage(req,res, postgres)})
app.post('/imageUrl', (req,res) => {image.handleApiCall(req,res)})


app.listen(3000, () => {
	 console.log('app is running on port 3000');
})