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
