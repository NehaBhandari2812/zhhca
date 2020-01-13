const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4000;

var User = require('./controllers/user.js');

var app = express();
app.listen(port, () => console.log('Server started at port : '+port));

app.use(express.json());
// app.use(bodyParser.json({ type: 'application/json' }))
app.use(bodyParser.urlencoded({ extended: false }))


app.use(bodyParser.json())
app.use(cors({ origin: 'http://localhost:4200' }));
app.use('/user', User);



//testing
app.get ('/',(req,res)=>{
	res.send('This is index.js');
})
