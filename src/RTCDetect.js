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
var getUserMediaSupport = false;
if (navigator.getUserMedia) {
    getUserMediaSupport = true;
} else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    getUserMediaSupport = true;
}
if (RTCDetect.browser.isChrome && RTCDetect.browser.version >= 46 && !isHTTPs) {
    RTCDetect.getUserMediaSupport = 'Requires HTTPs';
}
RTCDetect.getUserMediaSupport = getUserMediaSupport;

//检测是否支持RTCPeerConnection
var RTCPeerConnectionSupport = false;
['RTCPeerConnection', 'webkitRTCPeerConnection', 'mozRTCPeerConnection'].forEach(function (item) {
    if (RTCPeerConnectionSupport) {
        return;
    }

    if (item in window) {
        RTCPeerConnectionSupport = true;
    }
});

RTCDetect.RTCPeerConnectionSupport = RTCPeerConnectionSupport;

//TODO:检测是否支持DataChannel
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
            //Chrome doesn't supoort reliable DataChannels yet
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

//TODO:检测是否支持WebSocket

//TODO:检测是否支持屏幕分享功能

//检测是否支持WebRTC
var WebRTCSupport = false;
RTCDetect.WebRTCSupport = WebRTCSupport;

// ORTC相关
//==================================
//TODO:检测是否支持ORTC
RTCDetect.ORTCSupport = typeof RTCIceGatherer !== 'undefined';

//TODO:初始化
RTCDetect.init = function (callback) {
    checkDeviceSupport(callback);
};



