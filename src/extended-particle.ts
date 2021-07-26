import Phaser from 'phaser-ce';
import { ParticleArguments, ParticleColorRange } from './support';

export class ExtendedParticle extends Phaser.Particle {
	private readonly particleArgumentsColor?: ParticleColorRange;

	constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any, particleArguments?: ParticleArguments) {
		super(game, x, y, key, frame);
		this.particleArgumentsColor = particleArguments.color || null;
	}

	public onEmit() {
		if (this.particleArgumentsColor) {
			const startColor = Phaser.Color.createColor(
				this.particleArgumentsColor.start.r,
				this.particleArgumentsColor.start.g,
				this.particleArgumentsColor.start.b
			);

			const tween = this.game.add
				.tween(startColor)
				.to(
					this.particleArgumentsColor.end,
					this.particleArgumentsColor.rate,
					Phaser.Easing[this.particleArgumentsColor.ease][
						this.particleArgumentsColor.easeMode
					],
					true,
					this.particleArgumentsColor.delay
				);

			tween.onUpdateCallback(this.updateColor.bind(this));
			tween.onComplete.add(this.onTweenComplete, this);
		}
		super.onEmit();
	}

	private updateColor(tween: Phaser.Tween) {
		Phaser.Color.updateColor(tween.target);
		this.tint = Phaser.Color.getColor32(
			this.alpha,
			tween.target.r,
			tween.target.g,
			tween.target.b
		);
	}

	private onTweenComplete(tween: Phaser.Tween) {
		this.game.tweens.remove(tween);
	}
}
