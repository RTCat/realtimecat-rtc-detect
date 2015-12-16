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
