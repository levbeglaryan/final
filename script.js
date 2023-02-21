let side = 40;
let socket = io();

function setup() {
	createCanvas(50 * side, 50 * side);
	const TIMEINTERVAL = 5000;
	// setInterval(() => {
	// 	const bomb = new Bomb();
	// 	bomb.kill();
	// }, TIMEINTERVAL);

	// for (const i in wingerArr) {
	// 	wingerArr[i].moveToWing();
	// }
}

function updateColors() {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			const current = matrix[y][x];
			if (current === 1) {
				fill("green");
			} else if (current === 2) {
				fill("yellow");
			} else if (current === 3) {
				fill("red");
			} else if (current === 4) {
				fill("black");
			} else if (current === 5) {
				fill("purple");
			} else {
				fill("#acacac");
			}

			rect(x * side, y * side, side, side);
		}
	}
}


socket.on("send matrix", updateColors);