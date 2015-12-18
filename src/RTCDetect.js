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

//检测是否支持RTCPeerConnection
RTCDetect.RTCPeerConnectionSupport = checkRTCPeerConnection();

//检测是否支持DataChannel
RTCDetect.dataChannelSupport = checkDataChannel();

//检测是否支持WebSocket
RTCDetect.WebSocketSupport = 'WebSocket' in window && 2 === window.WebSocket.CLOSING;

//检测是否支持屏幕分享功能
//目前只有https下的35版本以上的chrome可以分享屏幕
RTCDetect.screenCaputringSupport = false;
if (RTCDetect.browser.isChrome && RTCDetect.browser.version >= 42) {
    RTCDetect.screenCaputringSupport = true;
}
if (!isHTTPs) {
    RTCDetect.screenCaputringSupport = false;
}

// ORTC相关
//==================================
//检测是否支持ORTC
RTCDetect.ORTCSupport = typeof RTCIceGatherer !== 'undefined';

//检查设备支持情况
RTCDetect.checkDeviceSupport = checkDeviceSupport;

//TODO:检测是否支持RTCat
RTCDetect.RTCatSupport = false;
//42版以上的chrome
if(RTCDetect.browser.isChrome && RTCDetect.browser.version >= 42){
    RTCDetect.RTCatSupport = true;
}
//38版以上的firefox
else if ( RTCDetect.browser.isFirefox && RTCDetect.browser.version >= 38) {
    RTCDetect.RTCatSupport = true;
}
//30版以上的Opera
else if(RTCDetect.browser.isOpera && RTCDetect.browser.version >= 30){
    RTCDetect.RTCatSupport = true;
}
//7以上的百度
else if(RTCDetect.browser.isBaidu && RTCDetect.browser.version >= 7){
    RTCDetect.RTCatSupport = true;
}



