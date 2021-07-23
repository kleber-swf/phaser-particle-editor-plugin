export class ParticleEffect extends Phaser.Group {
    /**
     * @param {Phaser.Game} game
     * @param {any} particleData
     * @param {number} x
     * @param {number} y
     */
    constructor(game: any, particleData: any, x: number, y: number);
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
    /**
     * @param {any} particleData
     */
    _initEmitters(particleData: any): void;
    /**
     * @param {string} name
     * @param {any} properties
     * @returns {ExtendedEmitter}
     */
    _createEmitter(name: string, properties: any): ExtendedEmitter;
    /**
     * @param {ExtendedEmitter} child
     * @param {boolean} silent
     * @param {number} index
     */
    add(child: ExtendedEmitter, silent: boolean, index: number): void;
    /**
     * @param {ExtendedEmitter} child
     * @param {boolean} destroy
     * @param {boolean} silent
     */
    remove(child: ExtendedEmitter, destroy: boolean, silent: boolean): void;
    /**
     * @param {ExtendedEmitter} emitter
     * @param {any} properties
     */
    _emit(emitter: ExtendedEmitter, properties: any): void;
    update(): void;
    emit(): void;
    /**
     * @param {string} name
     * @param {any} properties
     */
    _onEmitterImageUpdate(name: string, properties: any): void;
    /**
     * @param {string} name
     * @param {any} properties
     */
    _recreateEmitter(name: string, properties: any): void;
    /**
     * @param {string} name
     * @param {any} properties
     * @param {boolean} autoEmit
     */
    addEmitter(name: string, properties: any, autoEmit?: boolean): void;
    /**
     * @param {string} name
     */
    removeEmitter(name: string): void;
    /**
     * @param {string} name
     * @param {any} properties
     */
    updateEmitterImage(name: string, properties: any): void;
    /**
     * @param {string} name
     * @param {any} properties
     */
    updateEmitterProperties(name: string, properties: any): void;
    /**
     * @param {string} name
     * @param {any} properties
     */
    updateEmitterOption(name: string, properties: any): void;
}
import ExtendedEmitter from "./ExtendedEmitter";
