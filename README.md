# 实时猫浏览器检测工具 | RTC Detect

## 关于

实时猫采用了一系列的先进技术, 使用户打开浏览器即拥有丰富的实时交流功能. 然而有一些老旧的浏览器并不能支持实时猫的功能.

实时猫浏览器检测工具让开发者可以检测用户的浏览器是否支持实时猫提供的各项功能.

## 安装

如果使用Bower作为包管理器，运行以下命令安装：

```bash
bower install realtimecat-rtc-detect --save
```

在使用包管理软件安装完成后，仍需要在具体HTML页面中，引入下载好的`realtimecat-rtc-detect.min.js`。

如果使用NPM，运行以下命令安装：

```bash
npm install realtimecat-rtc-detect --save
```

本工具同时符合AMD和CommonJS的规范，你可以通过RequireJS或者require('realtimecat-rtc-detect')的方式来调用。

## 使用

### 作为window对象

1. 在HTML中引入`realtimecat-rtc-detect.min.js`
```
<script src='dist/realtimecat-rtc-detect.min.js'></script>
```
2. 调用RTCDetect的各方法
```javascript
var output = 'Detecting browsers by RTCDetect:<hr>';
    output += 'Browser: ' + RTCDetect.browser.name + '<br>';
    output += 'Version: ' + RTCDetect.browser.version + '<br>';
    output += 'Full Version: ' + RTCDetect.browser.fullVersion + '<br>';
    output += 'OS Name: ' + RTCDetect.osName + '<br>';
    output += 'Is GetUserMedia Supported: ' + RTCDetect.getUserMediaSupport + '<br>';
    output += 'Is RTCPeerConnection Supported: ' + RTCDetect.RTCPeerConnectionSupport + '<br>';
    output += 'Is DataChannel Supported: ' + RTCDetect.dataChannelSupport + '<br>';
    output += 'Is WebSocket Supported: ' + RTCDetect.WebSocketSupport + '<br>';
    output += 'Is Screen Capturing Supported: ' + RTCDetect.screenCaputringSupport + '<br>';
    output += 'Is ORTC Supported: ' + RTCDetect.ORTCSupport + '<br>';
    output += 'Is RTCat Supported: ' + RTCDetect.RTCatSupport + '<br>';
    document.getElementById('general').innerHTML = output;
    RTCDetect.checkDeviceSupport(function (error, resp) {
        var output = 'Detecting Media Devices by RTCDetect:' + '<br>';
        if (error) {
            output+='Error: ' + error;
            document.getElementById('devices').innerHTML = output;
            return;
        }
        output += 'Has Microphone:' + resp.hasMicrophone + "<br>";
        output += 'Has Speakers:' + resp.hasSpeakers + "<br>";
        output += 'Has Webcam:' + resp.hasWebcam + "<br>";
        output += 'Media Devices:' + '<br>';
        output += '<pre>';
        resp.MediaDevices.forEach(function (item) {
            for (var i in item) {
                output += i + ": " + item[i] + '<br>';
            }
        });
        output += '</pre>';
        document.getElementById('devices').innerHTML = output;
    });
```

### 使用Browserify等工具

```javascript
var RTCDetect = require('realtimecat-rtc-detect');
var output = 'Detecting browsers by RTCDetect:<hr>';
    output += 'Browser: ' + RTCDetect.browser.name + '<br>';
    output += 'Version: ' + RTCDetect.browser.version + '<br>';
    output += 'Full Version: ' + RTCDetect.browser.fullVersion + '<br>';
    output += 'OS Name: ' + RTCDetect.osName + '<br>';
    output += 'Is GetUserMedia Supported: ' + RTCDetect.getUserMediaSupport + '<br>';
    output += 'Is RTCPeerConnection Supported: ' + RTCDetect.RTCPeerConnectionSupport + '<br>';
    output += 'Is DataChannel Supported: ' + RTCDetect.dataChannelSupport + '<br>';
    output += 'Is WebSocket Supported: ' + RTCDetect.WebSocketSupport + '<br>';
    output += 'Is Screen Capturing Supported: ' + RTCDetect.screenCaputringSupport + '<br>';
    output += 'Is ORTC Supported: ' + RTCDetect.ORTCSupport + '<br>';
    output += 'Is RTCat Supported: ' + RTCDetect.RTCatSupport + '<br>';
    document.getElementById('general').innerHTML = output;
    RTCDetect.checkDeviceSupport(function (error, resp) {
        var output = 'Detecting Media Devices by RTCDetect:' + '<br>';
        if (error) {
            output+='Error: ' + error;
            document.getElementById('devices').innerHTML = output;
            return;
        }
        output += 'Has Microphone:' + resp.hasMicrophone + "<br>";
        output += 'Has Speakers:' + resp.hasSpeakers + "<br>";
        output += 'Has Webcam:' + resp.hasWebcam + "<br>";
        output += 'Media Devices:' + '<br>';
        output += '<pre>';
        resp.MediaDevices.forEach(function (item) {
            for (var i in item) {
                output += i + ": " + item[i] + '<br>';
            }
        });
        output += '</pre>';
        document.getElementById('devices').innerHTML = output;
    });
```
