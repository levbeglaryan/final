const GameComponent = require("./Component");

module.exports = class Virus extends GameComponent {
	constructor(x, y) {
		super(x, y);
	}

	eat() {
		this.getNewCoordinates();
		const grasses = this.chooseCell(1);
		const grassEaters = this.chooseCell(2);
		const predators = this.chooseCell(3);
		const wingers = this.chooseCell(4);
		const all = [
			...grasses,
			...grassEaters,
			...predators,
			...wingers,
		];
		const oneCharacter = this.random(all);
		if (oneCharacter) {
			const oneCharacterX = oneCharacter[0];
			const oneCharacterY = oneCharacter[1];
			matrix[oneCharacterY][oneCharacterX] = 6;
			matrix[this.y][this.x] = 0;
			all.forEach(val => {
				const deleteX = val[0];
				const deleteY = val[1];

				if (!(deleteX === oneCharacterX && deleteY === oneCharacterY)) {
					matrix[deleteY][deleteX] = 0;
				}
			});

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

			for (const i in predatorArr) {
				if (oneCharacterX == predatorArr[i].x && oneCharacterY == predatorArr[i].y) {
					grassArr.splice(i, 1);
					break;
				}
			}

			for (const i in wingerArr) {
				if (oneCharacterX == wingerArr[i].x && oneCharacterY == wingerArr[i].y) {
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
		const cell = this.random(this.chooseCell(0));
		if (cell) {
			matrix[this.y][this.x] = 0;
			let neighX = cell[0];
			let neighY = cell[1];
			matrix[neighY][neighX] = 6;
			this.y = neighY;
			this.x = neighX;
		}
	}
};