//reflector is similiar to a rotor, but it does not turn/rotate

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// const reflectorAwiring = "EJMZALYXVBWFCRQUONTSPIKHGD";
// const reflectorBwiring = "YRUHQSLDPXNGOKMIEBFZCWVJAT";
// const reflectorCwiring = "FVPJIAOYEDRZXWGCTKUQSBNMHL";

export class Reflector {
  constructor() {
    this.reflectionPairs = {};
  }
}

Reflector.prototype.setReflectionPairs = function (wiringTable) {
  this.wiringTable = wiringTable;
  for (let i = 0; i < alphabet.length; i++) {
    // example :
    //         alphabet = "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
    // reflectorAwiring = "E J M Z A L Y X V B W F C R Q U O N T S P I K H G D"
    // A becomes E, E becomes A, L becomes F, etc...
    // made in pairs, like a plugboard
    this.reflectionPairs[alphabet[i]] = wiringTable[i];
  }
};

Reflector.prototype.encrypt = function (letter) {
  return this.reflectionPairs[letter];
};

