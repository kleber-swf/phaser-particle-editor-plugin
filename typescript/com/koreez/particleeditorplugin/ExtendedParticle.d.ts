export class ExtendedParticle extends Phaser.Particle {
    /**
     * @param {Phaser.Game} game
     * @param {number} x
     * @param {number} y
     * @param {string|Phaser.RenderTexture|Phaser.BitmapData|PIXI.Texture} key
     * @param {string|number} frame
     * @param {any} particleArguments
     */
    constructor(game: any, x: number, y: number, key: string | any | any | any, frame: string | number, particleArguments: any);
    particleArgumentsColor: any;
    onEmit(): void;
    /**
     * @param {Phaser.Tween} tween
     */
    updateColor(tween: any): void;
    tint: any;
    /**
     * @param {Phaser.Tween} tween
     */
    onTweenComplete(tween: any): void;
}
