let dataTime = document.querySelector('.time');
let actualizar = document.querySelector('.actualizar');

let seActualizo = false;

let hr = 0;
let mn = 0;
let sc = 0;
let hrMX = hr + 1;
let hrBC = hr + 5;

dataTime.addEventListener('change', () => {
	seActualizo = true;
});

actualizar.addEventListener('click', () => {
	if (seActualizo) {
		let time = dataTime.value;
		hr = parseInt(time.split(':')[0]);
		mn = parseInt(time.split(':')[1]);
		hrMX = hr + 1;
		hrBC = hr + 5;
		seActualizo = false;
	}
});

function setup() {
	createCanvas(900, 400);
}

function draw() {
	background(220);
	translate(150, 200);

	if (frameCount % 60 == 0) {
		sc += 1;

		if (sc % 60 == 0) {
			sc = 0;
			mn += 1;
			if (mn % 60 == 0) {
				mn = 0;
				hr += 1;
				hrMX = (hr + 1) % 12;
				hrBC = (hr + 5) % 12;
				if (hr % 12 == 0) {
					hr = 0;
				}
			}
		}
	}

	let secondAngle = map(sc, 0, 60, 0, 360) - 90;

	let minuteAngle = map(mn, 0, 60, 0, 360) - 90;
	let hourAngle = map(hr % 12, 0, 12, 0, 360) - 90;

	let hourAngleMX = map(hrMX % 12, 0, 12, 0, 360) - 90;
	let hourAngleBC = map(hrBC % 12, 0, 12, 0, 360) - 90;

	puntoPendiente(secondAngle, minuteAngle, hourAngle);
	DDA(secondAngle, minuteAngle, hourAngleMX);
	bresenham(secondAngle, minuteAngle, hourAngleBC);
}

function midPointCircleDraw(x_centre, y_centre, r) {
	let x = r,
		y = 0;
	let P = 1 - r;
	while (x > y) {
		y++;
		if (P <= 0) P = P + 2 * y + 1;
		else {
			x--;
			P = P + 2 * y - 2 * x + 1;
		}
		if (x < y) break;
		point(x + x_centre, -y + y_centre);
		point(-x + x_centre, y + y_centre);
		point(x + x_centre, y + y_centre);
		point(-x + x_centre, -y + y_centre);
		if (x != y) {
			point(y + x_centre, -x + y_centre);
			point(-y + x_centre, x + y_centre);
			point(y + x_centre, x + y_centre);
			point(-y + x_centre, -x + y_centre);
		}
	}
}

function puntoPendiente(secA, minA, hrA) {
	midPointCircleDraw(0, 0, 100);
	strokeWeight(3);
	stroke('red');
	line(0, 0, 90 * cos(radians(secA)), 90 * sin(radians(secA)));
	stroke('blue');
	line(0, 0, 75 * cos(radians(minA)), 75 * sin(radians(minA)));
	stroke('black');
	line(0, 0, 50 * cos(radians(hrA)), 50 * sin(radians(hrA)));
}

function DDA(secA, minA, hrA) {
	translate(300, 0);

	midPointCircleDraw(0, 0, 100);
	strokeWeight(3);
	stroke('red');
	DDALine(0, 0, 90 * cos(radians(secA)), 90 * sin(radians(secA)));
	stroke('blue');
	DDALine(0, 0, 75 * cos(radians(minA)), 75 * sin(radians(minA)));
	stroke('black');
	DDALine(0, 0, 50 * cos(radians(hrA)), 50 * sin(radians(hrA)));
}

function DDALine(x1, y1, x2, y2) {
	let dx = x2 - x1;
	let dy = y2 - y1;
	let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
	let Xinc = dx / steps;
	let Yinc = dy / steps;
	let X = x1;
	let Y = y1;
	for (let i = 0; i <= steps; i++) {
		point(round(X), round(Y));
		X += Xinc;
		Y += Yinc;
	}
}

function bresenham(secA, minA, hrA) {
	translate(300, 0);

	midPointCircleDraw(0, 0, 100);
	strokeWeight(3);
	stroke('red');
	bresenhamLine(0, 0, 90 * cos(radians(secA)), 90 * sin(radians(secA)));
	stroke('blue');
	bresenhamLine(0, 0, 75 * cos(radians(minA)), 75 * sin(radians(minA)));
	stroke('black');
	bresenhamLine(0, 0, 50 * cos(radians(hrA)), 50 * sin(radians(hrA)));
}

function bresenhamLine(X1, Y1, X2, Y2) {
	let dY = Y2 - Y1;
	let dX = X2 - X1;

	let IncYi, IncXi;
	if (dY >= 0) {
		IncYi = 1;
	} else {
		dY = -dY;
		IncYi = -1;
	}

	if (dX >= 0) {
		IncXi = 1;
	} else {
		dX = -dX;
		IncXi = -1;
	}

	let IncYr, IncXr;
	if (dX >= dY) {
		IncYr = 0;
		IncXr = IncXi;
	} else {
		IncXr = 0;
		IncYr = IncYi;

		let k = dX;
		dX = dY;
		dY = k;
	}

	let X = X1,
		Y = Y1;
	let avR = 2 * dY;
	let av = avR - dX;
	let avI = av - dX;

	do {
		point(X, Y);
		if (av >= 0) {
			X = X + IncXi;
			Y = Y + IncYi;
			av = av + avI;
		} else {
			X = X + IncXr;
			Y = Y + IncYr;
			av = av + avR;
		}
	} while (Math.round(X) != Math.round(X2) || Math.round(Y) != Math.round(Y2));
}
