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

//TODO:检测是否支持WebSocket

//TODO:检测是否支持屏幕分享功能

//TODO:检测是否支持RTCat
var RTCatSupport = false;
if(RTCDetect.browser.isChrome || RTCDetect.browser.isFirefox || RTCDetect.browser.isOpera){
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



