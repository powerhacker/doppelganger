(function() {

	"use strict";

	var HT = {};

	/**
	 * A Point is simply x and y coordinates
	 * @constructor
	 */
	HT.Point = function(x, y) {
		this.X = x;
		this.Y = y;
	};

	/**
	 * A Rectangle is x and y origin and width and height
	 * @constructor
	 */
	HT.Rectangle = function(x, y, width, height) {
		this.X = x;
		this.Y = y;
		this.Width = width;
		this.Height = height;
	};

	/**
	 * A Line is x and y start and x and y end
	 * @constructor
	 */
	HT.Line = function(x1, y1, x2, y2) {
		this.X1 = x1;
		this.Y1 = y1;
		this.X2 = x2;
		this.Y2 = y2;
	};

	/**
	 * A Hexagon is a 6 sided polygon, our hexes don't have to be symmetrical, i.e. ratio of width to height could be 4 to 3
	 * @constructor
	 */
	HT.Hexagon = function(id, x, y) {
		this.Points = [];//Polygon Base
		var x1 = null;
		var y1 = null;

		if (HT.Hexagon.Static.ORIENTATION === HT.Hexagon.Orientation.Normal) {
			x1 = (HT.Hexagon.Static.WIDTH - HT.Hexagon.Static.SIDE)/2;
			y1 = (HT.Hexagon.Static.HEIGHT / 2);
			this.Points.push(new HT.Point(x1 + x, y));
			this.Points.push(new HT.Point(x1 + HT.Hexagon.Static.SIDE + x, y));
			this.Points.push(new HT.Point(HT.Hexagon.Static.WIDTH + x, y1 + y));
			this.Points.push(new HT.Point(x1 + HT.Hexagon.Static.SIDE + x, HT.Hexagon.Static.HEIGHT + y));
			this.Points.push(new HT.Point(x1 + x, HT.Hexagon.Static.HEIGHT + y));
			this.Points.push(new HT.Point(x, y1 + y));
		}
		else {
			x1 = (HT.Hexagon.Static.WIDTH / 2);
			y1 = (HT.Hexagon.Static.HEIGHT - HT.Hexagon.Static.SIDE)/2;
			this.Points.push(new HT.Point(x1 + x, y));
			this.Points.push(new HT.Point(HT.Hexagon.Static.WIDTH + x, y1 + y));
			this.Points.push(new HT.Point(HT.Hexagon.Static.WIDTH + x, y1 + HT.Hexagon.Static.SIDE + y));
			this.Points.push(new HT.Point(x1 + x, HT.Hexagon.Static.HEIGHT + y));
			this.Points.push(new HT.Point(x, y1 + HT.Hexagon.Static.SIDE + y));
			this.Points.push(new HT.Point(x, y1 + y));
		}

		this.Id = id;

		this.x = x;
		this.y = y;
		this.x1 = x1;
		this.y1 = y1;

		this.TopLeftPoint = new HT.Point(this.x, this.y);
		this.BottomRightPoint = new HT.Point(this.x + HT.Hexagon.Static.WIDTH, this.y + HT.Hexagon.Static.HEIGHT);
		this.MidPoint = new HT.Point(this.x + (HT.Hexagon.Static.WIDTH / 2), this.y + (HT.Hexagon.Static.HEIGHT / 2));

		this.P1 = new HT.Point(x + x1, y + y1);

		this.selected = false;
	};

	/**
	 * draws this Hexagon to the canvas
	 * @this {HT.Hexagon}
	 */
	HT.Hexagon.prototype.draw = function(ctx, stroke, fill) {
		ctx.beginPath();

		ctx.moveTo(this.Points[0].X, this.Points[0].Y);

		for (var i = 1; i < this.Points.length; i++) {
			var p = this.Points[i];
			ctx.lineTo(p.X, p.Y);
		}

		ctx.closePath();

		ctx.lineWidth = 2;
		ctx.strokeStyle = stroke || "#0c2731";

		if (this.selected || fill) {
			ctx.fillStyle = fill || "rgba(0, 0, 0, 0.15)";
			ctx.fill();
		}

		if (stroke !== false) {
			ctx.stroke();
		}
	};

	/**
	 * Returns true if the x,y coordinates are inside this hexagon
	 * @this {HT.Hexagon}
	 * @return {boolean}
	 */
	HT.Hexagon.prototype.isInBounds = function(x, y) {
		return this.Contains(new HT.Point(x, y));
	};


	/**
	 * Returns true if the point is inside this hexagon, it is a quick contains
	 * @this {HT.Hexagon}
	 * @param {HT.Point} p the test point
	 * @return {boolean}
	 */
	HT.Hexagon.prototype.isInHexBounds = function(/*Point*/ p) {
		if(this.TopLeftPoint.X < p.X && this.TopLeftPoint.Y < p.Y &&
			p.X < this.BottomRightPoint.X && p.Y < this.BottomRightPoint.Y) {
			return true;
		}
		return false;
	};

	//grabbed from:
	//http://www.developingfor.net/c-20/testing-to-see-if-a-point-is-within-a-polygon.html
	//and
	//http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html#The%20C%20Code
	/**
	 * Returns true if the point is inside this hexagon, it first uses the quick isInHexBounds contains, then check the boundaries
	 * @this {HT.Hexagon}
	 * @param {HT.Point} p the test point
	 * @return {boolean}
	 */
	HT.Hexagon.prototype.Contains = function(/*Point*/ p) {
		var isIn = false;

		if (this.isInHexBounds(p)) {
			//turn our absolute point into a relative point for comparing with the polygon's points
			//var pRel = new HT.Point(p.X - this.x, p.Y - this.y);
			var i, j = 0;
			for (i = 0, j = this.Points.length - 1; i < this.Points.length; j = i++) {

				var iP = this.Points[i];
				var jP = this.Points[j];

				if (
					(
					((iP.Y <= p.Y) && (p.Y < jP.Y)) ||
					((jP.Y <= p.Y) && (p.Y < iP.Y))
					) &&
					(p.X < (jP.X - iP.X) * (p.Y - iP.Y) / (jP.Y - iP.Y) + iP.X)
					)
				{
					isIn = !isIn;
				}
			}
		}
		return isIn;
	};

	HT.Hexagon.prototype.isOnScreen = function(offsetX, offsetY) {

		var point = this.MidPoint;

		var x = point.X + (offsetX || 0);
		var y = point.Y + (offsetY || 0);

		if (x < 0 || x > window.innerWidth) return false;
		if (y < 0 || y > window.innerHeight) return false;

		return true;

	};

	HT.Hexagon.Orientation = {
		Normal: 0,
		Rotated: 1
	};

	HT.Hexagon.Static = {
		HEIGHT: 86.60254037844388 * 2,
		WIDTH: 100 * 2,
		SIDE: 50.0 * 2,
		ORIENTATION:HT.Hexagon.Orientation.Normal,
		DRAWSTATS: false
	};

	window.HT = HT;

}());
