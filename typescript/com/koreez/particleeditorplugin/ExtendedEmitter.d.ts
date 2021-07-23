export class ExtendedEmitter extends Phaser.Particles.Arcade.Emitter {
    /**
     * @param {Phaser.Game} game
     * @param {string} name
     * @param {any} properties
     */
    constructor(game: any, name: string, properties: any);
    name: string;
    particleClass: typeof ExtendedParticle;
    /**
     * @param {any} properties
     */
    applyProperties(properties: any): void;
    properties: any;
    emitX: any;
    emitY: any;
    maxParticles: any;
    blendMode: any;
    minParticleScale: any;
    maxParticleScale: any;
    lifespan: any;
    angularDrag: any;
    width: any;
    height: any;
    on: any;
    particleArgumentsColor: any;
    particleArgumentsStartRotation: any;
    particleArgumentsAnchor: any;
    particleArgumentsLifespan: any;
    /**
     * @param {ExtendedParticle} particle
     * @param {number} x
     * @param {number} y
     */
    resetParticle(particle: ExtendedParticle, x: number, y: number): void;
}
import ExtendedParticle from "./ExtendedParticle";
