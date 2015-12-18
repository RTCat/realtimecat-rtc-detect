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

// IE不支持
if(RTCDetect.browser.isIE){
    RTCDetect.getUserMediaSupport = false;
}
// 46版以上的chrome需要启用https
else if (RTCDetect.browser.isChrome && RTCDetect.browser.version >= 46 && !isHTTPs) {
    RTCDetect.getUserMediaSupport = 'Requires HTTPs';
}
// 其他通过featrue detect检测
else{
    RTCDetect.getUserMediaSupport = checkGetUserMedia();
}

//检测是否支持RTCPeerConnection
if(RTCDetect.isIE){
    RTCDetect.RTCPeerConnectionSupport = false;
}else{
    RTCDetect.RTCPeerConnectionSupport = checkRTCPeerConnection();
}

//检测是否支持DataChannel
RTCDetect.dataChannelSupport = checkDataChannel();

//检测是否支持WebSocket
RTCDetect.WebSocketSupport = 'WebSocket' in window && 2 === window.WebSocket.CLOSING;

//检测是否支持屏幕分享功能
//目前只有https下的35版本以上的chrome可以分享屏幕
RTCDetect.screenCaputringSupport = false;
if (RTCDetect.browser.isChrome && RTCDetect.browser.version >= 35) {
    RTCDetect.screenCaputringSupport = true;
}
if (!isHTTPs) {
    RTCDetect.screenCaputringSupport = false;
}

//TODO:检测是否支持RTCat
RTCDetect.RTCatSupport = false;
if (RTCDetect.browser.isChrome || RTCDetect.browser.isFirefox || RTCDetect.browser.isOpera) {
    RTCDetect.RTCatSupport = true;
}

// ORTC相关
//==================================
//检测是否支持ORTC
RTCDetect.ORTCSupport = typeof RTCIceGatherer !== 'undefined';

//TODO:初始化
RTCDetect.init = function (callback) {
    checkDeviceSupport(callback);
};



