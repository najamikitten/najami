const fps = 144;
const particles_per_second = 40;
const particle_lifetime = 1000;
const particle_speed = .1;
const particle_jitter = 0;
const particle_size = 2;

let canvas = document.getElementById("canvas-background");
let ctx = canvas.getContext("2d");
let particles = []

class particle {
	constructor(x, y) {
		this.i = 1;
		this.x = x;
		this.y = y;
		this.size = Math.random() * particle_size + 3;
		this.variation = Math.floor(Math.random() * 3);
		this.hue = Math.floor(Math.random() * 60 + 270);
	}

	animate() {
		this.i += Math.random() * 2;
		this.y += Math.random() * particle_speed;
		this.x += Math.random() * particle_jitter - (particle_jitter / 2);
	}

	draw(c) {
		// This is gross and there's probably a better way but i cba ;-)
		let transparency = p.i / (particle_lifetime / 2);
		if(p.i > particle_lifetime / 2) {
			transparency = (p.i - (particle_lifetime / 2)) / (particle_lifetime / 2);
			transparency = 1 - transparency;
		}
		let color = `hsla(${p.hue}, 100%, 50%, ${transparency})`;

		c.beginPath();

		switch(this.variation) {
			case 2: // Heart
				c.arc(this.x - this.size / 2, this.y, this.size / 2, 1 * Math.PI, 2 * Math.PI, false);
				c.arc(this.x + this.size / 2, this.y, this.size / 2, 1 * Math.PI, 2 * Math.PI, false);
				c.moveTo(this.x - this.size, this.y);
				c.lineTo(this.x, this.y + this.size);
				c.moveTo(this.x + this.size, this.y);
				c.lineTo(this.x, this.y + this.size);
				break;
		}
		ctx.lineWidth = 0;
		ctx.strokeStyle = color;
		ctx.stroke();
		c.closePath();
	}
}

function resize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

function main() {
	resize();
	setInterval(draw, 1000 / fps);
	setInterval(add_particle, 1000 / particles_per_second);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for(let i = 0; i < particles.length; i++) {
		p = particles[i];
		p.animate();

		if(p.i > particle_lifetime)
			particles.splice(i, 1);
 		
		p.draw(ctx);
	}
}

function add_particle() {
	particles.push(new particle(Math.random() * canvas.width, Math.random() * canvas.height));
}