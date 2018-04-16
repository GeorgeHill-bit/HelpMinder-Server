require('dotenv').config();
require('./db.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https').Server(app);
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session'));

app.use('/api/user', require("./routes/hmuser"));

app.use('/api/login', require('./routes/hmsession'));

app.use('/api/log', require('./routes/hmlog'));

app.listen(3000, function(){
	console.log(`app is running on ${process.env.PORT}`);
})