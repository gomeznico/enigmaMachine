export class Plugboard {
  constructor() {
    this.plugs = {};
  }
}

Plugboard.prototype.addPlug = function (letter1, letter2) {
  //max plugs is 10
  let keys = Object.getOwnPropertyNames(this.plugs);

  //make sure plug does not already exist
  if (keys.length <= 20) {
    this.plugs[letter1] = letter2;
    this.plugs[letter2] = letter1;
  } else {
    console.log("max number of plugs reached");
  }
};

Plugboard.prototype.addPlugs = function (arrOfLetterPairs) {
  // arrOfLetterPairs = ['AB', 'CD', 'EF'...]
  for (let i = 0; i < arrOfLetterPairs.length; i++) {
    let letters = arrOfLetterPairs[i];
    this.addPlug(letters[0], letters[1]);
  }
};

Plugboard.prototype.encrypt = function (letter) {
  if (!!this.plugs[letter]) {
    return this.plugs[letter];
  }
  return letter;
};
