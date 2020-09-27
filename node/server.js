const express = require("express");
const app = express();
const multer = require("multer");
const uuid = require("uuid");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const redis = require("redis");
const redisStore = require("connect-redis")(session);
const MongoStore = require("connect-mongo")(session);
const client = redis.createClient();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
let urlencodedParser = bodyParser.urlencoded({ extended: true });
var jsonParser = bodyParser.json();

const pino = require("pino");
const expressPino = require("express-pino-logger");

const logger = pino({ level: process.env.LOG_LEVEL || "info" });
const expressLogger = expressPino({ logger });
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(expressLogger);

//Auth

// const basicAuth = require('express-basic-auth');
const cookieParser = require("cookie-parser");

// A random key for signing the cookie
app.use(cookieParser("82e4e438a0705fabf61f9854e3b575af"));

// Mongodb initialization to users database

var mongooseConnection = Mongoose.createConnection(
  "mongodb://localhost/users",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const UserSchema = new Mongoose.Schema({
  username: String,
  password: String,
  apiKey: String,
  signed: String,
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

//function take the provided user data, compare it against our hashed user data,
//and then return the boolean res within the callback.

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const UserModel = mongooseConnection.model("user", UserSchema);

//connection to the Mongodb database to check the users
app.get("/node/dump", async (req, res) => {
  try {
    var result = await UserModel.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

//create a new user on Mongodb + password and salt + hash
app.post("/node/hash-users", async (req, res) => {
  try {
    const user = new UserModel(req.body);
    console.log("user", user);
    const result = await user.save();
    res.send(result);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

//login from client checking if user match and password match with salt + hash
app.post("/node/authenticate", async (req, res, next) => {
  try {
    var user = await UserModel.findOne({ username: req.body.username }).exec();
    if (!user) {
      res.send("Not Allowed user or user not set ");
    }
    user.comparePassword(req.body.password, (error, match) => {
      if (!match) {
        res.send("Not Allowed password or password not set");
      }
    });
    res.send("Allowed");
  } catch (error) {
    return next(new Error("either user or password are not set"));
  }
});

//session set - read - clear

var mongooseSessions = Mongoose.createConnection(
  "mongodb://localhost/sessions",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

// const SessionSchema = new Mongoose.Schema({ any: {} });

const SessionSchema = new Mongoose.Schema({
  _id: String,
  expires: String,
  session: Object,
});

const SessionModel = mongooseSessions.model("sessions", SessionSchema);

app.use(
  session({
    secret: "82e4e438a0705fabf61f9854e3b575af",
    store: new MongoStore({
      mongooseConnection: mongooseSessions,
      ttl: 3600,
    }),
    saveUninitialized: false,
    resave: false,
  })
);

app.post("/node/set-cookie", (req, res) => {
  req.session.user = req.body.user;
  res.send({
    signedIn: true,
    sessionID: req.sessionID,
    username: req.session.user,
  });
  res.end("done");
});

app.post("/node/read-cookie", async (req, res, next) => {
  try {
    var sessionID = await SessionModel.findOne({}).exec();
    if (sessionID) {
      const ID = sessionID._id;
      console.log("ID", ID);
      const json = JSON.parse(sessionID.session);
      console.log(json.user);

      if (json.user === req.body.username) {
        res.send({ signedIn: true, sessionID: ID });
      } else {
        console.log("LOGGED OUT");
        res.send({ signedIn: false });
      }
    } else {
      console.log("LOGGED OUT");
      res.send({ signedIn: false });
    }
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

app.post("/node/clear-cookie", async (req, res) => {
  let sessionID = req.body.sessionID;

  mongooseSessions
    .collection("sessions")
    .findOneAndDelete({ _id: sessionID }, function (err, session) {
      res.send({ session: session, signedIn: false });
      res.redirect("/login"); // will always fire after session is destroyed

      console.log("SESSION DESTROYED ");
    });

  // req.session.destroy((err) => {
  //   res.redirect("/login"); // will always fire after session is destroyed
  // });

  // req.session.destroy();
  // res.send({ signedIn: false });
});

// Check if AlreadyisSignedIn

app.post("/node/post-AlreadyisSignedIn", async (req, res, next) => {
  try {
    let signed = await UserModel.findOneAndUpdate(
      { username: req.body.username },
      { signed: req.body.signed },
      req.body
    );

    res.send(signed);
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

//post route to the user database to retrieve the AlreadyisSignedIn boolean

app.post("/node/get-AlreadyisSignedIn", async (req, res, next) => {
  try {
    var signed = await UserModel.findOne(
      { username: req.body.username },
      { signed: "signed" }
    );
    res.send(signed);
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

// store and retrieve API key

app.post("/node/post-api-key", async (req, res, next) => {
  try {
    if (req.body.username !== "leer") {
      //user is still logged
      const key = await UserModel.findOneAndUpdate(
        { username: req.body.username },
        { apiKey: req.body.apiKey },
        req.body
      ).exec();
      res.json(key);
      res.status(201).send();
    } else {
      const key = await UserModel.updateMany(
        //user has already logged-out, remove api-key from database
        {},
        { apiKey: req.body.apiKey },
        req.body
      ).exec();
      res.json(key);
      res.status(201).send();
    }
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

//connection to the apikeys database to retrieve the key
app.post("/node/get-api-key", async (req, res, next) => {
  try {
    var apiKey = await UserModel.findOne(
      { username: req.body.username },
      { apiKey: "apiKey" }
    ).exec();
    res.send(apiKey);
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

//  <======== DO NOT DELETE THIS ROUTE =========>

//this route updates an existing entry in the database with the api key sent from client
// if for every reason there were no entry, create a new one with the route above:

//this route can be used to create a new entry in the database if not present

// app.post('/node/post-api-key', async (req, res) => {
//     try {
//         const key = new ApiKeysModel(req.body);
//         const apiKey = await key.save();
//         res.json(apiKey);
//         res.status(201).send()
//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

//  <======== DO NOT DELETE THIS =========>

// serve static files for backup/restore script

app.use(
  "/node/flask/backup_restore/",
  express.static(path.join(__dirname, "/../flask/backup_restore/"))
);

app.get("/node/flask/backup_restore/", function (req, res) {
  express.static(path.join(__dirname, "/../flask/backup_restore/"))(req, res);
});

// serve static files for ios_to_meraki script

app.use(
  "/node/flask/cisco_meraki_migrate_tool/",
  express.static(path.join(__dirname, "/../flask/cisco_meraki_migrate_tool/"))
);

app.get("/node/flask/cisco_meraki_migrate_tool/", function (req, res) {
  express.static(path.join(__dirname, "/../flask/cisco_meraki_migrate_tool/"))(
    req,
    res
  );
});

// serve static files for live logs
app.use(
  "/node/flask/logs/",
  express.static(path.join(__dirname, "/../flask/logs"))
);

app.get("/node/flask/logs", function (req, res) {
  express.static(path.join(__dirname, "/../flask/logs"))(req, res);
});

// download restore script
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./flask/backup_restore/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

// upload meraki_restore_network script if modified by the AceEditor GUI

app.post("/node/upload", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      const file = req.files.file;

      // file.mv("/home/cyberdevnet/mer-hacker-dev/api/backup_restore/meraki_restore_network.py")
      file.mv(
        path.join(
          __dirname,
          "/../flask/backup_restore/meraki_restore_network.py"
        )
      );

      res.send({
        status: true,
        message: "Backupfile uploaded",
      });
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).send(e);
  }
});

// download build_meraki_switchconfig script
var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./flask/cisco_meraki_migrate_tool/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// upload build_meraki_switchconfig script if modified from GUI

var upload2 = multer({ storage2: storage2 }).single("file");

// upload backupfile for build_meraki_switchconfig

app.post("/node/upload_backupfile", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      if (req.files.backup.mimetype === "text/plain") {
        const { backup } = req.files;

        // backup.mv("/home/cyberdevnet/mer-hacker-dev/api/cisco_meraki_migrate_tool/config_backups/backups/backup.txt")
        backup.mv(
          path.join(
            __dirname,
            "/../flask/cisco_meraki_migrate_tool/config_backups/backups/backup.txt"
          )
        );

        res.send({
          status: true,
          message: "Backupfile uploaded",
        });
      } else {
        res.send({
          status: false,
          message:
            "Invalid File, please upload a valid .txt file containing the configuration",
        });
      }
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// upload build_meraki_switchconfig script if modified by the AceEditor GUI

app.post("/node/upload_build_meraki_switchconfig", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      const file = req.files.file;

      // file.mv("/home/cyberdevnet/mer-hacker-dev/api/cisco_meraki_migrate_tool/build_meraki_switchconfig.py")
      file.mv(
        path.join(
          __dirname,
          "/../flask/cisco_meraki_migrate_tool/build_meraki_switchconfig.py"
        )
      );

      res.send({
        status: true,
        message: "Backupfile uploaded",
      });
    }
  } catch (e) {
    console.log("e", e);
    res.status(500).send(e);
  }
});

// DELETE backupfile for build_meraki_switchconfig

app.post("/node/delete_backupfile", async (req, res) => {
  try {
    fs.unlink(
      path.join(
        __dirname,
        "/../flask/cisco_meraki_migrate_tool/config_backups/backups/backup.txt"
      ),
      function (err) {
        if (err) {
          console.log(err);
        }

        // if no error, file has been deleted successfully
        console.log("Backupfile deleted!");
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }
});

//Reading template file

app.get("/node/read_templateFile", async (req, res, next) => {
  const jsonFile = require("fs");
  try {
    // let rawTemplate = jsonFile.readFileSync(path.join(__dirname, '/../src/components/Tools/switchPortTemplate.json'));
    let rawTemplate = jsonFile.readFileSync(
      path.join(__dirname, "/templates/switchPortTemplate.json")
    );
    let templateFile = JSON.parse(rawTemplate);
    res.send(templateFile);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return next(new Error(error));
  }
});

// //write template file

app.post("/node/write_templateFile", async (req, res) => {
  const jsonFile = require("fs");

  try {
    let data = JSON.stringify(req.body, null, 2);
    // jsonFile.writeFileSync(path.join(__dirname, '/../src/components/Tools/switchPortTemplate.json'));
    jsonFile.writeFileSync(
      path.join(__dirname, "/templates/switchPortTemplate.json"),
      data
    );
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

const HOST = "localhost";
const PORT = process.env.PORT || 3001;

var server = app.listen(PORT, HOST, function () {
  var host = server.address().address;
  var port = server.address().port;
  logger.info("Server running on port %d", PORT);
  console.log("App listening at http://%s:%s", host, port);
});
