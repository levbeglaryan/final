module.exports = class GrassEater {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 8;
		this.directions = [];
	}

	getNewCoordinates() {
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

	random(ch){
		let found = this.chooseCell(ch);
		let result = Math.floor(Math.random()*found.length)
		return found[result];
}

	chooseCell(character) {
		let found = [];
		for (let i in this.directions) {
			let x = this.directions[i][0];
			let y = this.directions[i][1];
			if ((x >= 0 && x < matrix[0].length) && (y >= 0 && y < matrix.length)) {
				if (matrix[y][x] === character) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}

	move() {
		if (this.energy > 0) {
			this.getNewCoordinates();
			this.energy--;
			let emptyCells = this.chooseCell(0);
			let oneEmptyCell = random(emptyCells);
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
		this.energy = 8;
		matrix[y][x] = 2;
		const newGrassEater = new GrassEater(x, y);
		grassEaterArr.push(newGrassEater);
	}

	eat() {
		this.getNewCoordinates();
		let grasses = this.chooseCell(1);
		let oneGrass = random(grasses);
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
}