export default class Grapth {

    
    
    constructor(array, horizontalLength, verticalLength) {

        this.diemsionalArray = new Array(horizontalLength);

        for (let i = 0; i<horizontalLength - 1; i++) {
            this.diemsionalArray[i] = new Array(verticalLength);
        }

    }


}