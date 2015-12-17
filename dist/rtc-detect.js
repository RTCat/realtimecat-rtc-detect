(function(window) {
"use strict";

//Get Browser Info
//-----------------------------------------------------------------------------------------------

function getBrowserInfo() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var nameOffset, verOffset, ix;


    // In Opera 15+, the true version is after "OPR/"
    if ((verOffset=nAgt.indexOf("OPR/"))!=-1) {
        browserName = "Opera";
        fullVersion = nAgt.substring(verOffset+4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
        browserName = 'Opera';
        fullVersion = nAgt.substring(verOffset + 6);

        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            fullVersion = nAgt.substring(verOffset + 8);
        }
    }
    // In MSIE, the true version is after 'MSIE' in userAgent
    else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
        browserName = 'IE';
        fullVersion = nAgt.substring(verOffset + 5);
    }
    // In Chrome, the true version is after 'Chrome'
    else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
        browserName = 'Chrome';
        fullVersion = nAgt.substring(verOffset + 7);
    }
    // In Safari, the true version is after 'Safari' or after 'Version'
    else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
        browserName = 'Safari';
        fullVersion = nAgt.substring(verOffset + 7);

        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
            fullVersion = nAgt.substring(verOffset + 8);
        }
    }
    // In Firefox, the true version is after 'Firefox'
    else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
        browserName = 'Firefox';
        fullVersion = nAgt.substring(verOffset + 8);
    }
    // In most other browsers, 'name/version' is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        fullVersion = nAgt.substring(verOffset + 1);

        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    // MS Edge
    var isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob);
    // 国产浏览器
    var isQQ = /QQBrowser/.test(navigator.userAgent);
    var isSougou = /MetaSr/.test(navigator.userAgent);
    var isBaidu = /BIDUBrowser/.test(navigator.userAgent);
    var isLiebao = _testExternal(/^liebao/i, 0);
    // TODO:360浏览器
    var isEE360 = false;
    var isSE360 = false;

    function _testExternal(reg, type) {
        var external = window.external || {};
        for (var i in external) {
            if (reg.test(type ? external[i] : i)) {
                return true;
            }
        }
        return false;
    }

    if (isEdge) {
        browserName = 'Edge';
        // fullVersion = navigator.userAgent.split('Edge/')[1];
        fullVersion = parseInt(navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)[2], 10).toString();
    }

    if(isQQ){
        browserName = 'QQ';
        fullVersion = parseInt(navigator.userAgent.match(/QQBrowser\/(\d+).(\d+)/)[2], 10).toString();
    }

    if(isSougou){
        browserName = 'Sougou';
        fullVersion = parseInt(navigator.userAgent.match(/MetaSr (\d+).(\d+)/)[2], 10).toString();
    }

    if(isBaidu){
        browserName = 'Baidu';
        fullVersion = parseInt(navigator.userAgent.match(/BIDUBrowser\/(\d+).(\d+)/)[2], 10).toString();
    }

    if(isLiebao){
        browserName = 'Liebao';
        fullVersion = "";
    }

    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    if ((ix = fullVersion.indexOf(' ')) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    majorVersion = parseInt('' + fullVersion, 10);

    if (isNaN(majorVersion)) {
        fullVersion = '' + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return {
        fullVersion: fullVersion,
        version: majorVersion,
        name: browserName
    };
}

//Get OS Name
//-----------------------------------------------------------------------------------------------
function getOSName() {
    var osName = 'Unknown OS';

    var isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        },
        getOsName: function () {
            var osName = 'Unknown OS';
            if (isMobile.Android()) {
                osName = 'Android';
            }

            if (isMobile.BlackBerry()) {
                osName = 'BlackBerry';
            }

            if (isMobile.iOS()) {
                osName = 'iOS';
            }

            if (isMobile.Opera()) {
                osName = 'Opera Mini';
            }

            if (isMobile.Windows()) {
                osName = 'Windows';
            }

            return osName;
        }
    };

    if (isMobile.any()) {
        osName = isMobile.getOsName();
    } else {
        if (navigator.appVersion.indexOf('Win') !== -1) {
            osName = 'Windows';
        }

        if (navigator.appVersion.indexOf('Mac') !== -1) {
            osName = 'OSX';
        }

        if (navigator.appVersion.indexOf('X11') !== -1) {
            osName = 'UNIX';
        }

        if (navigator.appVersion.indexOf('Linux') !== -1) {
            osName = 'Linux';
        }
    }

    return osName;
}
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

//检测是否支持getUserMedia
function checkGetUserMedia() {
    var getUserMediaSupport = false;

    if (typeof navigator.webkitGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
    }

    if (typeof navigator.mozGetUserMedia !== 'undefined') {
        navigator.getUserMedia = navigator.mozGetUserMedia;
    }

    if (navigator.getUserMedia) {
        getUserMediaSupport = true;
    } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        getUserMediaSupport = true;
    }

    return getUserMediaSupport;
}

//检测是否支持RTCPeerConnection
function checkRTCPeerConnection() {
    var RTCPeerConnectionSupport = false;
    ['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection'].forEach(function (item) {
        if (RTCPeerConnectionSupport) {
            return;
        }

        if (item in window) {
            RTCPeerConnectionSupport = true;
        }
    });
    return RTCPeerConnectionSupport;
}

function checkDataChannel() {
    var dataChannelSupport = false;

    //used to have only one interface
    window.RTCPeerConnection = window.RTCPeerConnection
        || window.webkitRTCPeerConnection
        || window.mozRTCPeerConnection;
    window.RTCSessionDescription = window.RTCSessionDescription
        || window.webkitRTCSessionDescription
        || window.mozRTCSessionDescription;
    window.RTCIceCandidate = window.RTCIceCandidate
        || window.webkitRTCIceCandidate
        || window.mozRTCIceCandidate;

    (function () {
        if (!!window.webkitRTCPeerConnection) { //must be chrome
            var testPC = new window.RTCPeerConnection({iceServers: [{url: "stun:stunserver.org:3478"}]}, {optional: [{RtpDataChannels: true}]}),
                dc;
            if (testPC && testPC.createDataChannel) {
                //Chrome doesn't support reliable DataChannels yet
                dc = testPC.createDataChannel("testDataChannel", {reliable: false});
                if (!!dc) {
                    dataChannelSupport = true;
                    dc.close();
                }
            }
            testPC.close();
        }
        else {
            dataChannelSupport = window.RTCPeerConnection !== undefined
                && window.DataChannel !== undefined;
        }
    }());

    return dataChannelSupport;
}

var RTCDetect = window.RTCDetect = {};

var isHTTPs = location.protocol === 'https:';

// RTCDetect.browser.name || RTCDetect.browser.version || RTCDetect.browser.fullVersion
RTCDetect.browser = getBrowserInfo();

// RTCDetect.isChrome || RTCDetect.isFirefox || RTCDetect.isOpera etc
RTCDetect.browser['is' + RTCDetect.browser.name] = true;

// 获取操作系统名称
RTCDetect.osName = getOSName();

// WebRTC相关检测
//===================================
//检测是否支持getUserMedia
RTCDetect.getUserMediaSupport = checkGetUserMedia();
if (RTCDetect.browser.isChrome && RTCDetect.browser.version >= 46 && !isHTTPs) {
    RTCDetect.getUserMediaSupport = 'Requires HTTPs';
}

//检测是否支持RTCPeerConnection
RTCDetect.RTCPeerConnectionSupport = checkRTCPeerConnection();

//检测是否支持DataChannel
RTCDetect.dataChannelSupport = checkDataChannel();

//检测是否支持WebSocket
RTCDetect.WebSocketSupport = 'WebSocket' in window && 2 === window.WebSocket.CLOSING;

//TODO:检测是否支持屏幕分享功能

//TODO:检测是否支持RTCat
var RTCatSupport = false;
if (RTCDetect.browser.isChrome || RTCDetect.browser.isFirefox || RTCDetect.browser.isOpera) {
    RTCatSupport = true;
}
RTCDetect.RTCatSupport = RTCatSupport;

// ORTC相关
//==================================
//检测是否支持ORTC
RTCDetect.ORTCSupport = typeof RTCIceGatherer !== 'undefined';

//TODO:初始化
RTCDetect.init = function (callback) {
    checkDeviceSupport(callback);
};
}(window));
