var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var _ = require('lodash');

var scriptName = './createContainer.sh';

/* GET users listing. */
router.get('/', function(req, res) {

    var script = Number(req.query.script);
    if (script === NaN) {
        res.status(400).send('Script must be a number');
        return;
    }

    child_process.execFile(scriptName, [script], (error, stdout, stderr) => {
        if (error) {
            res.status(500).send(error);
        } else if (stderr) {
            res.status(500).send(stderr)
        } else {
            res.status(200).send(JSON.stringify({
                id: stdout.trim()
            }));
        }
    });

});

module.exports = router;
