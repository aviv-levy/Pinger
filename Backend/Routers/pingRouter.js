const express = require("express");
const router = express.Router();
const util = require('util');
const exec = require("child_process").exec;
const execAsync = util.promisify(exec);

// http://localhost:4500/ping
router.get('/:hostname', async (req, res) => {
    try {
        const hostname = req.params.hostname;
        console.log(hostname)
        const { stdout, stderr, err } = await execAsync(`ping ${hostname}`, { timeout: 5000 });
        console.log(stdout);
        // exec("ping -c 3 192.168.54.66", function (err, stdout, stderr) {
        //     console.log(stdout);
        // });
        res.status(200).send("The host is active");

    } catch (err) {
        if (err.killed) {
            // The process was terminated due to the timeout
            console.error("Ping timed out.");
            res.status(504).send("Ping timed out.");
        } else {
            // Other errors
            console.error("Error executing ping:", err.message);
            res.status(500).send(err.message);
        }
    }
});

module.exports = router;