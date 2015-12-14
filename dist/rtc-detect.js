(function(window) {
"use strict";

//TODO:获取各浏览器的getUserMedia并统一

// For mobile devices
var isMobileDevice = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|IEMobile/i);

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
        osName = 'MacOS';
    }

    if (navigator.appVersion.indexOf('X11') !== -1) {
        osName = 'UNIX';
    }

    if (navigator.appVersion.indexOf('Linux') !== -1) {
        osName = 'Linux';
    }
}
var RTCDetect = window.RTCDetect = {};

// RTCDetect.browser.name || RTCDetect.browser.version || RTCDetect.browser.fullVersion
RTCDetect.browser = getBrowserInfo();

// RTCDetect.isChrome || RTCDetect.isFirefox || RTCDetect.isOpera etc
RTCDetect.browser['is' + RTCDetect.browser.name] = true;

RTCDetect.isMobileDevice = isMobileDevice; // "isMobileDevice" boolean is defined in "getBrowserInfo.js"

RTCDetect.osName = osName; // "osName" is defined in "getOSName.js"

//TODO:根据浏览器和版本判断是否支持某项功能
}(window));
