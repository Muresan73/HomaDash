const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const server = require('http').Server(app);
let io = require('socket.io')(server);


const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);



io.on('connection', (socket) => {

    // Log whenever a user connects
    console.log('user ' + socket.request.connection.remoteAddress + ' connected in port: ' + socket.request.connection.remotePort);

    // Log whenever a client disconnects from our websocket server
    socket.on('disconnect', function () {
        console.log('user disconnected: ' + socket.request.connection.remoteAddress);
    });

    // When we receive a 'message' event from our client, print out
    // the contents of that message and then echo it back to our client
    // using `io.emit()`
    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', { message: "new data available", timestamp: Date.now() });
    });
});

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
const dataPort = process.env.PORT || '3001';
app.set('port', port);

server.listen(port, () => console.log(`Running on localhost:${port}`));

function loadValues(msrmnt) {
    return {
        timestamp: msrmnt.timestamp,
        devices: msrmnt.devices.map(device =>
            ({
                deviceid: device.deviceid,
                value: device.value,
                unit: device.unit
            }))
    }
}

// DB
var Engine = require('tingodb')(),
    assert = require('assert');

var db = new Engine.Db('server/db', {});
var collection = db.collection("measurements");
// collection.insert([{ hello: 'world_safe1', kuki: "nemkuki" }
//     , { hello: 'world_safe2', kuki: "sajt" }], { w: 1 }, function (err, result) {
//         assert.equal(null, err);

//         collection.findOne({ hello: 'world_safe2' }, function (err, item) {
//             assert.equal(null, err);
//             assert.equal('world_safe2', item.hello);
//         })
//     });

// collection.findOne({ hello: 'world_safe2' }, function (err, result) {
//     if (err) throw err;
//     console.log(result.hello);
//     db.close();
// });


// Receive http new data
const datApp = express();
const dataServer = require('http').Server(datApp);
datApp.use(bodyParser.json());
datApp.use(bodyParser.urlencoded({ extended: false }));
datApp.post('/newdata', (req, res) => {
    var reqestdata = loadValues(req.body)
    io.emit('message', { message: "new data available", timestamp: Date.now() });
    console.log(reqestdata)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end();
});
dataServer.listen(dataPort, 'localhost', () => console.log(`Dataserver running on localhost:${dataPort}`));


// python script
const spawn = require('child_process').spawn;
const py = spawn('python3', ['./server/routes/termo.py']);

py.stdout.on('data', (data) => {
    cleanData = loadValues(JSON.parse(data.toString('utf8')))
    console.log("data recieved -> " + new Date(cleanData.timestamp).toISOString())
    collection.insert(cleanData)
    io.emit('message', { message: "new data available", timestamp: Date.now() });
});
py.stdout.on('end', function () {
    console.log("python stoped");
});