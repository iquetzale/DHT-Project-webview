# DHT-Project
First time setup:
-App-nya pake node.js, jadi harus install dulu di sini: https://nodejs.org/en/download
-Open folder "node mqtt"
-Buka terminal baru, masukin 2 command ini di directory foldernya:
	npm install mqtt --save
	npm install express socket.io mqtt

Running app:
-Masukin command ini untuk run javascriptnya:
	node app.js
-Untuk liat live webview, buka "http://localhost:3000/" di browser
-Untuk monitor MQTT, buka https://testclient-cloud.mqtt.cool/, pilih 'tcp://test.mosquitto.org:1883', subscribe ke topik 'kel1MQTT/temp' dan 'kel1MQTT/humidity'


Untuk setup ESP32, edit file .ino di line 9 dan masukkin ssid dan password wifi sendiri, trus bisa langsung sketch ke ESP32
