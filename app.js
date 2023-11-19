const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
const io = socketIO(server);
const mqtt = require('mqtt');
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org', { clientId: 'testMQTT#1' });

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

mqttClient.on('connect', function () {
  mqttClient.subscribe('kel1MQTT/temp');
  mqttClient.subscribe('kel1MQTT/humidity');
});

mqttClient.on('message', (topic, message) => {
    console.log(`message: ${message}  --> topic: ${topic}`);
    switch (topic) {
      case 'kel1MQTT/temp':
        io.emit('temp_value', { topic, message: message.toString() });
        break;
      case 'kel1MQTT/humidity':
        io.emit('humidity_value', { topic, message: message.toString() });
        break;
      default:
        break;
    }
  });

io.on('connection', (socket) => {
  socket.on('button_clicked', () => {
    mqttClient.publish('kel1MQTT/onoff', '1');
  });
});

server.listen(3000, () => {
  console.log('Open "localhost:3000" in browser');
});
