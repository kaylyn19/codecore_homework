const nameArr = function () {    
    let i = 2;
    let listOfNames = [];
    while ( i >= 2 && process.argv[i] !== undefined) {
        listOfNames.push(process.argv[i]);
        i++;
    }return(listOfNames)
}

const lengthOfChar = function (list) {
    if (list.length === 0) {
        return 0;
    } else {
        let length = [];
        for ( let names of list) {
            length.push(names.length);
        }return Math.max(...length);    
    }
}

const drawLine = function(len) {
    return '\u2501'.repeat(len)
}

const drawBarsAround = function (list, charLength) {
    let result = "";
    for ( let names of list) {
        let space = charLength - names.length
        result +=  "\n" + "\u2503" + names + " ".repeat(space) + "\u2503" + "\n"
    } return result;
}


const drawTopBorder = function(list, lines) {
    // let result = ""
    // if (list.length === 0) {
    //     result += "\u250F" + "\u2513" ;
    //     return result;
    // } else {
    //     result = "\u250F" + lines + "\u2513" ;
    //     return result;
    // }
    let result = ""
    result = "\u250F" + lines + "\u2513" ;
    return result;
}

const drawMiddleBorder = function(list, lines) {
    let result = ""
    result += "\u2523" + lines + "\u252B" ;
    return result;
}

const drawBottomBorder = function(list, lines) {
    // let result = ""
    // if (list.length === 0) {
    //     result += "\u2517" + "\u251B" ;
    //     return result;
    // } else {
    //     result = "\u2517" + lines + "\u251B" ;
    //     return result;
    // }
    let result = ""
    result = "\u2517" + lines + "\u251B" ;
    return result;
}

const boxIt = function(list, charLength, bars, line, top, bottom, middle) {
    if (list.length === 0) {
        return top + "\n" + bottom;
    } else if ( list.length === 1) {
        return top + "\n" + "\u2503" +  list[0] + "\u2503" + "\n" + bottom;
    } 
    
    let output = top + "";
    let result = "";
    for ( let i = 0; i < list.length - 1; i++) {
        let space = charLength - list[i].length;
        output += "\n" + "\u2503" + list[i] + " ".repeat(space) + "\u2503" + "\n" + middle + "\n";
        result = output + "\u2503" + list[list.length - 1] + "\u2503" + "\n" + bottom;
    } return result;
}

// console.log(nameArr());
// console.log(lengthOfChar(nameArr()));
// console.log(drawLine(lengthOfChar(nameArr())));
// console.log(drawBarsAround(nameArr(),lengthOfChar(nameArr())))
// console.log(drawTopBorder(nameArr(), drawLine(lengthOfChar(nameArr()))));
// console.log(drawMiddleBorder(nameArr(), drawLine(lengthOfChar(nameArr()))));
// console.log(drawBottomBorder(nameArr(), drawLine(lengthOfChar(nameArr()))));

console.log(boxIt(
    nameArr(), 
    lengthOfChar(nameArr()),
    drawBarsAround(nameArr(),lengthOfChar(nameArr())),
    drawLine(lengthOfChar(nameArr())),
    drawTopBorder(nameArr(), drawLine(lengthOfChar(nameArr()))),
    drawBottomBorder(nameArr(), drawLine(lengthOfChar(nameArr()))),
    drawMiddleBorder(nameArr(), drawLine(lengthOfChar(nameArr()))),
    )
)