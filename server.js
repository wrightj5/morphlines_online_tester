const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const tmp = require('tmp');
const fs = require('fs');
const spawnSync = require( 'child_process' );


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Get Req
app.get('/', function (req, res) {
  res.render('index');
})

// POST Req
app.post('/', function (req, res) {
  console.log("Posting")
  var paths = {
    "conf" : req.body.config,
    "log"   : req.body.data
  }

  var entries = Object.entries(paths)

  function runExec(form_datas, callback) {
    // Config File
    for (const [key, value] of form_datas) {
      if(key == "conf"){
        tmp.file({prefix: Date.now(), postfix: '.conf', keep: false}, function (err, path, fd, cleanupCallback) {
          if (err) throw err;
          fs.writeFileSync(path, value)
          callback(path);
        });
      }
      if(key == "log"){
        tmp.file({prefix: Date.now(), postfix: '.log', keep: false}, function (err, path, fd, cleanupCallback) {
          if (err) throw err;
          fs.writeFileSync(path, value)
          callback(path);
        });
      }
    }
  }

  var items_processed = {}
  runExec(entries, function(response) {
    ext = response.substr(response.lastIndexOf('.') + 1);
    items_processed[ext] = response
    if(Object.keys(items_processed).length == 2){
      const { spawn } = require('child_process');
      // ~/lib.morphlines/ml --id=normaliser ~/lib.morphlines/configs/openvpn_test_norman_ml.conf --input=~/lib.morphlines/data/openvpn.log
      const child = spawn('/Users/jakewright/lib.morphlines/ml', [ "--id=normaliser", items_processed['conf'], "--input=" + items_processed['log']], { shell: true});
//      const child = spawn('cat', [ items_processed['conf']]);

      stdout_buf = ""
      child.stdout.on('data', (chunk) => {
        // data from standard output is here as buffers
        stdout_buf += chunk
        console.log(`child stdout:\n${chunk}`);
      });
      stderr_buf = ""
      // use child.stdout.setEncoding('utf8'); if you want text chunks
      child.stderr.on('data', (chunk) => {
        // data from standard output is here as buffers
        stderr_buf += chunk
        console.log(`child stderr:\n${chunk}`);
      });

      child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.render('index', {ml_return: stdout_buf, error: stderr_buf});
      });
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
