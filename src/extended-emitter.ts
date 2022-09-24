import Phaser from 'phaser-ce';
import { ExtendedParticle } from './extended-particle';
import { EmitterProperties, ParticleColorRange, ParticleRange, Point } from './support';

export class ExtendedEmitter extends Phaser.Particles.Arcade.Emitter {
	public properties: EmitterProperties;
	private particleArgumentsColor: ParticleColorRange;
	private particleArgumentsStartRotation: ParticleRange;
	private particleArgumentsAnchor: Point;
	private particleArgumentsLifespan: ParticleRange;

	constructor(game: Phaser.Game, name: string, properties: EmitterProperties) {
		super(game, properties.emitX, properties.emitY, properties.maxParticles);
		this.name = name;
		this.particleClass = ExtendedParticle;
		this.applyProperties(properties);
	}

	public applyProperties(properties: EmitterProperties) {
		this.properties = properties;
		this.gravity.x = properties.gravityX;
		this.gravity.y = properties.gravityY;
		this.setRotation(properties.rotationMin, properties.rotationMax);
		this.emitX = properties.emitX;
		this.emitY = properties.emitY;
		this.maxParticles = properties.maxParticles;
		this.blendMode = properties.blendMode;
		this.setAlpha(
			properties.alphaMin,
			properties.alphaMax,
			properties.alphaRate,
			Phaser.Easing[properties.alphaEase][properties.alphaEaseMode],
			properties.alphaYoyo
		);
		if (properties.randomScale) {
			this.minParticleScale = properties.minScale;
			this.maxParticleScale = properties.maxScale;
		} else {
			this.setScale(
				properties.scaleFromX,
				properties.scaleToX,
				properties.scaleFromY,
				properties.scaleToY,
				properties.scaleRate,
				Phaser.Easing[properties.scaleEase][properties.scaleEaseMode],
				properties.scaleYoyo
			);
		}
		this.minParticleSpeed.setTo(properties.minSpeedX, properties.minSpeedY);
		this.maxParticleSpeed.setTo(properties.maxSpeedX, properties.maxSpeedY);
		this.lifespan = properties.lifespan;
		this.angularDrag = properties.angularDrag;
		this.bounce.setTo(properties.bounceX, properties.bounceY);
		this.width = properties.width;
		this.height = properties.height;
		if (!properties.explode) {
			this.on = properties.enabled;
		}
		this.particleArgumentsColor = this.properties.particleArguments.color || null;
		this.particleArgumentsStartRotation = this.properties.particleArguments.startRotation || null;
		this.particleArgumentsAnchor = this.properties.particleArguments.anchor || null;
		this.particleArgumentsLifespan = this.properties.particleArguments.lifespan;
	}

	public resetParticle(particle: ExtendedParticle, x: number, y: number) {
		super.resetParticle(particle, x, y);
		if (this.particleArgumentsColor) {
			particle.tint = Phaser.Color.getColor32(
				particle.alpha,
				this.particleArgumentsColor.start.r,
				this.particleArgumentsColor.start.g,
				this.particleArgumentsColor.start.b
			);
		}
		if (this.particleArgumentsStartRotation) {
			particle.angle = this.game.rnd.integerInRange(
				this.particleArgumentsStartRotation.min,
				this.particleArgumentsStartRotation.max
			);
		}
		if (this.particleArgumentsAnchor) {
			particle.anchor.setTo(
				this.particleArgumentsAnchor.x,
				this.particleArgumentsAnchor.y
			);
		}
		particle.lifespan = this.game.rnd.integerInRange(
			this.particleArgumentsLifespan.min,
			this.particleArgumentsLifespan.max
		);
	}
}
