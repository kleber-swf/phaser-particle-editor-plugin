import Phaser from 'phaser-ce';
import { ParticleEffect } from './particle-effect';

export class ParticleEditorPlugin extends Phaser.Plugin {
	constructor(game: Phaser.Game, parent: Phaser.PluginManager) {
		super(game, parent);
		this.addParticleFactory();
	}

	private addParticleFactory() {
		Phaser.GameObjectFactory.prototype.particleEffect = (x: number, y: number, key: any, group?: Phaser.Group) => {
			const particle = new ParticleEffect(this.game, this.getData(key), x, y);
			return (group || this.game.world).add(particle);
		};
		Phaser.GameObjectCreator.prototype.particleEffect = (x: number, y: number, key: any) => {
			return new ParticleEffect(this.game, this.getData(key), x, y);
		};
	}

	private getData(key: any) {
		if (typeof key === 'string') {
			return this.game.cache.getJSON(key);
		}
		return key;
	}
}
