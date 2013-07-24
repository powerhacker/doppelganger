

window.getFaces = function(feed) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');

    canvas.width = feed.offsetWidth;
    canvas.height = feed.offsetHeight;

    ctx.drawImage(feed, 0, 0);

	function post(comp) {
		console.log("Found", comp.length, "faces!");

		var UI = document.getElementById("face") || document.createElement("canvas");
		var ctx = UI.getContext('2d');

		UI.id     = "face";
		UI.width  = localVideo.offsetWidth;
		UI.height = localVideo.offsetHeight;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";

		document.body.appendChild(UI);

		for (var i = 0, len = comp.length; i < len; i++) {
			var face = comp[i];
			ctx.save();
			ctx.scale(localVideo.offsetWidth / localVideo.width, localVideo.offsetHeight / localVideo.height);
			ctx.strokeRect(face.x, face.y, face.width, face.height);
			ctx.restore();
		}
	};

	ccv.detect_objects({
		"async": true,
		"canvas" : ccv.grayscale(ccv.pre(canvas)),
		"cascade" : cascade,
		"interval" : 5,
		"min_neighbors": 1,
		"worker" : 1
	})(post);
};
