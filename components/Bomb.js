module.exports = class Bomb {
	constructor() {
		this.x = round(random(matrix[0].length));
		this.y = round(random(matrix.length));

		this.directions = [
			[this.x - 1, this.y - 1],
			[this.x, this.y - 1],
			[this.x + 1, this.y - 1],
			[this.x - 1, this.y],
			[this.x + 1, this.y],
			[this. x - 1, this.y + 1],
			[this.x, this.y + 1],
			[this.x + 1, this.y + 1],
			[this.x - 2, this.y],
			[this.x - 2, this.y - 1],
			[this.x - 2, this.y - 2],
			[this.x - 1, this.y - 2],
			[this.x, this.y - 2],
			[this.x + 1, this.y - 2],
			[this.x + 2, this.y + 2],
			[this.x + 2, this.y - 1],
			[this.x + 2, this.y],
			[this.x + 2, this.y + 1],
			[this.x + 2, this.y + 2],
			[this.x + 1, this.y + 2],
			[this.x, this.y + 2],
			[this.x - 1, this.y + 2],
			[this.x - 2, this.y + 2],
			[this.x - 2, this.y + 1],
		];
	}

	random(ch){
		let found = this.chooseCell(ch);
		let result = Math.floor(Math.random()*found.length)
		return found[result];
}

	kill() {
		const audio1 = new Audio("components/audio/falling-bomb-41038.mp3");
		const audio2 = new Audio("components/audio/videoplayback.mp3");
		audio1.play();
		matrix[this.y][this.x] = 4;
		if (matrix[this.y][this.x] === 1) {
			this.del(grassArr);
		} else if (matrix[this.y][this.x] === 2) {
			this.del(grassEaterArr);
		} else if (matrix[this.y][this.x] === 3) {
			this.del(predatorArr);
		}

		audio1.addEventListener("ended", () => {
			audio2.play();
		});
		
		audio2.addEventListener("play", () => {
			for (let i = 0; i < this.directions.length; i++) {
				const current = this.directions[i];
				const [x, y] = current;
				if ((x >= 0 && x < matrix[0].length) && (y >= 0 && y < matrix.length)) {
					matrix[y][x] = 0;
					if (current === 1) {
						this.del(grassArr);
					} else if (current === 2) {
						this.del(grassEaterArr);
					} else if (current === 3) {
						this.del(predatorArr);
					}
					matrix[y][x] = 0;
				}
			}		
			setTimeout(() => {
				matrix[this.y][this.x] = 0;
			}, 1000)
		});
	}

	del(cell) {
		if (cell === grassArr) {
			for (const i in grassArr) {
				if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
					grassArr.splice(i, 1);
					break;
				}
			}
		} else if (cell === grassEaterArr) {
			for (const i in grassEaterArr) {
				if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
					grassEaterArr.splice(i, 1);
					break;
				}
			}
		} else if (cell === predatorArr) {
			for (const i in predatorArr) {
				if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
					predatorArr.splice(i, 1);
					break;
				}
			}
		}
	}
}