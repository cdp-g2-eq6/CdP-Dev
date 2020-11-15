const validatorFunctions = {

  /**
   * Checks if val is in the Fibonacci sequence
   * @param {number} val
   * @return {boolean}
   */
  isInFibonacci: function(val) {
    /**
     * Checks if n is a perfect square
     * @param {number} n
     * @return {boolean}
     */
    function isPerfectSquare(n) {
      return Math.sqrt(n) % 1 === 0;
    }

    return val > 0 &&
        isPerfectSquare(5 * val * val + 4) ||
        isPerfectSquare(5 * val * val - 4);
  },

};

module.exports = validatorFunctions;
