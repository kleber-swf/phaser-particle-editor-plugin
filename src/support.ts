export interface ParticleRange { min: number, max: number }
export interface Point { x: number, y: number }

export interface ParticleColor {
	r: number;
	g: number;
	b: number;
	a: number;
	h: number;
	s: number;
	l: number;
	v: number;
	color: number;
	color32: number;
	rgba: string;
}

export interface ParticleColorRange {
	start: ParticleColor;
	end: ParticleColor;
	ease: string;
	easeMode: string;
	delay: number;
	rate: number;
}

export interface ParticleArguments {
	color: ParticleColorRange;
	lifespan: ParticleRange;
	startRotation: ParticleRange;
	anchor: Point;
}

export interface EmitterProperties {
	key?: string;
	width: number;
	height: number;
	gravityX: number;
	gravityY: number;
	emitX: number;
	emitY: number;
	maxParticles: number;
	frames: number;
	quantity: number;
	total: number;
	immediate: boolean;
	collide: boolean;
	collideWorldBounds: boolean;
	enableBody: boolean;
	randomScale: boolean;
	minScale: number;
	maxScale: number;
	scaleFromX: number;
	scaleFromY: number;
	scaleToX: number;
	scaleToY: number;
	scaleRate: number;
	scaleEase: string;
	scaleEaseMode: string;
	scaleYoyo: boolean;
	alphaMin: number;
	alphaMax: number;
	alphaRate: number;
	alphaEase: string;
	alphaEaseMode: string;
	alphaYoyo: boolean;
	particleArguments: ParticleArguments;
	rotationMin: number;
	rotationMax: number;
	bounceX: number;
	bounceY: number;
	angularDrag: number;
	minSpeedX: number;
	minSpeedY: number;
	maxSpeedX: number;
	maxSpeedY: number;
	frequency: number;
	enabled: boolean;
	explode: boolean;
	flow: boolean;
	blendMode: number;
	lifespan: number;
}

export interface ParticleData {
	emitters: { [id: string]: EmitterProperties };
}
