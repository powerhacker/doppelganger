(function(HT) {

	"use strict";

	window.findHexWithSideLengthZAndRatio = function (z, r) {

		z = z || 50.0;
		r = r || 1.1547;

		// Solve quadratic
		var r2 = Math.pow(r, 2);
		var a = (1 + r2)/r2;
		var b = z/r2;
		var c = ((1-4.0*r2)/(4.0*r2)) * (Math.pow(z, 2));

		var x = (-b + Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);

		var y = ((2.0 * x) + z)/(2.0 * r);

		var width = ((2.0*x)+z);
		var height = (2.0*y);

		HT.Hexagon.Static.WIDTH = width;
		HT.Hexagon.Static.HEIGHT = height;
		HT.Hexagon.Static.SIDE = z;

	};

	window.findHexWithWidthAndHeight = function (width, height) {

		width = width || 100;
		height = height || 86.60254037844388;

		var y = height/2.0;

		//solve quadratic
		var a = -3.0;
		var b = (-2.0 * width);
		var c = (Math.pow(width, 2)) + (Math.pow(height, 2));

		var z = (-b - Math.sqrt(Math.pow(b,2)-(4.0*a*c)))/(2.0*a);

		var x = (width - z)/2.0;

		HT.Hexagon.Static.WIDTH = width;
		HT.Hexagon.Static.HEIGHT = height;
		HT.Hexagon.Static.SIDE = z;
	};

}(window.HT));
