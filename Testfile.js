import { Rotor } from "./Rotor.js";
import { Plugboard } from "./Plugboard.js";
import { Reflector } from "./Reflector.js";
import { EnigmaMachine } from "./EnigmaMachine.js";

// Plugboard pairs of letters
const plugboard = new Plugboard(["AB", "CD", "EF", "ZO", "PL"]);

// Reflector Wirings: Input ABCDEFGHIJKLMNOPQRSTUVWXYZ
const reflectorAwiring = "EJMZALYXVBWFCRQUONTSPIKHGD";
const reflectorBwiring = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
const reflectorCwiring = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

const ReflectorA = new Reflector(reflectorAwiring);
const ReflectorB = new Reflector(reflectorBwiring);
const ReflectorC = new Reflector(reflectorCwiring);

//Rotor wirings: Input ABCDEFGHIJKLMNOPQRSTUVWXYZ -> output
const rotorIwiring = "EKMFLGDQVZNTOWYHXUSPAIBRCJ"; // startPos= A, turnover on A
const rotorIIwiring = "AJDKSIRUXBLHWTMCQGZNPYFVOE"; // startPos= A, turnover on A
const rotorIIIwiring = "BDFHJLCPRTXVZNYEIWGAKMUSQO"; // startPos= A, turnover on A
const rotorIVwiring = "ESOVPZJAYQUIRHXLNFTGKDCMWB"; // startPos= A, turnover on A
const rotorVwiring = "VZBRGITYUPSDNHLXAWMJQOFECK"; // startPos= A, turnover on A
const rotorVIwiring = "JPGVOUMFYQBENHZRDKASXLICTW"; // startPos= A, turnover on A
const rotorVIIwiring = "NZJHGRCXMYSWBOUFAIVLPEKQDT"; // startPos= A, turnover on A
const rotorVIIIwiring = "FKQHTLXOCBJSPDZRAMEWNIUYGV"; // startPos= A, turnover on A

// Rotor (wiring table, start position, turnover letter)
const RotorI = new Rotor(rotorIwiring, "A", "R");
const RotorII = new Rotor(rotorIIwiring, "A", "F");
const RotorIII = new Rotor(rotorIIIwiring, "A", "W");

const machine = new EnigmaMachine(
  plugboard,
  ReflectorA,
  RotorI,
  RotorII,
  RotorIII
);



// let plainText =
//   "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like";

let plainText =
"AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA AAA";

let cipher = machine.encryptPhrase(plainText);
console.log(cipher);
machine.reset();
console.log("\n", "reset machine for decryption", "\n");
let decipher = machine.encryptPhrase(cipher);
console.log(decipher);
