const GameComponent = require("./Component");

module.exports = class Bomb extends GameComponent {
	constructor(x, y) {
		super(x, y);
	}

	move() {
		this.getNewCoordinates();
		const cell = this.random(this.chooseCell(0));
		if (cell) {
			matrix[this.y][this.x] = 0;
			let neighX = cell[0];
			let neighY = cell[1];
			matrix[neighY][neighX] = 5;
			this.y = neighY;
			this.x = neighX;
		}
	}
};