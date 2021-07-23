interface ParticleRange { min: number, max: number }
interface Point { x: number, y: number }

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

export interface ParticleArguments {
	color: {
		start: ParticleColor,
		end: ParticleColor,
		ease: string;
		easeMode: string;
		delay: number;
		rate: number;
	};
	lifespan: ParticleRange,
	startRotation: ParticleRange,
	anchor: Point,
}

export interface EmitterProperties {
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

export class ExtendedParticle extends Phaser.Particle {
	tint: number;
	particleArgumentsColor: ParticleColor;
	constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame: string | number, particleArguments: ParticleArguments);
	onEmit(): void;
	updateColor(tween: Phaser.Tween): void;
	onTweenComplete(tween: Phaser.Tween): void;
}

export class ExtendedEmitter extends Phaser.Particles.Arcade.Emitter {
	properties: EmitterProperties;
	emitX: number;
	emitY: number;
	maxParticles: number;
	blendMode: number;
	minParticleScale: number;
	maxParticleScale: number;
	lifespan: number;
	angularDrag: number;
	width: number;
	height: number;
	on: any;
	particleArgumentsColor?: ParticleColor;
	particleArgumentsStartRotation?: ParticleRange;
	particleArgumentsAnchor?: Point;
	particleArgumentsLifespan?: ParticleRange;
	constructor(game: Phaser.Game, name: string, properties: EmitterProperties);
	particleClass: typeof ExtendedParticle;
	applyProperties(properties: EmitterProperties): void;
	resetParticle(particle: ExtendedParticle, x: number, y: number): void;
}

export class ParticleEffect extends Phaser.Group {
	x: number;
	y: number;
	_emitersMap: any;
	_collidebleEmitters: any;
	_emitX: number;
	_emitY: number;
	_arcade: any;
	set emitX(arg: number);
	get emitX(): number;
	set emitY(arg: number);
	get emitY(): number;

	constructor(game: Phaser.Game, particleData: ParticleArguments, x: number, y: number);
	_initEmitters(particleData: ParticleArguments): void;
	_createEmitter(name: string, properties: EmitterProperties): ExtendedEmitter;
	add(child: ExtendedEmitter, silent: boolean, index: number): void;
	remove(child: ExtendedEmitter, destroy: boolean, silent: boolean): boolean;
	_emit(emitter: ExtendedEmitter, properties: EmitterProperties): void;
	update(): void;
	emit(): void;
	_onEmitterImageUpdate(name: string, properties: EmitterProperties): void;
	_recreateEmitter(name: string, properties: EmitterProperties): void;
	addEmitter(name: string, properties: EmitterProperties, autoEmit?: boolean): void;
	removeEmitter(name: string): void;
	updateEmitterImage(name: string, properties: EmitterProperties): void;
	updateEmitterProperties(name: string, properties: EmitterProperties): void;
	updateEmitterOption(name: string, properties: EmitterProperties): void;
}

export class ParticleEditorPlugin extends Phaser.Plugin {
	constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer);
	addParticleFactory(): void;
	getData(key: string | object): any;
}

export function createImageFromBitmapData(game: Phaser.Game, bitmapData: string, key: string, oncreate?: () => void, onerror?: () => void, force?: boolean): void;
