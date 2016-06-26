var fs = require('fs');

/**
 * Generates a username by selecting a random adjective and a last name.
 * Currently this does not keep track of what usernames are generated, so duplicates
 * are possible.
 */
module.exports = function() {
  var nameGenerator = {
    lastNames: [],
    adjectives: [],

    /**
     * Selects an item in the given array between min (included) and max (excluded).
     * @param {Array} the array to select an item from
     * @return {Object} the randomly selected item from the array.
     */
    getRandomItem: function(array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Pieces together a username from a random adjective and last name.
     * @return {string} a username composed of a random adjective and last name.
     */
    newName: function() {
      return this.getRandomItem(this.adjectives) + this.getRandomItem(this.lastNames);
    }
  };

  var capitalizeFirstLetter = function(inputString) {
      return inputString.charAt(0).toUpperCase() + inputString.toLowerCase().slice(1);
  };

  // Load all names into memory so we only have to pay for file IO once
  nameGenerator.lastNames = fs.readFileSync('server/names/last_names.txt')
    .toString()
    .split(/\r?\n/)
    .map(capitalizeFirstLetter);
  nameGenerator.adjectives = fs.readFileSync('server/names/adjectives.txt')
    .toString()
    .split(/\r?\n/)
    .map(capitalizeFirstLetter);

  return nameGenerator;
}();
