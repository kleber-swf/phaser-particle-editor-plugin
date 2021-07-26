declare namespace Phaser {
	interface GameObjectFactory {
		particleEffect(x: number, y: number, key: any, group?: Group): any;
	}

	interface GameObjectCreator {
		particleEffect(x: number, y: number, key: string): any;
	}
}
