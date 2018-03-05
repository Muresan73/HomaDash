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
// Get users
router.get('/test', (req, res) => {
    console.log("sent data: alma");
    response.data = [i]
    i = i + 1;
    res.json(response);
});



module.exports = router;