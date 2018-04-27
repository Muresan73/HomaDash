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
app.set('port', port);


server.listen(port, () => console.log(`Running on localhost:${port}`));