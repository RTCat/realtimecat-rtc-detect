var MediaDevices = [];

var hasMicrophone = false;
var hasSpeakers = false;
var hasWebcam = false;

if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
    // Firefox 38+, Microsoft Edge, and Chrome 44+ seems having support of enumerateDevices
    navigator.enumerateDevices = function (callback) {
        navigator.mediaDevices.enumerateDevices().then(callback);
    };
    //TODO: Microsoft Edge上enumerateDevices方法有bug
}

// http://dev.w3.org/2011/webrtc/editor/getusermedia.html#mediadevices
// TODO: switch to enumerateDevices when landed in canary.
function checkDeviceSupport(callback) {

    // enumerateDevices方法shim
    // 当MediaStreamTrack.getSources可用时,用getSources方法
    if (!navigator.enumerateDevices && window.MediaStreamTrack && window.MediaStreamTrack.getSources) {
        navigator.enumerateDevices = window.MediaStreamTrack.getSources.bind(window.MediaStreamTrack);
    }
    // 当navigator.enumerateDevices方法可用时,用这个方法
    if (!navigator.enumerateDevices && navigator.enumerateDevices) {
        navigator.enumerateDevices = navigator.enumerateDevices.bind(navigator);
    }

    // 当浏览器不支持任何一种enumerateDevices方法时,抛出错误
    if (!navigator.enumerateDevices) {
        if (typeof RTCDetect !== 'undefined') {
            RTCDetect.MediaDevices = MediaDevices;
            RTCDetect.hasMicrophone = hasMicrophone;
            RTCDetect.hasSpeakers = hasSpeakers;
            RTCDetect.hasWebcam = hasWebcam;
        }
        if (callback) {
            callback(new Error('您的浏览器尚不支持检测设备的方法, Neither navigator.mediaDevices.enumerateDevices NOR MediaStreamTrack.getSources are available.'))
        } else {
            throw new Error('您的浏览器尚不支持检测设备的方法, Neither navigator.mediaDevices.enumerateDevices NOR MediaStreamTrack.getSources are available.');
        }
        return;
    }

    MediaDevices = [];
    navigator.enumerateDevices(function (devices) {
        devices.forEach(function (_device) {
            var device = {};
            for (var d in _device) {
                device[d] = _device[d];
            }

            // if it is MediaStreamTrack.getSources
            if (device.kind === 'audio') {
                device.kind = 'audioinput';
            }

            if (device.kind === 'video') {
                device.kind = 'videoinput';
            }

            var skip;
            MediaDevices.forEach(function (d) {
                if (d.id === device.id && d.kind === device.kind) {
                    skip = true;
                }
            });

            if (skip) {
                return;
            }

            if (!device.deviceId) {
                device.deviceId = device.id;
            }

            if (!device.id) {
                device.id = device.deviceId;
            }

            if (!device.label) {
                device.label = 'Please invoke getUserMedia once.';
                if (!isHTTPs) {
                    device.label = 'HTTPs is required to get label of this ' + device.kind + ' device.';
                }
            }

            if (device.kind === 'audioinput') {
                hasMicrophone = true;
            }

            if (device.kind === 'audiooutput') {
                hasSpeakers = true;
            }

            if (device.kind === 'videoinput') {
                hasWebcam = true;
            }

            // there is no 'videoouput' in the spec.

            MediaDevices.push(device);
        });

        if (typeof RTCDetect !== 'undefined') {
            RTCDetect.MediaDevices = MediaDevices;
            RTCDetect.hasMicrophone = hasMicrophone;
            RTCDetect.hasSpeakers = hasSpeakers;
            RTCDetect.hasWebcam = hasWebcam;
        }

        if (callback) {
            callback(null);
        }
    });
}
