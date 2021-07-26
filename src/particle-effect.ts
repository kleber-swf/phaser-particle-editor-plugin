import { ExtendedEmitter } from './extended-emitter';
import { EmitterProperties, ParticleData } from './support';
import { createImageFromBitmapData } from './utils';

export class ParticleEffect extends Phaser.Group {
	private readonly _emitersMap: Map<string, ExtendedEmitter>;
	private readonly _collidebleEmitters: Set<ExtendedEmitter>;
	private readonly _arcade: Phaser.Physics.Arcade;
	private _emitX: number;
	private _emitY: number;

	constructor(game: Phaser.Game, particleData: ParticleData, x: number, y: number) {
		super(game);
		this.x = x;
		this.y = y;
		this._emitersMap = new Map();
		this._collidebleEmitters = new Set();
		this._emitX = 0;
		this._emitY = 0;
		this._arcade = this.game.physics.arcade;
		this._initEmitters(particleData);
	}

	get emitX() { return this._emitX; }

	set emitX(x) {
		this._emitX = x;
		Object.values(this._emitersMap).forEach((emitter: ExtendedEmitter) =>
			emitter.emitX = emitter.properties.emitX + this.emitX);
		// eslint-disable-next-line no-unused-vars
		// for (const [key, emitter] of this._emitersMap) {
		// 	emitter.emitX = emitter.properties.emitX + this.emitX;
		// }
	}

	get emitY() { return this._emitY; }

	set emitY(y) {
		this._emitY = y;
		Object.values(this._emitersMap).forEach((emitter: ExtendedEmitter) =>
			emitter.emitY = emitter.properties.emitY + this.emitY);
		// eslint-disable-next-line no-unused-vars
		// for (const [key, emitter] of this._emitersMap) {
		// 	emitter.emitY = emitter.properties.emitY + this.emitY;
		// }
	}

	private _initEmitters(particleData: ParticleData) {
		const emitters = particleData.emitters;
		for (const emitterName in emitters) {
			if (!emitters.hasOwnProperty(emitterName)) {
				continue;
			}
			const emitterProperties = emitters[emitterName];
			this.addEmitter(emitterName, emitterProperties);
		}
	}

	private _createEmitter(name: string, properties: EmitterProperties) {
		return new ExtendedEmitter(this.game, name, properties);
	}

	public add(child: ExtendedEmitter, silent?: boolean, index?: number) {
		super.add(child, silent, index);
		this._emitersMap.set(child.name, child);
	}

	public remove(child: ExtendedEmitter, destroy?: boolean, silent?: boolean) {
		const result = super.remove(child, destroy, silent);
		this._emitersMap.delete(child.name);
		return result;
	}

	private _emit(emitter: ExtendedEmitter, properties: EmitterProperties) {
		if (!properties.enabled) {
			return;
		}
		if (properties.flow) {
			emitter.flow(
				0,
				properties.frequency,
				properties.quantity,
				properties.total,
				properties.immediate
			);
		} else {
			emitter.start(
				properties.explode,
				0,
				properties.frequency,
				properties.total
			);
		}
	}

	public update() {
		super.update();
		for (const emitter of this._collidebleEmitters) {
			this._arcade.collide(emitter);
		}
	}

	public emit() {
		Object.values(this._emitersMap).forEach((emitter: ExtendedEmitter) =>
			this._emit(emitter, emitter.properties));
		// eslint-disable-next-line no-unused-vars
		// for (const [key, emitter] of this._emitersMap) {
		// 	this._emit(emitter, emitter.properties);
		// }
	}

	private _onEmitterImageUpdate(name: string, properties: EmitterProperties) {
		this._recreateEmitter(name, properties);
	}

	private _recreateEmitter(name: string, properties: EmitterProperties) {
		name = properties.key || name;
		this.removeEmitter(name);
		this.addEmitter(name, properties);
	}

	public addEmitter(name: string, properties: EmitterProperties, autoEmit = true) {
		const key = properties.key || name;
		createImageFromBitmapData(
			this.game,
			properties[name],
			key,
			() => {
				const emitter = this._createEmitter(key, properties);
				this.add(emitter);
				emitter.makeParticles(
					emitter.name,
					properties.frames,
					properties.maxParticles,
					properties.collide,
					properties.collideWorldBounds,
					properties.particleArguments
				);
				this.updateEmitterProperties(key, properties);
				if (autoEmit) {
					this._emit(emitter, properties);
				}
				if (properties.collide || properties.collideWorldBounds) {
					this._collidebleEmitters.add(emitter);
				} else {
					this._collidebleEmitters.delete(emitter);
				}
			},
			null,
			false
		);
	}

	public removeEmitter(name: string) {
		this.remove(this._emitersMap.get(name));
	}

	public updateEmitterImage(name: string, properties: EmitterProperties) {
		createImageFromBitmapData(
			this.game,
			properties[name],
			name,
			this._onEmitterImageUpdate.bind(this, name, properties)
		);
	}

	public updateEmitterProperties(name: string, properties: EmitterProperties) {
		const emitter = this._emitersMap.get(name);
		emitter.applyProperties(properties);
		this._emit(emitter, properties);
	}

	public updateEmitterOption(name: string, properties: EmitterProperties) {
		this._recreateEmitter(name, properties);
	}
}
