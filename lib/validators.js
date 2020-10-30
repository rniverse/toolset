module.exports = {
  password: {
    /**
     * This is taken from here
     * https://stackoverflow.com/a/21456918
     */
    get basic() {
      return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    },
    get hard() {
      return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    }
  },
  get name() {
    return /^[A-Z]+[A-Za-z .]{1,}$/;
  },
  /**
   * @returns {RegExp}
   * To test word with
   * - 5-15 chars
   * - allows only a-z,0-9,.,_
   * - starts with a-z
   * - ends with a-z or digit
   */
  get handle() {
    return /^[a-z][a-z0-9._]{3,12}[a-z0-9]$/;
  }
};
