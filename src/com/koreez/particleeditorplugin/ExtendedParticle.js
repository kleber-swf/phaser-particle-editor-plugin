import Phaser from 'phaser'

export default class ExtendedParticle extends Phaser.Particle {
  /**
   * @param {Phaser.Game} game
   * @param {number} x
   * @param {number} y
   * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key
   * @param {string|number} frame
   * @param {any} particleArguments
   */
  constructor (game, x, y, key, frame, particleArguments) {
    super(game, x, y, key, frame)
    this.particleArgumentsColor = particleArguments['color'] || null
  }

  onEmit () {
    if (this.particleArgumentsColor) {
      const startColor = Phaser.Color.createColor(
        this.particleArgumentsColor.start.r,
        this.particleArgumentsColor.start.g,
        this.particleArgumentsColor.start.b,
      )

      const tween = this.game.add
        .tween(startColor)
        .to(
          this.particleArgumentsColor.end,
          this.particleArgumentsColor.rate,
          Phaser.Easing[this.particleArgumentsColor.ease][
          this.particleArgumentsColor.easeMode
          ],
          true,
          this.particleArgumentsColor.delay,
        )

      tween.onUpdateCallback(this.updateColor.bind(this))
      tween.onComplete.add(this.onTweenComplete, this)
    }
    super.onEmit()
  }

  /**
   * @param {Phaser.Tween} tween
   */
  updateColor (tween) {
    Phaser.Color.updateColor(tween.target)
    this.tint = Phaser.Color.getColor32(
      this.alpha,
      tween.target.r,
      tween.target.g,
      tween.target.b,
    )
  }

  /**
   * @param {Phaser.Tween} tween
   */
  onTweenComplete (tween) {
    this.game.tweens.remove(tween)
  }
}
