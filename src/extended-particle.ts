import Phaser from 'phaser-ce';
import { ParticleArguments, ParticleColorRange } from './support';

export class ExtendedParticle extends Phaser.Particle {
	private readonly colorRange?: ParticleColorRange;

	constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any, particleArguments?: ParticleArguments) {
		super(game, x, y, key, frame);
		this.colorRange = particleArguments.color || null;
		this._frames = particleArguments.frames || null;

		if (!this._frames) return;
		this._frameRate = particleArguments.frameRate;
		this._frameIndex = particleArguments.initialFrameIndex === undefined
			? Phaser.Math.between(0, this._frames.length)
			: particleArguments.initialFrameIndex;
		this._elapsed = 0;
	}

	public onEmit() {
		if (this.colorRange) {
			const colorRange = this.colorRange;
			const startColor = Phaser.Color.createColor(
				colorRange.start.r,
				colorRange.start.g,
				colorRange.start.b
			);

			const tween = this.game.add
				.tween(startColor)
				.to(
					colorRange.end,
					colorRange.rate,
					Phaser.Easing[colorRange.ease][colorRange.easeMode],
					true,
					colorRange.delay
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


	private readonly _frameRate: number = 24;
	private readonly _frames: (string | number)[];
	private _frameIndex: number;
	private _elapsed: number;

	private setFrameIndex(index: number) {
		this._frameIndex = index;
		this.frame = this._frames[index];
	}

	update() {
		super.update();
		if (!this._frames) return;
		this._elapsed += this._frameRate * (this.game.time.elapsed * 0.001);
		if (this._elapsed < 1) return;
		this._elapsed = 0;
		this.setFrameIndex((this._frameIndex + 1) % this._frames.length);
	}
}
