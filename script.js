// Component size
let side = 40;
// Weather
let weather;
// Socket.io
const socket = io();

// Creating the game canvas
function setup() {
	createCanvas(50 * side, 50 * side);
}

// Updating the colors
function updateColors(matrix, grassEaterArr) {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			const current = matrix[y][x];
			if (current === 1) {
				fill("green");
			} else if (current === 2) {
				try {
					const currentGrassEater = grassEaterArr.find(grassEater => {
						return grassEater.x === x && grassEater.y === y;
					});
					fill(currentGrassEater.color);
				} catch {}
			} else if (current === 3) {
				fill("red");
			} else if (current === 4) {
				fill("purple");
			} else if (current === 5) {
				fill("#000");
			} else if (current === 6) {
				fill("#493713");
			} else {
				if (weather === "winter") {
					fill ("#fff");
				} else if (weather === "summer") {
					fill("#ffdc7f");
				} else {
					fill("#acacac");
				}
			}

			rect(x * side, y * side, side, side);
		}
	}
}
socket.on("send matrix", updateColors);

// Working with DOM
function updateCurrentInfo(data) {
	const infoTxts = document.getElementsByClassName("current_count_info");
	infoTxts.forEach(txt => {
		txt.innerText = data[txt.getAttribute("data-name")];
	});
}
socket.on("send statistics", updateCurrentInfo);

// Iteractions with the game
function iteractions() {
	// Changing weather
	const weatherBtns = document.getElementsByClassName("weather");
	const weatherInfo = document.querySelector(".current_weather_info");
	// Restarting the game
	const restartBtn = document.getElementById("restart");
	restartBtn.addEventListener("click", () => {
		socket.emit("clear canvas");
		weatherBtns.forEach(btn => {
			btn.disabled = btn.disabled ? false : "";
		});

		socket.on("restart weather", () => {
			weather = undefined;
		});
	});

	let WeatherEndtimeout = 5000;

	weatherBtns.forEach(btn => {
		btn.addEventListener("click", e => {
			const weatherName = btn.innerText.toLowerCase();
			weather = weatherName;
			weatherInfo.innerText = weatherName;

			socket.emit("weather change", {
				weather,
				WeatherEndtimeout
			});
			
			setTimeout(() => {
				weather = undefined;
				weatherInfo.innerText = "spring";
			}, WeatherEndtimeout);

			e.target.disabled = true;
		});
	});

	// Explosion
	window.addEventListener("keyup", e => {
		if (e.code === "Enter") {
			const audio1 = new Audio("components/audio/falling-bomb-41038.mp3");
			const audio2 = new Audio("components/audio/videoplayback.mp3");
			const dot = document.querySelector(".dot");

			audio1.play();
		
			audio1.addEventListener("ended", () => {
				audio2.play();
			});
			
			audio2.addEventListener("play", () => {
				setTimeout(() => {
					socket.emit("clear canvas");
					dot.classList.add("active");
				}, 1000);
			});

			audio2.addEventListener("ended", () => {
				dot.classList.remove("active");
			});
		}
	});
}
iteractions();