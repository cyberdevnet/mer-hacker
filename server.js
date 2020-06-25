var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });

app.use(expressLogger);



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

// app.listen(3001, function () {

//     console.log('App running on port 3001');

// });
const HOST = "localhost";
const PORT = process.env.PORT || 3001;

var server = app.listen(PORT, HOST, function () {
    var host = server.address().address;
    var port = server.address().port;
    logger.info('Server running on port %d', PORT);
    console.log('App listening at http://%s:%s', host, port);
});