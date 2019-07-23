let bootScene = new Phaser.Scene('Boot');

bootScene.preload = function(){
  this.load.json('data', 'assets/json/data.json');
}

bootScene.create = function(){
  this.data = gameScene.cache.json.get('data');

  this.scene.start('Game');

}
