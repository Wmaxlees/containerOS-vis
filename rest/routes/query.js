var express = require('express');
var router = express.Router();
var child_process = require('child_process');

var scriptName = 'someScriptName';

/* GET users listing. */
router.get('/', function(req, res) {

    child_process.exec('docker stats --no-stream', [], (error, stdout, stderr) => {
        if (error) {
            res.send(500).send(error);
        } else if (stderr) {
            res.send(500).send(stderr)
        } else {
            // Parse the output
            var split = stdout.split('\n');

            if (split.length === 1) {
                res.status(200).send(JSON.stringify([]));
            } else {
                var result = [];

                for (var i = 1; i < split.length-1; ++i) {
                    var pieces = split[i].split(/ +/); ///\w+/g);
                    
                    var obj = {
                        id: pieces[0],
                        memory: pieces[2],
                        cpu: pieces[1].replace('%', '')
                    };
                    
                    result.push(obj);
                }

                // console.log(split);


                res.status(200).send(JSON.stringify(result));
            }
        }
    });

});

module.exports = router;
