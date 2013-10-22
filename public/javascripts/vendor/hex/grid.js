(function(HT) {

	"use strict";

	/**
	 * A Grid is the model of the playfield containing hexes
	 * @constructor
	 */
	HT.Grid = function(/*double*/ width, /*double*/ height) {

		this.Hexes = [];
		this.width = width,
		this.height = height;

		//setup a dictionary for use later for assigning the X or Y CoOrd (depending on Orientation)
		var HexagonsByXOrYCoOrd = {}; //Dictionary<int, List<Hexagon>>

		var row = 0;
		var y = 0.0;
		while (y + HT.Hexagon.Static.HEIGHT <= height) {
			var col = 0;

			var offset = 0.0;

			if (row % 2 === 1) {

				if (HT.Hexagon.Static.ORIENTATION === HT.Hexagon.Orientation.Normal) {
					offset = (HT.Hexagon.Static.WIDTH - HT.Hexagon.Static.SIDE)/2 + HT.Hexagon.Static.SIDE;
				} else {
					offset = HT.Hexagon.Static.WIDTH / 2;
				}
				col = 1;
			}

			var x = offset;
			while (x + HT.Hexagon.Static.WIDTH <= width) {
				var hexId = this.GetHexId(row, col);
				var h = new HT.Hexagon(hexId, x, y);

				var pathCoOrd = col;
				if (HT.Hexagon.Static.ORIENTATION === HT.Hexagon.Orientation.Normal) {
					h.PathCoOrdX = col;//the column is the x coordinate of the hex, for the y coordinate we need to get more fancy
				} else {
					h.PathCoOrdY = row;
					pathCoOrd = row;
				}

				this.Hexes.push(h);

				if (!HexagonsByXOrYCoOrd[pathCoOrd]) {
					HexagonsByXOrYCoOrd[pathCoOrd] = [];
				}

				HexagonsByXOrYCoOrd[pathCoOrd].push(h);

				col+=2;
				if (HT.Hexagon.Static.ORIENTATION === HT.Hexagon.Orientation.Normal) {
					x += HT.Hexagon.Static.WIDTH + HT.Hexagon.Static.SIDE;
				} else {
					x += HT.Hexagon.Static.WIDTH;
				}
			}
			row++;

			if (HT.Hexagon.Static.ORIENTATION === HT.Hexagon.Orientation.Normal) {
				y += HT.Hexagon.Static.HEIGHT / 2;
			} else {
				y += (HT.Hexagon.Static.HEIGHT - HT.Hexagon.Static.SIDE)/2 + HT.Hexagon.Static.SIDE;
			}
		}

		//finally go through our list of hexagons by their x co-ordinate to assign the y co-ordinate
		for (var coOrd1 in HexagonsByXOrYCoOrd) {
			var hexagonsByXOrY = HexagonsByXOrYCoOrd[coOrd1];
			var coOrd2 = Math.floor(coOrd1 / 2) + (coOrd1 % 2);
			for (var i in hexagonsByXOrY) {
				var j = hexagonsByXOrY[i]; //Hexagon;
				if (HT.Hexagon.Static.ORIENTATION === HT.Hexagon.Orientation.Normal) {
					j.PathCoOrdY = coOrd2++;
				} else {
					j.PathCoOrdX = coOrd2++;
				}
			}
		}
	};

	HT.Grid.Static = {
		Letters:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	};

	HT.Grid.prototype.GetHexId = function(row, col) {
		var letterIndex = row;
		var letters = "";

		while (letterIndex > 25) {
			letters = HT.Grid.Static.Letters[letterIndex%26] + letters;
			letterIndex -= 26;
		}

		return HT.Grid.Static.Letters[letterIndex] + letters + (col + 1);
	};

	/**
	 * Returns a hex at a given point
	 * @this {HT.Grid}
	 * @return {HT.Hexagon}
	 */
	HT.Grid.prototype.GetHexAt = function(/*Point*/ p) {

		//find the hex that contains this point
		for (var h in this.Hexes) {
			if (this.Hexes[h].Contains(p)) {
				return this.Hexes[h];
			}
		}

		return null;
	};

	/**
	 * Returns a distance between two hexes
	 * @this {HT.Grid}
	 * @return {number}
	 */
	HT.Grid.prototype.GetHexDistance = function(/*Hexagon*/ h1, /*Hexagon*/ h2) {
		//a good explanation of this calc can be found here:
		//http://playtechs.blogspot.com/2007/04/hex-grids.html
		var deltaX = h1.PathCoOrdX - h2.PathCoOrdX;
		var deltaY = h1.PathCoOrdY - h2.PathCoOrdY;
		return ((Math.abs(deltaX) + Math.abs(deltaY) + Math.abs(deltaX - deltaY)) / 2);
	};

	/**
	 * Returns a distance between two hexes
	 * @this {HT.Grid}
	 * @return {HT.Hexagon}
	 */
	HT.Grid.prototype.GetHexById = function(id) {

		for (var i in this.Hexes) {
			if (this.Hexes[i].Id === id) return this.Hexes[i];
		}

		return null;
	};

	HT.Grid.prototype.GetHexByCartesian = function (x, y) {
		for (var i in this.Hexes) {
			if (this.Hexes[i].PathCoOrdX === x && this.Hexes[i].PathCoOrdY === y) return this.Hexes[i];
		}
		return null;
	};

	HT.Grid.prototype.Cache = function() {

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');

		canvas.width = this.width;
		canvas.height = this.height;

		for (var h in this.Hexes) this.Hexes[h].draw(ctx);
		if (this.selected) this.selected.draw(ctx);

		return canvas;

	};

	HT.Grid.prototype.select = function(hex) {
		for (var h in this.Hexes) this.Hexes[h].selected = false;
		hex.selected = true;
		this.selected = hex;
	};

	HT.Grid.prototype.each = function(callback, scope) {

		var i = 0;
		var len = this.Hexes.length;

		for (i, len; i < len; i++) {
			callback.call(scope || this, this.Hexes[i]);
		}

		return this;

	};

	HT.Grid.prototype.eachOnScreen = function(offsetX, offsetY, callback, scope) {

		var i = 0;
		var len = this.Hexes.length;

		for (i, len; i < len; i++) {

			if (this.Hexes[i].isOnScreen(offsetX, offsetY)) {
				callback.call(scope || this, this.Hexes[i]);
			}

		}

	};

}(window.HT));
