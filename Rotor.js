const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// // Input ABCDEFGHIJKLMNOPQRSTUVWXYZ -> output
// const rotorIwiring = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"; // startPos= A, turnover on A
// const rotorIIwiring = "AJDKSIRUXBLHWTMCQGZNPYFVOE"; // startPos= A, turnover on A
// const rotorIIIwiring = "BDFHJLCPRTXVZNYEIWGAKMUSQO"; // startPos= A, turnover on A
// const rotorIVwiring = "ESOVPZJAYQUIRHXLNFTGKDCMWB"; // startPos= A, turnover on A
// const rotorVwiring = "VZBRGITYUPSDNHLXAWMJQOFECK"; // startPos= A, turnover on A

export class Rotor {
  constructor() {
    this.currentLetter = "A";
    this.turnoverLetter = "A";
    this.wiringTable = "";
    this.wires = {};
    this.inverseWires = {};
    this.nextRotor = null;
  }

  // needed functions
  // initialize rotor settings:
  // - set initial wiring of rotor type
  // - set start position
  // - set letter at which next rotor turns

  // Rotor actions:
  // - step Rotor after each use
  // - encrypt letter
}

Rotor.prototype.setWiringTable = function (wiringTable) {
  this.wiringTable = wiringTable;
  for (let i = 0; i < alphabet.length; i++) {
    // example :
    //     alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
    // rotorIwiring = "E K M F L G D Q V Z N T O W Y H X U S P A I B R C J"
    // A becomes E, E becomes L, L becomes T, etc...

    this.wires[alphabet[i]] = wiringTable[i];
    this.inverseWires[wiringTable[i]] = alphabet[i];
  }
};

Rotor.prototype.setStartPosition = function (letter) {
  // -ABCDEFGHIJKLMNOPQRSTUVWXYZ- -> startPos = A, idxA = 0, turnover A (ctDwn = 26)
  // -EKMFLGDQVZNTOWYHXUSPAIBRCJ-

  // -FGHIJKLMNOPQRSTUVWXYZ-ABCDE -> startPos = F, idxF = 5, turnover still A (ctDwn = 21)
  // -GDQVZNTOWYHXUSPAIBRCJ-EKMFL
  let idx = alphabet.indexOf(letter);
  let newWireTable =
    this.wiringTable.slice(idx) + this.wiringTable.slice(0, idx);
  this.setWiringTable(newWireTable);

  // set display letter
  this.currentLetter = letter;
};

Rotor.prototype.setTurnoverLetter = function (letter) {
  this.turnoverLetter = letter;
};

Rotor.prototype.setNextRotor = function (rotor) {
  this.nextRotor = rotor;
};

// Rotor actions/movements below

Rotor.prototype.step = function () {
  //set new current letter
  let newIdx = (alphabet.indexOf(this.currentLetter) + 1) % 26;
  this.currentLetter = alphabet[newIdx];

  // on step, we want to shift the wiring table forward
  // ex: from rotorIwiring = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"
  // --> move E to end =      "KMFLGDQVZNTOWYHXUSPAIBRCJE"
  let newWireTable = this.wiringTable.slice(1) + this.wiringTable[0];
  this.setWiringTable(newWireTable);

  if (this.currentLetter === this.turnoverLetter) {
    if (!!this.nextRotor) {
      this.nextRotor.step();
    }
  }
};

Rotor.prototype.encrypt = function (letter, direction = "forward") {
  let cipherLetter = "";
  if (direction === "reverse") {
    cipherLetter = this.inverseWires[letter];
  } else {
    cipherLetter = this.wires[letter];
  }
  return cipherLetter;
};

// const RotorI = new Rotor();
// RotorI.setWiringTable(rotorIwiring);
// RotorI.setStartPosition("E");
// RotorI.setTurnoverLetter("C");
// console.log("start", RotorI.currentLetter);

// for (let i = 1; i < 30; i++) {
//   RotorI.step();
//   console.log(RotorI.currentLetter);
// }
