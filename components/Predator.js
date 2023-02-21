module.exports = class Predator {
  constructor(x, y) {
    this.x = x;
    this.y = y;
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
		for (const i in this.directions) {
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

  eat() {
		this.getNewCoordinates();
		let grasses = this.chooseCell(1);
		let grassEaters = this.chooseCell(2);
		let all = grasses.concat(grassEaters);
		let oneCharacter = random(all);
		if (oneCharacter) {
			let oneCharacterX = oneCharacter[0];
			let oneCharacterY = oneCharacter[1];
			matrix[oneCharacterY][oneCharacterX] = 3;
			matrix[this.y][this.x] = 0;
			this.y = oneCharacterY;
			this.x = oneCharacterX;

			for (const i in grassEaterArr) {
				if (oneCharacterX == grassEaterArr[i].x && oneCharacterY == grassEaterArr[i].y) {
					grassEaterArr.splice(i, 1);
					break;
				}
			}

			for (const i in grassArr) {
				if (oneCharacterX == grassArr[i].x && oneCharacterY == grassArr[i].y) {
					grassArr.splice(i, 1);
					break;
				}
			}
		} else {
			this.move();
		}
  }

  move() {
		this.getNewCoordinates();
		let oneDirection = random(this.chooseCell(0));
		if (oneDirection) {
			matrix[this.y][this.x] = 0;
			let neighX = oneDirection[0];
			let neighY = oneDirection[1];
			matrix[neighY][neighX] = 3;
			this.y = neighY;
			this.x = neighX;
		}
	}
}