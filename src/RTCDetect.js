var RTCDetect = window.RTCDetect = {};

var isHTTPs = location.protocol === 'https:';

// RTCDetect.browser.name || RTCDetect.browser.version || RTCDetect.browser.fullVersion
RTCDetect.browser = getBrowserInfo();

// RTCDetect.isChrome || RTCDetect.isFirefox || RTCDetect.isOpera etc
RTCDetect.browser['is' + RTCDetect.browser.name] = true;

// "isMobileDevice" boolean is defined in "getBrowserInfo.js"
RTCDetect.isMobileDevice = isMobileDevice;

// "osName" is defined in "getOSName.js"
RTCDetect.osName = osName;

RTCDetect.init = function (callback) {
    this.initCallback = callback;
    checkDeviceSupport(callback);
};

//TODO:根据浏览器和版本判断是否支持某项功能


