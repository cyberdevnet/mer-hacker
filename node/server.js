const express = require("express");
const app = express();
const multer = require("multer");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const FileType = require("file-type");
const assert = require("assert");
var Stream = require("stream");
var FormData = require("form-data");
const MongoStore = require("connect-mongo")(session);
const axios = require("axios");

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





// <================================================================================>
//                            COOKIE AND SESSION MANAGEMENT 
// <================================================================================>

//Auth



//session set - read - clear

const cookieParser = require("cookie-parser");
// A random key for signing the cookie
app.use(cookieParser("82e4e438a0705fabf61f9854e3b575af"));
var mongooseSessions = Mongoose.createConnection(
  "mongodb://localhost/sessions",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
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




const SessionSchema = new Mongoose.Schema({
  _id: String,
  expires: String,
  session: Object,
  apiKey: String,
});

const SessionModel = mongooseSessions.model("sessions", SessionSchema);



app.post("/node/set-cookie", (req, res, next) => {
  try {
    if (req.session.user !== req.body.user) {
      req.session.user = req.body.user;
      req.session.apiKey = "";
      res.send({
        signedIn: true,
        sessionID: req.sessionID,
        username: req.session.user,
        apiKey: "",
      });
    }
    res.end("done");
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});



app.post("/node/clear-cookie", async (req, res, next) => {
  try {
    if (req.body.sessionID === req.sessionID) {
      req.session.destroy();
      console.log("SESSION DESTROYED ");
      res.send({ signedIn: false });
    }
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

app.post("/node/delete-session", async (req, res, next) => {
  if (req.body.isSignedIn) {
  try {
    await SessionModel.findByIdAndDelete(req.body.ID, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
});

app.post("/node/get-all-sessions", async (req, res) => {
  if (req.body.isSignedIn) {
  try {
    var sessions = await SessionModel.find({}).exec();
    res.send(sessions);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
}
});

//post route to the database to retrieve the AlreadyisSignedIn boolean

app.post("/node/get-AlreadyisSignedIn", async (req, res, next) => {
  try {
    SessionModel.findOne({}, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if (result !== null) {
          let session = JSON.parse(result.session);
          let user = session.user;
          if (result && user === req.body.username) {
            console.log("ALREADY SIGNED");
            let signed = true;
            res.send({ signed: signed });
          } else {
            console.log("NOT SIGNED");
            let signed = false;
            res.send({ signed: signed });
          }
        } else {
          console.log("NOT SIGNED");
          let signed = false;
          res.send({ signed: signed });
        }
      }
    });
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});


// <================================================================================>
//                          END COOKIE AND SESSION MANAGEMENT 
// <================================================================================>





const ADauthentication = false   // set to false to use MongpDb Sessions/Authentication


if (ADauthentication) {
  // <================================================================================>
//                  ACTIVE DIRECTORY IMPLEMENTATION
// <================================================================================>
let ActiveDirectory = require('activedirectory');
let config = {
    url: 'ldap://172.19.85.201',
    baseDN: 'dc=labmail,dc=com',
    username: "merhackerADuser",
    password: 'merhackerADuser'
};

let ad = new ActiveDirectory(config);

// authentication against AD, the same login process for MongoDB Login is used

app.post("/node/authenticate", async (req, res, next) => {

let user = req.body.username
let pass = req.body.password
  try {
    ad.authenticate(user,pass, function(err, auth) {
      if (err) {
          console.log('ERROR: '+JSON.stringify(err));
          res.send("Authentication failed!");
          return;
      }
      if (auth) {
          console.log('Authenticated!');

          var groupName = 'Mer-hacker';
 
          ad.isUserMemberOf(user, groupName, function(err, isMember) {
            if (err) {
              console.log('ERROR: ' +JSON.stringify(err));
              return;
            } else {
              let authResponse = {
                isUsingADauth: true,
                auth: isMember
              }
              console.log(user + ' isMemberOf ' + groupName + ': ' + isMember);
              res.send(authResponse);
            }
           
          });
      }
      else {
        res.send("Authentication failed!");
          console.log('Authentication failed!');
      }
    });
    
  } catch (error) {
    return next(new Error("either user or password are not set"));
    
  }


});


// with AD auth api keys are saved in separate apikeys database

var ApiKeyConnection = Mongoose.createConnection(
  "mongodb://localhost/apikeys",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const ApiKeySchema = new Mongoose.Schema({
  username: String,
  realUsername: String,
  apiKey: String,
});

const ApiKeyModel = ApiKeyConnection.model("apikey", ApiKeySchema);

//this route can be used to post and also update the api-key

app.post("/node/post-api-key", async (req, res, next) => {
  try {
    if (req.body.username !== "leer" && req.body.isSignedIn) {
      // UPDATE OR INSERT NEW USER + KEY
      const filter = { username: req.body.username };
      const update = {
        username: req.body.username,
        realUsername: req.body.realUsername,
        apiKey: req.body.apiKey,
      };

      await ApiKeyModel.countDocuments(filter); // 0

      let apiKey = await ApiKeyModel.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true, // Make this update into an upsert
      });
      res.status(201).send(apiKey);
    } else {
      // DELETE  USER + KEY
      const filter = { realUsername: req.body.realUsername };
      let apiKey = await ApiKeyModel.findOneAndDelete(filter, {});
      res.status(201).send(apiKey);
    }
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

app.post("/node/get-api-key", async (req, res, next) => {
  if (req.body.isSignedIn) {
    try {
      var apiKey = await ApiKeyModel.findOne({ username: req.body.username }, {}).exec();
      res.send(apiKey);
    } catch (error) {
      res.status(500).send(error);
      return next(new Error(error));
    }
  } else {
    res.status(404).send();
  }
});


// read-cookie function specific for AD Sessions

app.post("/node/read-cookie", async (req, res, next) => {
  try {
    if (req.body.username === req.session.user) {
      console.log("LOGGED IN");
      res.send({
        signedIn: true,
        sessionID: req.sessionID,
        user: req.session.user,
        signed: true,
      });
    } else {
      console.log("LOGGED OUT");
      res.send({
        signedIn: false,
        sessionID: req.sessionID,
        user: req.session.user,
        signed: false,
      });
    }
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

// <================================================================================>
//              END ACTIVE DIRECTORY IMPLEMENTATION
// <================================================================================>

} else {
// <================================================================================>
//                 MONGODB AUTHENTICATION AND APIKEY MANAGEMENT
// <================================================================================>

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
  email: String,
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

// do NOT move the UserModel from here, it must be after the UserSchema.methods.comparePassword function!
const UserModel = mongooseConnection.model("user", UserSchema);




//create a new user on Mongodb + password and salt + hash
app.post("/node/hash-users", async (req, res) => {

let body = {
  username: req.body.username,
  email: req.body.email,
  password: req.body.password,
  apiKey: "tzu",
  signed: "false",
}
  
  if (req.body.adminUser === 'admin' && req.body.isSignedIn) {
    try {
      const user = new UserModel(body);
  
      const result = await user.save();
      res.send(result);
      res.status(201).send();
    } catch (error) {
      res.status(500).send(error);
    }

  } else {
    console.log('Hacked Attempt');
    res.status(404).send();
  }

});

app.post("/node/read-cookie", async (req, res, next) => {
  try {
    if (req.body.username === req.session.user) {
      console.log("LOGGED IN");
      //set user status to signed
      await UserModel.findOneAndUpdate(
        { username: req.body.username },
        { signed: true },
        req.body
      ).exec();
      res.send({
        signedIn: true,
        sessionID: req.sessionID,
        user: req.session.user,
        signed: true,
      });
    } else {
      console.log("LOGGED OUT");

      //set user status to un-signed

      await UserModel.findOneAndUpdate(
        { username: req.body.username },
        { signed: false },
        req.body
      ).exec();
      res.send({
        signedIn: false,
        sessionID: req.sessionID,
        user: req.session.user,
        signed: false,
      });
    }
  } catch (error) {
    res.status(500).send(error);
    return next(new Error(error));
  }
});

//if user is signed id change signed status to true, otherwise false (called by read-cookie)
app.post("/node/set-user-status", async (req, res, next) => {
    try {
        const key = await UserModel.findOneAndUpdate(
          { username: req.session.user },
          { signed: req.body.signed },
          req.body
        ).exec();
        res.json(key);
        res.status(201).send();

    } catch (error) {
      res.status(500).send(error);
      return next(new Error(error));
    }
});

app.post("/node/delete-user", async (req, res, next) => {

  if (req.body.isSignedIn) {
    try {
      await UserModel.findByIdAndDelete(req.body.ID, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.send(docs);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

});

//get all users in the database
app.post("/node/get-all-users", async (req, res) => {
  if (req.body.isSignedIn) {
    try {
      var users = await UserModel.find({}).exec();
      res.send(users);
      res.status(200).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }

});


// login from client checking if user match and password match with salt + hash
app.post("/node/authenticate", async (req, res, next) => {
  try {
    var user = await UserModel.findOne({ username: req.body.username }).exec();
    if (!user) {
      res.send("Not Allowed user or user not set ");
    }
    user.comparePassword(req.body.password,  (error, match) => {
      if (!match) {
        res.send("Not Allowed password or password not set");
      } else {
        let authResponse = {
          isUsingADauth: false,
          auth: match,
        };
        res.send(authResponse);

      }
    })

  } catch (error) {
    console.log("error", error);
    // return next(new Error("either user or password are not set"));
  }
});

// store and retrieve API key

app.post("/node/post-api-key", async (req, res, next) => {
  console.log("req", req.body);

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

// connection to the apikeys database to retrieve the key
app.post("/node/get-api-key", async (req, res, next) => {
  if (req.body.isSignedIn) {
    try {
      var apiKey = await UserModel.findOne({ username: req.body.username }, {}).exec();
      res.send(apiKey);
    } catch (error) {
      res.status(500).send(error);
      return next(new Error(error));
    }
  } else {
    res.status(404).send();
  }
});

// <================================================================================>
//                           END MONGODB AUTHENTICATION AND APIKEY MANAMENT
// <================================================================================>

}






// <================================================================================>
//                            BACKUP AND RESTORE 
// <================================================================================>

// delete backup_restore script(if exists)

app.post("/node/deletebackupRestoreFiles", async (req, res) => {
  try {
    const file = path.join(
      __dirname,
      `/../flask/backup_restore/${req.session.user}_meraki_restore_network.py`
    );
    // check if file exists before deleting it
    fs.access(file, fs.F_OK, (err) => {
      if (err) {
        console.log("restore file not exists");
        res.send({
          status: false,
          message: "restore file not exists",
        });
        return;
      }
      //file exists and will be deleted
      fs.unlink(file, function (err) {
        if (err) {
          console.log(err);
          res.send({
            status: false,
            message: "restore file not deleted",
          });
        }
        // if no error, file has been deleted successfully
        res.send({
          status: true,
          message: "restore file deleted",
        });
        console.log("restore file deleted!");
      });
    });
  } catch (e) {
    res.status(500).send(e);
  }
});



// delete build_meraki_switchconfig script(if exists)

app.post("/node/deletebuild_meraki_switchconfigFiles", async (req, res) => {
  try {
    const file = path.join(
      __dirname,
      `/../flask/cisco_meraki_migrate_tool/${req.session.user}_build_meraki_switchconfig.py`
    );
    // check if file exists before deleting it
    fs.access(file, fs.F_OK, (err) => {
      if (err) {
        console.log("build_meraki_switchconfig file not exists");
        res.send({
          status: false,
          message: "build_meraki_switchconfig file not exists",
        });
        return;
      }
      //file exists and will be deleted
      fs.unlink(file, function (err) {
        if (err) {
          console.log(err);
          res.send({
            status: false,
            message: "build_meraki_switchconfig file not deleted",
          });
        }
        // if no error, file has been deleted successfully
        res.send({
          status: true,
          message: "build_meraki_switchconfig file deleted",
        });
        console.log("build_meraki_switchconfig file deleted!");
      });
    });
  } catch (e) {
    res.status(500).send(e);
  }
});


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
          `/../flask/backup_restore/${req.session.user}_meraki_restore_network.py`
        )
      );

      res.send({
        status: true,
        message: "restore file uploaded",
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

// <================================================================================>
//                            END BACKUP AND RESTORE 
// <================================================================================>


// <================================================================================>
//                             MIGRATE TOOL 
// <================================================================================>

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

      file.mv(
        path.join(
          __dirname,
          `/../flask/cisco_meraki_migrate_tool/${req.session.user}_build_meraki_switchconfig.py`
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

// DELETE backupfile for build_meraki_switchconfig(if exists)

app.post("/node/delete_backupfile", async (req, res) => {
  let file = path.join(
    __dirname,
    "/../flask/cisco_meraki_migrate_tool/config_backups/backups/backup.txt"
  );
  try {
    fs.access(file, fs.F_OK, (err) => {
      if (err) {
        console.log("Backupfile file not exists");
        res.send({
          status: false,
          message: "Backupfile file not exists",
        });
        return;
      }
      fs.unlink(file, function (err) {
        if (err) {
          console.log(err);
          res.send({
            status: false,
            message: "Backupfile not deleted",
          });
        }

        // if no error, file has been deleted successfully
        res.send({
          status: true,
          message: "Backupfile deleted",
        });
        console.log("Backupfile deleted!");
      });
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

// <================================================================================>
//                             END MIGRATE TOOL 
// <================================================================================>


// <================================================================================>
//                             SWITCHPORT TEMPLATES
// <================================================================================>
//Reading template file

var mongooseTemplates = Mongoose.createConnection(
  "mongodb://127.0.0.1/templates",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

const SwitchPortTemplateSchema = new Mongoose.Schema(
  {
    user: String,
    templates: {},
  },
  { strict: false }
);

const SwitchportTemplateModel = mongooseTemplates.model(
  "template",
  SwitchPortTemplateSchema
);

app.post("/node/read_templateFile", async (req, res, next) => {
  try {
    var template = await SwitchportTemplateModel.find({
      user: req.body.user,
    }).exec();

    res.send(template);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
    return next(new Error(error));
  }
});

// //write template

app.post("/node/write_templateFile", async (req, res) => {
  try {
    var notification = new SwitchportTemplateModel({
      user: req.body.user,
      templates: req.body.template,
    });
    notification.save(function (err, result) {
      if (err) {
        console.log("err", err);
      } else {
        console.log("saved");
      }
    });
    res.send(notification);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// //update template

app.post("/node/update_templateFile", async (req, res) => {
  const id = req.body._id;
  const templates = req.body.template;

  try {
    await SwitchportTemplateModel.findOneAndUpdate(
      { _id: id },
      { templates: templates },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          res.send(docs);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
// //delete template

app.post("/node/delete_templateFile", async (req, res) => {
  const id = req.body._id;
  try {
    await SwitchportTemplateModel.findByIdAndDelete(id, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.send(docs);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// <================================================================================>
//                             END SWITCHPORT TEMPLATES
// <================================================================================>


// <================================================================================>
//                                  UTILITIES
// <================================================================================>


// serve static files for backup/restore script

app.use(
  "/node/backupRestoreFiles",
  express.static(path.join(__dirname, "/../flask/backup_restore"))
);

app.get("/node/backupRestoreFiles", function (req, res) {
  express.static(path.join(__dirname, "/../flask/backup_restore"))(req, res);
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

// <================================================================================>
//                                  END UTILITIES
// <================================================================================>

const HOST = "localhost";
const PORT = process.env.PORT || 3001;

var server = app.listen(PORT, HOST, function () {
  var host = server.address().address;
  var port = server.address().port;
  logger.info("Server running on port %d", PORT);
  console.log("App listening at http://%s:%s", host, port);
});
