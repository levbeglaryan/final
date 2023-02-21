const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static("."));

app.get("/", (req, res) => {
  res.redirect("index.html");
});

app.listen(3000);


matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
wingerArr = [];

let Bomb = require("./components/Bomb");
let Grass = require("./components/grass");
let GrassEater = require("./components/GrassEater");
let Predator = require("./components/Predator");
let Winger = require("./components/Winger");

function matrixGenerator(size, countGrass, countGrassEater, countPredator) {
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
      let x = Math.floor(random(0, size-1));
      let y = Math.floor(random(0, size-1));
      matrix[y][x] = 1;
    }
    
    for (let i = 0; i < countGrassEater; i++) {
      let x = Math.floor(random(0, size-1));
      let y = Math.floor(random(0, size-1));
      matrix[y][x] = 2;
    }
      
    for (let i = 0; i < countPredator; i++) {
      let x = Math.floor(random(0, size-1));
      let y = Math.floor(random(0, size-1));
      matrix[y][x] = 3;
    }
        
  let x = Math.floor(random(0, size));
  let y = Math.floor(random(0, size));
  matrix[y][x] = 5;

  io.emit("send matrix", matrix);
};

matrixGenerator(20, 200, 3, 1);

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
			} else if (current === 5) {
				const winger = new Winger(x, y);
				wingerArr.push(winger);
			}
		}
	}
}

createObject();

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
  
  io.emit("send matrix", matrix);
}

setInterval(gameMove, 500);