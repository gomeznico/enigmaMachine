export class Plugboard {
  constructor(arr) {
    this.plugs = {};
    this.addPlugs(arr);
  }
}

Plugboard.prototype.addPlug = function (letter1, letter2) {
  //max plugs is 10, so 20 letters max
  //need to add feature to not allow plug pairs that already exist
  // i.e. FS and SE are not valid, S can only belong to 1 letter
  let keys = Object.getOwnPropertyNames(this.plugs);
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
  //returns encrypted letter pair, or the regular letter if no plug exists
  if (!!this.plugs[letter]) {
    return this.plugs[letter];
  }
  return letter;
};

Plugboard.random = function () {
  let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numPairs = Math.round(Math.random() * 10);
  let arrPairs = [];
  for (let i = 0; i < numPairs; i++) {
    let idxA = Math.floor(Math.random() * alphabet.length);
    let letterOne = alphabet[idxA];
    alphabet = alphabet.slice(0, idxA) + alphabet.slice(idxA + 1);
    let idxB = Math.floor(Math.random() * alphabet.length);
    let letterTwo = alphabet[idxB];
    alphabet = alphabet.slice(0, idxB) + alphabet.slice(idxB + 1);
    let pair = letterOne + letterTwo;
    arrPairs.push(pair);
  }
  return new Plugboard(arrPairs);
};
