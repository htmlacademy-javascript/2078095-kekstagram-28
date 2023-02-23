

function checkLength(string, max){

  if (string.length <= max){

    return true;
  }

  return false;
}

checkLength('проверка', 10);

function checkPalindrom(string){

  let reverseString = '';
  string = string.toUpperCase().replaceAll(' ','');

  for (let symbol = string.length - 1; symbol >= 0; symbol--){

    reverseString += string[symbol];
  }

  if (string === reverseString){

    return true;
  }

  return false;
}

checkPalindrom('довОд');


function getNumber(string){

  if (!isNaN(string)){

    string = String(string);
  }
  let number = '';

  for (let digit = 0; digit < string.length; digit++){

    if ((!isNaN(string[digit])) && (string[digit] !== ' ')){

      number += string[digit];
    }
  }

  return parseInt(number, 10);
}

getNumber('1 кефир, 0.5 батона');


// имяФункции('1', 2, '0');      // '01'
//имяФункции('q', 4, 'werty');  // 'werq'

function enhanceString (string, minLength,addSymbol){
  let count = minLength - string.length;
  if (count <= 0){

    return string;
  }

  let tempString = '';


  for (; count > 0; count = count - addSymbol.length){

    if (count - addSymbol.length < 0){

      addSymbol = addSymbol.slice(0, count);
      tempString = addSymbol + tempString;
    }else{
      tempString = addSymbol + tempString;
    }
  }
  tempString += string;
  string = tempString;
  return string;
}

enhanceString('q',4,'werty');

