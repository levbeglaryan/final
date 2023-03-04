// Express
const express = require("express");
const app = express();
// Creating http server
const server = require("http").createServer(app);
// Socket.io
const io = require("socket.io")(server);
// FileSystem
const fs = require("fs");
// requiring the components
const Grass = require("./components/grass");
const GrassEater = require("./components/GrassEater");
const Predator = require("./components/Predator");
const Winger = require("./components/Winger");
const Bomb = require("./components/Bomb");
const Virus = require("./components/Virus");

// Server
app.use(express.static("."));
app.get("/", (req, res) => {
	res.redirect("index.html");
});
server.listen(3000);

// Component arrays
matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
wingerArr = [];
bombArr = [];
virusArr = [];

// Game fps
let GAMESPEED = 500;
// Statistics writing interval
const MINUTEINTERVAL = 1000;

// Matrix creator function
function matrixGenerator(size, countGrass, countGrassEater, countPredator, countBomb, virusCount) {
	// Random integer generator
	function random(min, max) {
		return Math.round(Math.random() * (max - min) + min);
	}

		for (let i = 0; i < size; i++) {
			matrix.push([]);
			for (let j = 0; j < size; j++) {
				matrix[i].push(0);
			}
		}

		for (let i = 0; i < countGrass; i++) {
			const x = Math.floor(random(0, size - 1));
			const y = Math.floor(random(0, size - 1));
			matrix[y][x] = 1;
		}
		
		for (let i = 0; i < countGrassEater; i++) {
			const x = Math.floor(random(0, size - 1));
			const y = Math.floor(random(0, size - 1));
			matrix[y][x] = 2;
		}
			
		for (let i = 0; i < countPredator; i++) {
			const x = Math.floor(random(0, size - 1));
			const y = Math.floor(random(0, size - 1));
			matrix[y][x] = 3;
		}

		for (let i = 0; i < countBomb; i++) {
			const x = Math.floor(random(0, size - 1));
			const y = Math.floor(random(0, size - 1));
			matrix[y][x] = 5;
		}

		for (let i = 0; i < virusCount; i++) {
			const x = Math.floor(random(0, size - 1));
			const y = Math.floor(random(0, size - 1));
			matrix[y][x] = 6;
		}

	// Creation of a winger
	const x = 0;
	const y = 0;
	matrix[y][x] = 4;

	// Sending current matrix to script.js file
	io.emit("send matrix", matrix);
};
// Creating the matrix
matrixGenerator(20, 10, 4, 1, 1, 1);

// Creating game objects
function createObject() {
  for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			const current = matrix[y][x];
			if (current === 1) {
				const gr = new Grass(x, y);
				grassArr.push(gr);
			} else if (current === 2) {
				const grassEater = new GrassEater(x, y);
				grassEaterArr.push(grassEater);
			} else if (current === 3) {
				const predator = new Predator(x, y);
				predatorArr.push(predator);
			} else if (current === 4) {
				const winger = new Winger(x, y);
				wingerArr.push(winger);
			} else if (current === 5) {
				const bomb = new Bomb(x, y);
				bombArr.push(bomb);
			} else if (current === 6) {
				const virus = new Virus(x, y);
				virusArr.push(virus);
			}
		}
	}
}
// Proglem
createObject();

// Moving game components
function gameMove() {
	for (const i in grassArr) {
		grassArr[i].mul();
	}

	for (const i in grassEaterArr) {
		grassEaterArr[i].eat();
	}

	for (const i in predatorArr) {
		predatorArr[i].eat();
	}

	for (const i in wingerArr) {
		wingerArr[i].move();
	}

	for (const i in bombArr) {
		bombArr[i].move();
	}

	for (const i in virusArr) {
		virusArr[i].eat();
	}

	// Sending current matrix to script.js file
	io.emit("send matrix", matrix, grassEaterArr);
}
// Running the game
id = setInterval(gameMove, GAMESPEED);

// Writing the game stats to stats.json file every minute
function writeStats() {
	const currentData = {
		grass: grassArr.length,
		grassEater: grassEaterArr.length,
		predator: predatorArr.length,
		winger: wingerArr.length,
		bomb: bombArr.length,
		virus: virusArr.length
	};

	fs.writeFile("stats.json", JSON.stringify(currentData, undefined,	2), () => {
			io.emit("send statistics", currentData);
	});
}
setInterval(writeStats, MINUTEINTERVAL);

// Restarting the game
function restartGame() {
	matrix = [];
	grassArr = [];
	grassEaterArr = [];
	predatorArr = [];
	wingerArr = [];
	bombArr = [];
	virusArr = [];
	GAMESPEED = 500;

	io.emit("restart weather");

	matrixGenerator(20, 10, 4, 1, 1, 1);
	createObject();
}

function changeSpeed(speedUp, timeout) {
	clearInterval(id);
	let speed = speedUp ? GAMESPEED / 2 : GAMESPEED * 2;
	id = setInterval(gameMove, speed);
	setTimeout(() => {
		clearInterval(id);
		id = setInterval(gameMove, GAMESPEED);
	}, timeout);
}

io.on("connection", socket => {
	// Clearing the game canvas
	socket.on("clear canvas", restartGame);

	socket.on("weather change", data => {
		if (data.weather === "winter") {
			changeSpeed(false, data.WeatherEndtimeout);
		} else if (data.weather === "summer") {
			changeSpeed(true, data.WeatherEndtimeout);
		}
	});
});