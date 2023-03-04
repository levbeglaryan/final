module.exports = class Component {
	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.directions = [];
	}

	randomGender() {
		return Math.round(Math.random()) ? "male" : "female";
	}

	random(arr) {
		return arr[Math.floor(Math.random() * arr.length)];
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
};