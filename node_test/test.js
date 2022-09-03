const WebSocket = require('ws');

var count = 10000;

for (let index = 0; index < count; index++) {
    alma();
}

function alma() {
    /** @type {WebSocket | null} */
    let socket = null;
    let name = generateUUID();
    let roomName = generateUUID();

    start();
    // send();


    setTimeout(init, 30000);


    function init() {
        socket.send("/name " + name);
        socket.send("/join " + roomName);
        sendMessages();
    }

    function sendMessages() {
        send()
        setTimeout(sendMessages, randomIntFromInterval(1000, 10000));
    }

    function log(msg, type = 'status') {
        console.log(msg);
    }

    function connect() {
        disconnect()

        const ws = "ws";
        const host = "localhost:8080";
        const wsUri = `${ws}://${host}/ws`

        log('Connecting...')
        socket = new WebSocket(wsUri)

        socket.onopen = () => {
            log('Connected')
        }

        socket.onmessage = (ev) => {
            log(new Date().toLocaleString() + 'Received: ' + ev.data, 'message')
        }

        socket.onclose = () => {
            log('Disconnected')
            socket = null
        }
    }

    function disconnect() {
        if (socket) {
            log('Disconnecting...')
            socket.close()
            socket = null
        }
    }

    function start() {
        if (socket) {
            disconnect()
        } else {
            connect()
        }
    }

    function send() {
        var text = "alma";
        socket.send(text)

    }
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}