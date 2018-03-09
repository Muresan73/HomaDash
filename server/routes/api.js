const express = require('express');
const router = express.Router();

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

var i = 0;
// Get testdata
router.get('/test', (req, res) => {
    console.log("sent data: " + i);
    response.data = [i]
    i = i + 1;
    res.json(response);
});

let testmmntResponse = [
    {
        deviceid: "lc92",
        timestamp: Date.now(),
        value: 11,
        unit: "Volt"
    },
    {
        deviceid: "pq44",
        timestamp: Date.now(),
        value: 2,
        unit: "Bar"
    },
    {
        deviceid: "ks89",
        timestamp: Date.now(),
        value: 230,
        unit: "Nm"
    }
];
router.get('/mmnts', (req, res) => {
    console.log("sent measurements test data ");

    res.json(testmmntResponse);
});

module.exports = router;