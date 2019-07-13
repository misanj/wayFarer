/**
 * @class NumberPlate
 * @description a class with a method to generate a number plate
 * @exports NumberPlate
 */
class NumberPlate {
    /**
    * @method generateNumberPlate
    * @description generates a pseudorandom number plate string
    * @returns {string} the generated car plate string
    */
    static generateNumberPlate() {
      let strValCharacters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let randPltNum = '';
  
      for (i = 0; i < 8; i++) {
        randPltNum += strValCharacters.charAt(parseInt(Math.random() * strValCharacters.length));
        if (i === 4){
            randPltNum = randPltNum + "-";
        }
      }
      return randPltNum;
    }
  }
  