let gameScene = new Phaser.Scene('Game');

var correctSound;
var bbgg;
var sound;
var currentWords = [];
var nextWord;
var points = 0;
var attempts = 0;
var things;

gameScene.init = function(){
  things = bootScene.data.data;

  this.words = getWords();

  this.wordText = this.add.text(45, 30, ' ', {
    font: '24px Open Sans',
    fill: '#ffffff'
  });
  this.wordText.depth = 1;
  this.pointsText = this.add.text(460, 30, 'Points: 0 of 0', {
    font: '24px Open Sans',
    fill: '#ffffff'
  });
  this.pointsText.depth = 1;

}

gameScene.preload = function(){
  bbgg = this.background = this.load.image('background', 'assets/images/background-city.png');

  this.load.image('flag', 'assets/images/flag.png');
  this.load.image('playaudio', 'assets/images/playaudio.png');

  //console.log(things);
  things.forEach(function(thing){
    let imageKey = thing.image.key;
    let imageFile = 'assets/images/' + thing.image.filename;
    this.load.image(imageKey, imageFile);

    let audioKey = thing.audio.key;
    let audioFile = 'assets/audio/' + thing.audio.filename;
    this.load.audio(audioKey, audioFile);

  }, this);

  this.load.audio('correct', 'assets/audio/correct.mp3');
  this.load.audio('wrong', 'assets/audio/wrong.mp3');

}

gameScene.create = function(){
  //this.data = this.cache.json.get('data');



  let bg = this.add.sprite(0, 0, 'background').setOrigin(0).setInteractive();
  let flag = this.add.sprite(0, 0, 'flag').setOrigin(0).setInteractive();
  let play = this.add.sprite(20, 34, 'playaudio').setOrigin(0).setInteractive();

  flag.depth = 2;

  flag.on('pointerdown', function(){
    flag.destroy();
  });

  play.on('pointerdown', function(){
    nextWord.audio.play();
  })

  sound = [];
  sound['correct'] = this.sound.add('correct');
  sound['wrong'] = this.sound.add('wrong');

  this.items = this.add.group(this.words);

  let items = this.items.getChildren();
  //console.log(items);
  for(let i=0; i<items.length; i++){

      items[i].setInteractive();

      items[i].key = this.words[i].key;
      items[i].spanish = this.words[i].spanish;
      items[i].sound = this.words[i].sound;
      items[i].audio = this.sound.add(items[i].sound);
      items[i].setOrigin(0.5);

      items[i].resizeTween = this.tweens.add({
        targets: items[i],
        scaleX: 1.5,
        scaleY: 1.5,
        alpha: 1,
        duration: 300,
        paused: true,
        yoyo: true,
        ease: 'Quad.easeInOut',
        onComplete: function(){
          gameScene.showNextQuestion();
        }
      });

      items[i].alphaTween = this.tweens.add({
        targets: items[i],
        alpha: 0.7,
        duration: 200,
        paused: true
      });

      items[i].on('pointerdown', function(pointer){
        items[i].alphaTween.stop();
        items[i].alpha=1;
        attempts++;
        if(items[i].key == nextWord.key){
          sound['correct'].play();
          points++;
        } else {
          sound['wrong'].play();
        }

        this.pointsText.setText('Points: ' + points + ' of ' + attempts);

        items[i].resizeTween.restart();
        //items[i].audio.play();
      }, this);

      items[i].on('pointerover', function(pointer){
        items[i].alphaTween.restart();
      }, this);

      items[i].on('pointerout', function(pointer){
        items[i].alphaTween.stop();
        items[i].alpha = 1;
      }, this);
  }



  this.showNextQuestion();

}

gameScene.showNextQuestion = function(){

  this.pickFourWords();
  nextWord = Phaser.Math.RND.pick(currentWords);
  this.wordText.setText(nextWord.spanish);

  nextWord.audio.play();

}

gameScene.pickFourWords = function(){
  let numWords = this.words.length;

  let arr = [];
  for(let i=0; i<numWords; i++){
    arr[i] = i;
  }
  Phaser.Math.RND.shuffle(arr);

  currentWords = [];
  let items = this.items.getChildren();
  items.forEach(function(item){
    item.setVisible(false);
  });
  for(let i=0; i<4; i++){
    currentWords[i] = items[arr[i]];
    items.forEach(function(item){
      if(item.key == currentWords[i].key){
        item.setVisible(true);
        item.x = i*140+100;
      }
    });
  }
}
