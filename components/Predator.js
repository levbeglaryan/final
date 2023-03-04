const GameComponent = require("./Component");

module.exports = class Predator extends GameComponent {
	constructor(x, y) {
		super(x, y);
	}

	eat() {
		this.getNewCoordinates();
		let grasses = this.chooseCell(1);
		let grassEaters = this.chooseCell(2);
		let all = grasses.concat(grassEaters);
		let oneCharacter = this.random(all);
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
		const emptyCells = this.chooseCell(0);
		let oneDirection = this.random(emptyCells);
		if (oneDirection) {
			matrix[this.y][this.x] = 0;
			let neighX = oneDirection[0];
			let neighY = oneDirection[1];
			matrix[neighY][neighX] = 3;
			this.y = neighY;
			this.x = neighX;
		}
	}
};