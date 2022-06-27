// const Rotor = require("./Rotor.js");
// const Plugboard = require("./Plugboard");
// const Reflector = require("./Reflector");
// // const EnigmaMachine = require("./EnigmaMachine");

import { Rotor } from "./Rotor.js";
import { Plugboard } from "./Plugboard.js";
import { Reflector } from "./Reflector.js";
import { EnigmaMachine } from "./EnigmaMachine.js";

const plugBoard = new Plugboard();

//Rotor wirings: Input ABCDEFGHIJKLMNOPQRSTUVWXYZ -> output
const rotorIwiring = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"; // startPos= A, turnover on A
const rotorIIwiring = "AJDKSIRUXBLHWTMCQGZNPYFVOE"; // startPos= A, turnover on A
const rotorIIIwiring = "BDFHJLCPRTXVZNYEIWGAKMUSQO"; // startPos= A, turnover on A
const rotorIVwiring = "ESOVPZJAYQUIRHXLNFTGKDCMWB"; // startPos= A, turnover on A
const rotorVwiring = "VZBRGITYUPSDNHLXAWMJQOFECK"; // startPos= A, turnover on A
const rotorVIwiring = "JPGVOUMFYQBENHZRDKASXLICTW"; // startPos= A, turnover on A
const rotorVIIwiring = "NZJHGRCXMYSWBOUFAIVLPEKQDT"; // startPos= A, turnover on A
const rotorVIIIwiring = "FKQHTLXOCBJSPDZRAMEWNIUYGV"; // startPos= A, turnover on A

const RotorI = new Rotor();
RotorI.setWiringTable(rotorIwiring);
RotorI.setStartPosition("A");
RotorI.setTurnoverLetter("R");

const RotorII = new Rotor();
RotorII.setWiringTable(rotorIIwiring);
RotorI.setStartPosition("A");
RotorII.setTurnoverLetter("F");

const RotorIII = new Rotor();
RotorIII.setWiringTable(rotorIIIwiring);
RotorI.setStartPosition("A");
RotorIII.setTurnoverLetter("W");

const RotorIV = new Rotor();
RotorIV.setWiringTable(rotorIVwiring);
RotorI.setStartPosition("A");
RotorIV.setTurnoverLetter("K");

const RotorV = new Rotor();
RotorV.setWiringTable(rotorVwiring);
RotorI.setStartPosition("A");
RotorV.setTurnoverLetter("A");

// Reflector Wirings: Input ABCDEFGHIJKLMNOPQRSTUVWXYZ
const reflectorAwiring = "EJMZALYXVBWFCRQUONTSPIKHGD";
const reflectorBwiring = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const reflectorCwiring = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

const ReflectorA = new Reflector();
ReflectorA.setReflectionPairs(reflectorAwiring);

const ReflectorB = new Reflector();
ReflectorB.setReflectionPairs(reflectorBwiring);

const ReflectorC = new Reflector();
ReflectorC.setReflectionPairs(reflectorCwiring);

const machine = new EnigmaMachine();
machine.setPlugboard(plugBoard);
machine.setRotors(RotorI, RotorII, RotorIII);
machine.setReflector(ReflectorA);

let plainText =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like";

let cipher = machine.encryptPhrase(plainText);
console.log(cipher);
machine.reset();
let decipher = machine.encryptPhrase(cipher);
console.log(decipher);
