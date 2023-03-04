module.exports = class Winger {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.energy = 0;
	}
	
	moveToWing() {
		while (this.x > 0) {
			matrix[this.y][this.x] = 0;
			this.x--;
			matrix[this.y][this.x] = 4;
		}
		while (this.y > 0) {
			matrix[this.y][this.x] = 0;
			this.y--;
			matrix[this.y][this.x] = 4;
		}
	}

	move() {
		matrix[this.y][this.x] = 0;
		if(this.y === 0 && this.x !== matrix[0].length - 1) {
			this.x++;
		} else if (this.x === matrix[0].length - 1 && this.y !== matrix.length - 1) {
			this.y++;
		} else if (this.y === matrix.length - 1 && this.x !== 0) {
			this.x--;
		} else {
			this.y--;
		}
		
		if (matrix[this.y][this.x]) {
			this.energy++;
		}

		if (this.energy > 50) {
			this.mul(0, 0);
		}

		const current = matrix[this.y][this.x];

		if (current === 1) {
			this.del(grassArr);
		} else if (current === 2) {
			this.del(grassEaterArr);
		} else if (current === 3) {
			this.del(predatorArr);
		}
		
		matrix[this.y][this.x] = 4;
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

	mul(x, y) {
		this.energy = 0;
		const winger = new Winger(x, y);
		wingerArr.push(winger);
	}
};