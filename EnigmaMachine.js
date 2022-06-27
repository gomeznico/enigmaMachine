// letters go into
// plugboard -> rightRotor -> middleRotor -> leftRotor ->
//    mirror -> leftRotor -> middleRotor -> rightRotor -> plugboard -> output

import { Rotor } from "./Rotor.js";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export class EnigmaMachine {
  constructor(plugboard, reflector, leftRotor, middleRotor, rightRotor) {
    this.plugboard = plugboard;
    this.leftRotor = null;
    this.middleRotor = null;
    this.rightRotor = null;
    this.reflector = reflector;
    this.initial = null;
    // call functions to set rotors,
    this.setRotors(leftRotor, middleRotor, rightRotor);
  }
}

EnigmaMachine.prototype.setPlugboard = function (plugboard) {
  this.plugboard = plugboard;
};

EnigmaMachine.prototype.setReflector = function (reflector) {
  this.reflector = reflector;
};

EnigmaMachine.prototype.setRotors = function (
  leftRotor,
  middleRotor,
  rightRotor
) {
  this.leftRotor = leftRotor;
  this.middleRotor = middleRotor;
  this.rightRotor = rightRotor;

  this.rightRotor.setNextRotor(middleRotor);
  this.middleRotor.setNextRotor(leftRotor);

  this.initial = {
    leftRotor: {
      wiringTable: `${leftRotor.wiringTable}`,
      turnoverLetter: `${leftRotor.turnoverLetter}`,
      startLetter: `${leftRotor.currentLetter}`,
    },
    middleRotor: {
      wiringTable: `${middleRotor.wiringTable}`,
      turnoverLetter: `${middleRotor.turnoverLetter}`,
      startLetter: `${middleRotor.currentLetter}`,
    },
    rightRotor: {
      wiringTable: `${rightRotor.wiringTable}`,
      turnoverLetter: `${rightRotor.turnoverLetter}`,
      startLetter: `${rightRotor.currentLetter}`,
    },
  };
};

EnigmaMachine.prototype.encrypt = function (letter) {
  // letters go into
  // plugboard -> then rotor 1 -> 2 -> 3 -> mirror -> 3 -> 2 -> 1 -> plugboard
  this.rightRotor.step();
  let plugOut = this.plugboard.encrypt(letter);
  // console.log("plugboard encyrption: ", plugOut);

  //Rotors forward
  let rotorOneOut = this.rightRotor.encrypt(plugOut);
  let rotorTwoOut = this.middleRotor.encrypt(rotorOneOut);
  let rotorThreeOut = this.leftRotor.encrypt(rotorTwoOut);
  // console.log("Rotors forward encyrption: ", rotorThreeOut);
  let reflected = this.reflector.encrypt(rotorThreeOut);
  // console.log("Reflected Encryption: ", reflected);

  // Rotors reversed
  let rotorThreeReverse = this.leftRotor.encrypt(reflected, "reverse");
  let rotorTwoReverse = this.middleRotor.encrypt(rotorThreeReverse, "reverse");
  let rotorOneReverse = this.rightRotor.encrypt(rotorTwoReverse, "reverse");
  // console.log("Rotors reverse encryption: ", rotorOneReverse);
  let plugOutReverse = this.plugboard.encrypt(rotorOneReverse);
  // console.log("plugboard encyrption: ", plugOutReverse);

  return plugOutReverse;
};

EnigmaMachine.prototype.encryptPhrase = function (phrase) {
  // only accepts letters for now, punctuations and spaces
  // are unaltered for sake of readability on decryption
  let output = "";
  for (let i = 0; i < phrase.length; i++) {
    const letter = phrase[i].toUpperCase();
    if (alphabet.includes(letter)) {
      output = output + this.encrypt(letter);
    } else {
      output = output + letter;
    }
  }
  return output;
};

EnigmaMachine.prototype.reset = function () {
  const resetLeftRotor = new Rotor(
    this.initial.leftRotor.wiringTable,
    this.initial.leftRotor.startLetter,
    this.initial.leftRotor.turnoverLetter
  );

  const resetMiddleRotor = new Rotor(
    this.initial.middleRotor.wiringTable,
    this.initial.middleRotor.startLetter,
    this.initial.middleRotor.turnoverLetter
  );

  const resetRightRotor = new Rotor(
    this.initial.rightRotor.wiringTable,
    this.initial.rightRotor.startLetter,
    this.initial.rightRotor.turnoverLetter
  );

  this.leftRotor = null;
  this.middleRotor = null;
  this.rightRotor = null;

  this.setRotors(resetLeftRotor, resetMiddleRotor, resetRightRotor);
};
