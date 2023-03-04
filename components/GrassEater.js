const GameComponent = require("./Component");

module.exports = class GrassEater extends GameComponent {
	constructor(x, y) {
		super(x, y);
		this.gender = this.randomGender();
		this.color = this.gender === "male" ? "blue" : "yellow";
		this.energy = 8;
	}

	move() {
		if (this.energy > 0) {
			this.getNewCoordinates();
			this.energy--;
			let emptyCells = this.chooseCell(0);
			let oneEmptyCell = this.random(emptyCells);
			if (oneEmptyCell) {
				matrix[this.y][this.x] = 0;
				let neighX = oneEmptyCell[0];
				let neighY = oneEmptyCell[1];
				matrix[neighY][neighX] = 2;
				this.y = neighY;
				this.x = neighX;
			}
		} else {
			this.die();
		}
	}

	mul(x, y) {
		if (this.gender === "female") {
			this.energy = 8;
			matrix[y][x] = 2;
			const newGrassEater = new GrassEater(x, y);
			grassEaterArr.push(newGrassEater);
		}
	}

	eat() {
		this.getNewCoordinates();
		let grasses = this.chooseCell(1);
		let oneGrass = this.random(grasses);
		if (oneGrass) {
			this.energy++;
			let oneGrassX = oneGrass[0];
			let oneGrassY = oneGrass[1];
			if(this.energy >= 12) {
				this.mul(oneGrassX, oneGrassY);
			} else {
				matrix[oneGrassY][oneGrassX] = 2;
			}
			matrix[this.y][this.x] = 0;
			this.y = oneGrassY;
			this.x = oneGrassX;

			for (const i in grassArr) {
				if (oneGrassX == grassArr[i].x && oneGrassY == grassArr[i].y) {
					grassArr.splice(i, 1);
					break;
				}
			}
		} else {
			this.move();
		}
	}

	die() {
		matrix[this.y][this.x] = 0;
		for (const i in grassEaterArr) {
			if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
				grassEaterArr.splice(i, 1);
				break;
			}
		}
	}
};