const GameComponent = require("./Component");

module.exports = class Grass extends GameComponent {
	constructor(x, y) {
		super(x, y);
		this.multiply = 0;
		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this.x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1]
		];
	}

	mul() {
		this.multiply++;
		const emptyCells = this.chooseCell(0);
		const newCell = this.random(emptyCells);
		if(newCell && this.multiply >= 2) {
			const newX = newCell[0];
			const newY = newCell[1];
			matrix[newY][newX] = 1;
			const newGrass = new Grass(newX, newY, 1);
			grassArr.push(newGrass);
			this.multiply = 0;
		}
	}
};