export default class ParticleEditorPlugin {
    /**
     *
     * @param {Phaser.Game} game
     * @param {Phaser.Group} parent
     */
    constructor(game: any, parent: any);
    addParticleFactory(): void;
    /**
     * @param {string|object} key
     * @returns {object}
     */
    getData(key: string | object): object;
}
