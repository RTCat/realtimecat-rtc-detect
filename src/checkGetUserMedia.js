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
