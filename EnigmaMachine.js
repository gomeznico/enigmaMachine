import { Plugboard } from "./Plugboard.js";
import { Reflector } from "./Reflector.js";
import { Rotor } from "./Rotor.js";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const reflectorAwiring = "EJMZALYXVBWFCRQUONTSPIKHGD";
const reflectorBwiring = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const reflectorCwiring = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

const reflectorWirings = [reflectorAwiring, reflectorBwiring, reflectorCwiring];

const rotorIwiring = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"; // startPos= A, turnover on A
const rotorIIwiring = "AJDKSIRUXBLHWTMCQGZNPYFVOE"; // startPos= A, turnover on A
const rotorIIIwiring = "BDFHJLCPRTXVZNYEIWGAKMUSQO"; // startPos= A, turnover on A
const rotorIVwiring = "ESOVPZJAYQUIRHXLNFTGKDCMWB"; // startPos= A, turnover on A
const rotorVwiring = "VZBRGITYUPSDNHLXAWMJQOFECK"; // startPos= A, turnover on A
// const rotorVIwiring = "JPGVOUMFYQBENHZRDKASXLICTW"; // startPos= A, turnover on A
// const rotorVIIwiring = "NZJHGRCXMYSWBOUFAIVLPEKQDT"; // startPos= A, turnover on A
// const rotorVIIIwiring = "FKQHTLXOCBJSPDZRAMEWNIUYGV"; // startPos= A, turnover on A

const rotorWirings = [
  rotorIwiring,
  rotorIIwiring,
  rotorIIIwiring,
  rotorIVwiring,
  rotorVwiring,
  // rotorVIwiring,
  // rotorVIIwiring,
  // rotorVIIIwiring,
];

export class EnigmaMachine {
  constructor(plugboard, reflector, leftRotor, middleRotor, rightRotor) {
    this.plugboard = plugboard;
    this.leftRotor = null;
    this.middleRotor = null;
    this.rightRotor = null;
    this.reflector = reflector;
    this.initialRotorSettings = null;
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

  this.initialRotorSettings = {
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
    this.initialRotorSettings.leftRotor.wiringTable,
    this.initialRotorSettings.leftRotor.startLetter,
    this.initialRotorSettings.leftRotor.turnoverLetter
  );

  const resetMiddleRotor = new Rotor(
    this.initialRotorSettings.middleRotor.wiringTable,
    this.initialRotorSettings.middleRotor.startLetter,
    this.initialRotorSettings.middleRotor.turnoverLetter
  );

  const resetRightRotor = new Rotor(
    this.initialRotorSettings.rightRotor.wiringTable,
    this.initialRotorSettings.rightRotor.startLetter,
    this.initialRotorSettings.rightRotor.turnoverLetter
  );

  this.leftRotor = null;
  this.middleRotor = null;
  this.rightRotor = null;

  this.setRotors(resetLeftRotor, resetMiddleRotor, resetRightRotor);
};

EnigmaMachine.random = function () {
  // create random plugboard
  const plugboard = new Plugboard.random();

  // select random reflector
  let reflectorWiring = reflectorWirings[Math.floor(Math.random() * 3)];
  const reflector = new Reflector(reflectorWiring);

  // select random rotors, only
  let remainingRotors = [...rotorWirings];
  let rotors = [];
  for (let i = 0; i < 3; i++) {
    let randomStart = alphabet[Math.floor(Math.random() * 26)];
    let randomTurnLetter = alphabet[Math.floor(Math.random() * 26)];
    let idx = Math.floor(Math.random() * remainingRotors.length);
    let rotorWiring = remainingRotors[idx];
    remainingRotors = remainingRotors.filter(
      (wiring) => wiring !== rotorWiring
    );
    rotors.push(new Rotor(rotorWiring, randomStart, randomTurnLetter));
  }

  return new EnigmaMachine(
    plugboard,
    reflector,
    rotors[0],
    rotors[1],
    rotors[2]
  );
};
