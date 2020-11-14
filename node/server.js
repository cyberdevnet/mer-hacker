const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const Mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const crypto = require("crypto");
const MongoStore = require("connect-mongo")(session);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));

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
var mongooseSessions = Mongoose.createConnection("mongodb://localhost/sessions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
app.use(
  session({
    secret: "82e4e438a0705fabf61f9854e3b575af",
    store: new MongoStore({
      mongooseConnection: mongooseSessions,
      ttl: 3600,
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
    },
  })
);

// <================================================================================>
//                          END COOKIE AND SESSION MANAGEMENT
// <================================================================================>

// <================================================================================>
//                              APIKEY MANAGEMENT
// <================================================================================>

// eslint-disable-next-line
var ApiKeyConnection = Mongoose.createConnection("mongodb://localhost/apikeys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const ApiKeySchema = new Mongoose.Schema({
  username: String,
  realUsername: String,
  apiKey: Object,
});

const ApiKeyModel = ApiKeyConnection.model("apikey", ApiKeySchema);

// store and retrieve API key

app.post("/node/post-api-key", async (req, res, next) => {
  const algorithm = "aes-256-ctr";
  const iv = crypto.randomBytes(16);
  const text = req.body.apiKey;
  const hide = "7i6Njz3zVstDgbZjprqtzONow3Meyxzv";
  const cipher = crypto.createCipheriv(algorithm, hide, iv);
  const encrypted = Buffer.concat([cipher.update(`${text}`), cipher.final()]);

  let hash = {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };

  // const hash = encrypt(req.body.apiKey);
  try {
    if (req.body.username !== "leer") {
      // UPDATE OR INSERT NEW USER + KEY
      const filter = { username: req.body.username };
      const update = {
        username: req.body.username,
        realUsername: req.body.realUsername,
        apiKey: hash,
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

// connection to the apikeys database to retrieve the key

app.post("/node/get-api-key", async (req, res, next) => {
  const algorithm = "aes-256-ctr";
  const hide = "7i6Njz3zVstDgbZjprqtzONow3Meyxzv";

  try {
    var hash = await ApiKeyModel.findOne({ username: req.body.username }, {}).exec();
    const decipher = crypto.createDecipheriv(algorithm, hide, Buffer.from(hash.apiKey.iv, "hex"));
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.apiKey.content, "hex")),
      decipher.final(),
    ]);

    let apiKey = decrpyted.toString();
    res.send({ username: "admin", apiKey: apiKey, realUsername: "admin" });
  } catch (error) {
    //res.status(500).send(error);
    //if no apiKey is set, return null
    res.send({ username: "admin", apiKey: null, realUsername: "admin" });
    return next(new Error(error));
  }
});

// <================================================================================>
//                           APIKEY MANAGEMENT
// <================================================================================>

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
          message: "Invalid File, please upload a valid .txt file containing the configuration",
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

var mongooseTemplates = Mongoose.createConnection("mongodb://127.0.0.1/templates", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const SwitchPortTemplateSchema = new Mongoose.Schema(
  {
    user: String,
    templates: {},
  },
  { strict: false }
);

const SwitchportTemplateModel = mongooseTemplates.model("template", SwitchPortTemplateSchema);

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
    await SwitchportTemplateModel.findOneAndUpdate({ _id: id }, { templates: templates }, function (
      err,
      docs
    ) {
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
  express.static(path.join(__dirname, "/../flask/cisco_meraki_migrate_tool/"))(req, res);
});

// serve static files for live logs
app.use("/node/flask/logs/", express.static(path.join(__dirname, "/../flask/logs")));

app.get("/node/flask/logs", function (req, res) {
  express.static(path.join(__dirname, "/../flask/logs"))(req, res);
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
