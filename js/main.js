let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: [bootScene, gameScene],
    title: 'Spanish Learning Game',
    pixelArt: false
}

let game = new Phaser.Game(config);
