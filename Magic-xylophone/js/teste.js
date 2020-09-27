(function() {

function hasGetUserMedia() {
	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

var webcamError = function(e) {
	alert('Webcam error!', e);
};

var video = $('#webcam')[0];

if (navigator.getUserMedia) {
	navigator.getUserMedia({audio: true, video: true}, function(stream) {
		video.src = stream;
	}, webcamError);
} else if (navigator.webkitGetUserMedia) {
         navigator.webkitGetUserMedia({audio:true, video:true}, function(stream) {
		video.src = window.webkitURL.createObjectURL(stream);
	}, webcamError);
} else {
	//video.src = 'video.webm'; // fallback.
}
    
})();