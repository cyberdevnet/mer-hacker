const express = require('express');
const app = express();
const multer = require('multer')
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const Mongoose = require("mongoose");

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
let urlencodedParser = (bodyParser.urlencoded({ extended: true }))

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

app.use(expressLogger);



//Auth

const basicAuth = require('express-basic-auth');
const cookieParser = require('cookie-parser');

// A random key for signing the cookie
app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

// Mongodb initialization

Mongoose.connect("mongodb://localhost/users", { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new Mongoose.Schema({
    username: String,
    password: String
});


//check to see if the user is being created or changed. 
//If the user is not being created or changed, we will skip over the hashing part.

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});


//function take the provided data, compare it against our hashed data, 
//and then return the boolean res within the callback.

UserSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};


const UserModel = new Mongoose.model("user", UserSchema);

//connection to the Mongodb database to check the users
app.get("/dump", async (req, res) => {
    try {
        var result = await UserModel.find().exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});


//create a new user on Mongodb + password and salt + hash
app.post('/hash-users', async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const result = await user.save();
        res.send(result);
        res.status(201).send()
    } catch (error) {
        res.status(500).send(error);
    }
})



//login from client checking if user match and password match with salt + hash
app.post('/authenticate', async (req, res, next) => {
    try {
        var user = await UserModel.findOne({ username: req.body.username }).exec();
        if (!user) {
            res.send('Not Allowed user or user not set ')
        }
        user.comparePassword(req.body.password, (error, match) => {
            if (!match) {
                res.send('Not Allowed password or password not set')
            }
        });
        res.send('Allowed')
    } catch (error) {
        return next(new Error('either user or password are not set'))

    }
})

//cookie set - read - clear
app.get('/set-cookie', (req, res) => {

    const options = {
        maxAge: 1000 * 60 * 60, // would expire after 60 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    };
    res.cookie('cookie', 'somerandomstuff', options).send({ signedIn: true });
});

app.get('/read-cookie', (req, res) => {
    if (req.signedCookies.cookie === 'somerandomstuff') {
        res.send({ signedIn: true });
    } else {
        res.send({ signedIn: false });
    }
});

app.get('/clear-cookie', (req, res) => {
    res.clearCookie('cookie').end();
});


// retrieve and store API key

var apiKey = ['test'];

app.post('/post-api-key', function (req, res) {
    var key = req.body;
    apiKey = key.key.slice(0)
    res.send(req.body);

})

app.get('/get-api-key', (req, res) => {
    res.send(apiKey);
    res.end();

});




// serve static files for backup/restore script

app.use("/api/backup_restore/", express.static(__dirname + '/api/backup_restore/'));

app.get("/api/backup_restore/", function (req, res) {

    express.static(__dirname + '/api/backup_restore/')(req, res)

});

// serve static files for live logs
app.use("/api/logs/", express.static(__dirname + '/api/logs/'));

app.get("/api/logs/", function (req, res) {

    express.static(__dirname + '/api/logs/')(req, res)

});


// download restore script
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './api/backup_restore/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});


const HOST = "localhost";
const PORT = process.env.PORT || 3001;

var server = app.listen(PORT, HOST, function () {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('Server running on port %d', PORT);
    console.log('App listening at http://%s:%s', host, port);
});