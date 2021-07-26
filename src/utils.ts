const imageData: { isLoading: boolean, queue: any[] } = {
  isLoading: false,
  queue: [],
};

export function createImageFromBitmapData(game: Phaser.Game, bitmapData: string, key: string,
  oncreate?: () => void, onerror?: () => void, force = true) {
  if (!force && game.cache.checkImageKey(key)) {
    onImageLoad(oncreate);
    return;
  }

  const img = new Image();

  if (imageData.isLoading) {
    imageData.queue.push({ game, bitmapData, key, oncreate, onerror });
    return;
  }

  imageData.isLoading = true;

  img.onload = () => {
    game.cache.addImage(key, bitmapData, img);
    onImageLoad(oncreate);
  };

  img.onerror = () => onImageLoad(onerror);

  img.src = bitmapData;
}

function onImageLoad(hook: () => void) {
  if (hook) hook();
  imageData.isLoading = false;
  nextImageInQueue();
}

function nextImageInQueue() {
  if (imageData.queue.length <= 0) return;
  const queueData = imageData.queue.shift();
  createImageFromBitmapData(
    queueData.game,
    queueData.bitmapData,
    queueData.key,
    queueData.oncreate,
    queueData.onerror,
    false
  );
}
