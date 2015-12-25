// 检测datahannel支持情况
//==============================================

module.exports = function () {

    var dataChannelSupport = false;

    try {
        var PeerConnectionConstructor = window.RTCPeerConnection
            || window.webkitRTCPeerConnection
            || window.mozRTCPeerConnection;

        if (PeerConnectionConstructor) {
            var peerConnection = new PeerConnectionConstructor({
                'iceServers': [{'url': 'stun:0'}]
            });

            dataChannelSupport = 'createDataChannel' in peerConnection;
        }
    } catch (e) {
        dataChannelSupport = false;
    }

    return dataChannelSupport;
};
