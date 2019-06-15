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

const drawBarsAround = function (names) {
    return "\u2503" + names + "\u2503" 
}


const drawTopBorder = function(list, lines) {
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
    let result = ""
    result = "\u2517" + lines + "\u251B" ;
    return result;
}

const boxIt = function(list, charLength, line, top, bottom, middle) {
    if (list.length === 0) {
        return top + "\n" + bottom;
    } else if ( list.length === 1) {
        return top + "\n" + "\u2503" +  list[0] + "\u2503" + "\n" + bottom;
    } 
    
    let outputMiddle = top + "";
    let outputTopBottom = "";
    let spaceLastItem = list[list.length - 1] + " ".repeat(charLength - list[list.length - 1].length);
    for ( let i = 0; i < list.length - 1; i++) {
        let space = list[i] + " ".repeat(charLength - list[i].length);
        outputMiddle += "\n" + drawBarsAround(space) + "\n" + middle ;
    }
    outputTopBottom = outputMiddle + "\n" + drawBarsAround(spaceLastItem) + "\n" + bottom;
    return outputTopBottom;
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
    drawLine(lengthOfChar(nameArr())),
    drawTopBorder(nameArr(), drawLine(lengthOfChar(nameArr()))),
    drawBottomBorder(nameArr(), drawLine(lengthOfChar(nameArr()))),
    drawMiddleBorder(nameArr(), drawLine(lengthOfChar(nameArr()))),
    )
)