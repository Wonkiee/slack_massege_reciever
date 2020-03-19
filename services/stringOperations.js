class StringOperations {

    /**
    * Find a string available inside an stirng array
    * @param {String} evekeyWord - String to be searched
    * @param {Array} stringArray - String array to be searched
    * */
    searchString(keyWord, stringArray) {
        let stringMatched = false;

        for (let i = 0; i < stringArray.length; i++) {
            let regEx = new RegExp(stringArray[i], "i");
            if (keyWord.match(regEx)) {
                stringMatched = true;
                return stringMatched;
            }
        }
        return stringMatched;
    };
}

module.exports = new StringOperations();