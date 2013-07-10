define([], function() {

  var MAP_EXTENDED_TO_ASCII = {
    '188': '44',
    '109': '45',
    '190': '46',
    '191': '47',
    '192': '96',
    '220': '92',
    '222': '39',
    '221': '93',
    '219': '91',
    '173': '45',
    '187': '61',
    '186': '59',
    '189': '45'
  }

  var MAP_SHIFT_TO_CHARACTER = {
    "96": "~",
    "49": "!",
    "50": "@",
    "51": "#",
    "52": "$",
    "53": "%",
    "54": "^",
    "55": "&",
    "56": "*",
    "57": "(",
    "48": ")",
    "45": "_",
    "61": "+",
    "91": "{",
    "93": "}",
    "92": "|",
    "59": ":",
    "39": "\"",
    "44": "<",
    "46": ">",
    "47": "?"
  };

  var Keys = function() {
  }

  Keys.prototype = {
    /**
      * Alter the text and cursor position given a which
      */
    alterByEvent: function(text, position, event) {
      var character = event.which;

      console.log(character);

      switch(character) {
          case 37: // left
            --position;
            break;

          case 39: //right
            ++position;
            break;

          case 8: // delete
            text =
              text.slice(0, position - 1)
              + text.slice(position);
            --position;
            break;

          default: // ascii key
            if (MAP_EXTENDED_TO_ASCII.hasOwnProperty(character)) {
              character = MAP_EXTENDED_TO_ASCII[character];
            }

            else if (!event.shiftKey &&
                (character >= 65 && character <= 90)) {
              character = String.fromCharCode(character + 32);
            }

            else if (event.shiftKey &&
                MAP_SHIFT_TO_CHARACTER.hasOwnProperty(character)) {
              character = MAP_SHIFT_TO_CHARACTER[character];
            }

            else {
              character = String.fromCharCode(character);
            }

            text =
              text.slice(0, position)
              + character
              + text.slice(position);

            ++position;
            break;
      }

      return {
          text: text,
          position: position
      };
    },


    /**
     * Alter the text and position by inserting the given
     * string
     */
    alterByString: function(text, position, str) {
      return {
        text: text.slice(0, position) + str + text.slice(position),
        position: position + str.length
      };
    }
  }

  return Keys;
});
