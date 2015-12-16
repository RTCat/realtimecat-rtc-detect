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
