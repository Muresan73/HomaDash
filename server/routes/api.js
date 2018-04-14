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

// GET measurements
router.get('/mmnts', (req, res) => {
    console.log("sent measurements test data ");
    let testmmntResponse = {
        timestamp: Date.now(),
        devices: [
            {
                deviceid: "lc92",
                value: Date.now() * 13 % 100,
                unit: "Volt"
            },
            {
                deviceid: "XX44",
                value: Date.now() * 7 % 100,
                unit: "Bar"
            },
            {
                deviceid: "ks89",
                value: Date.now() * 17 % 100,
                unit: "Nm"
            }
        ]
    };
    res.json(testmmntResponse);
});

// GET data specs
router.get('/devices', (req, res) => {
    console.log("sent devices");
    let specsResponse = [
        { deviceid: 'lc92', max: 100, min: -200 },
        { deviceid: 'XX44', max: 98, min: 0 },
        { deviceid: 'ks89', max: 100, min: 0 }];
    res.json(specsResponse);
});

module.exports = router;