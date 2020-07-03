var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
let urlencodedParser = (bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.urlencoded({ extended: true }))

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




const users = []


//just to see the users in database, passwords are salted + hashed
app.get('/users', (req, res) => {
    res.json(users)
})

//create a new user + password and salt + hash
app.post('/hash-users', async (req, res) => {
    console.log("req", req.body)
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { username: req.body.username, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

//login from client checking if user match and password match with salt + hash
app.post('/authenticate', async (req, res) => {

    const user = users.find(user => user.username === req.body.username)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.send('Allowed')
        } else {
            res.send('Not Allowed')
        }
    } catch {
        res.status(500).send()
    }
})

app.get('/set-cookie', (req, res) => {

    const options = {
        maxAge: 1000 * 60 * 60, // would expire after 60 minutes
        httpOnly: true, // The cookie only accessible by the web server
        signed: true // Indicates if the cookie should be signed
    };


    res.cookie('cookie', 'somerandomstuff', options).send({ signedIn: true });
    console.log('cookie created successfully');

});

app.get('/read-cookie', (req, res) => {
    console.log('Cookies: ', req.cookies)
    console.log('Signed Cookies: ', req.signedCookies)


    if (req.signedCookies.cookie === 'somerandomstuff') {
        res.send({ signedIn: true });
    } else {
        res.send({ signedIn: false });
    }
});

app.get('/clear-cookie', (req, res) => {
    console.log("Cookie cleared")
    res.clearCookie('cookie').end();
});











// //Auth

// const basicAuth = require('express-basic-auth');
// const cookieParser = require('cookie-parser');

// // A random key for signing the cookie
// app.use(cookieParser('82e4e438a0705fabf61f9854e3b575af'));

// const auth = basicAuth({
//     users: {
//         admin: '123',
//     },
// });



// app.get('/authenticate', auth, (req, res) => {

//     const options = {
//         httpOnly: true,
//         signed: true,
//     };

//     if (req.auth.user === 'admin') {
//         res.cookie('name', 'admin', options).send({ signedIn: true });
//     } else {
//         res.send({ signedIn: false });
//     }
// });

// app.get('/read-cookie', (req, res) => {
//     console.log(req.signedCookies);
//     if (req.signedCookies.name === 'admin') {
//         res.send({ signedIn: true });
//     } else {
//         res.send({ signedIn: false });
//     }
// });

// app.get('/clear-cookie', (req, res) => {
//     res.clearCookie('name').end();
//     // res.send('you have been logged out');
// });

// app.get('/get-auth-status', (req, res) => {
//     if (req.signedCookies.name === 'admin') {
//         res.send('you are logged in');
//     } else {
//         res.send('you are NOT logged in');
//         res.end();
//     }
// });






// retrieve and store API key

var apiKey = ['test'];

app.post('/post-api-key', function (req, res) {
    console.log("req", req.body.key)
    var key = req.body;
    apiKey = key.key.slice(0)
    res.send(req.body);
    console.log("apiKey", apiKey)

})

app.get('/get-api-key', (req, res) => {
    console.log("apiKey", typeof apiKey)
    res.send(apiKey);
    res.end();

});







app.use("/api/backup_restore/", express.static(__dirname + '/api/backup_restore/'));

app.get("/api/backup_restore/", function (req, res) {

    express.static(__dirname + '/api/backup_restore/')(req, res)

});

app.use("/api/logs/", express.static(__dirname + '/api/logs/'));

app.get("/api/logs/", function (req, res) {

    express.static(__dirname + '/api/logs/')(req, res)

});


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