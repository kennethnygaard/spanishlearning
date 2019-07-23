function getWords(){
  let words = [];

  things.forEach(function(thing){
    let newThing = {
      key: thing.image.key,
      setXY: {
        x: 0,
        y: 280
      },
      visible: false,
      spanish: thing.spanish,
      sound: thing.audio.key
    }
    words.push(newThing);
  });

  return words;
}
