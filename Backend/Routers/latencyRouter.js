const express = require("express");
const router = express.Router();
const util = require('util');
const exec = require("child_process").exec;
const execAsync = util.promisify(exec);


function validateIP(ip) {
    const regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ip);
}


// http://localhost:4501/latency
router.get('/:hostname', async (req, res) => {
    try {
        const hostname = req.params.hostname;

        if (!validateIP(hostname))
            res.status(500).send("Error executing ping: IP is not valid");

        try {
            const { stdout, stderr, err } = await execAsync(`net_test ${hostname} 4`, { timeout: 20000 });
            res.send(stdout);
        } catch (error) {
            res.status(500).send(error);
        }

    } catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router;