const express = require('express');
const router = express.Router();
// DB
var Engine = require('tingodb')(),
    assert = require('assert');



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

// GET measurements
router.get('/mmnts', (req, res) => {
    console.log(new Date().toISOString() + " -> sent measurements test data ");

    var db = new Engine.Db('server/db', {});
    var collection = db.collection("measurements");
    var cursor = collection.find({}, { '_id': 0 }).sort({ _id: -1 }).limit(1);
    cursor.toArray(function (err, results) {
        if (err) throw err;
        return res.json(results[0])
        db.close();
    });

});

// GET data specs
router.get('/devices', (req, res) => {
    console.log(new Date().toISOString() + " -> sent devices");
    let specsResponse = [
        { deviceid: 'lc92', max: 100, min: -50 },
        { deviceid: 'XX44', max: 100, min: 0 },
        { deviceid: 'ks89', max: 100, min: 0 }];
    res.json(specsResponse);
});

// Post data 
router.post('/interval', (req, res) => {
    console.log(new Date().toISOString() + " -> sent post test data ");
    console.log(req.body);

    st = req.body.startdate
    et = req.body.enddate
    let testintervalResponse = [{
        timestamp: st,
        devices: [
            {
                deviceid: "lc92",
                value: st * 13 % 100,
                unit: "Volt"
            },
            {
                deviceid: "XX44",
                value: st * 7 % 100,
                unit: "Bar"
            },
            {
                deviceid: "ks89",
                value: st * 17 % 100,
                unit: "Nm"
            }
        ]
    }, {
        timestamp: et,
        devices: [
            {
                deviceid: "lc92",
                value: et * 22 % 100,
                unit: "Volt"
            },
            {
                deviceid: "XX44",
                value: et * 44 % 100,
                unit: "Bar"
            },
            {
                deviceid: "ks89",
                value: et * 38 % 100,
                unit: "Nm"
            }
        ]
    }];
    res.json(testintervalResponse);
});

module.exports = router;