class Turtle {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.direction = 'east';
        this.position = [[this.x, this.y]];
    }

    forward (steps) {
        for (let i = 0; i < steps; i++) {
            if (this.direction === 'east') {
                this.position.push([++this.x, this.y]);
            } else if (this.direction === 'west') {
                this.position.push([--this.x, this.y]);
            } else if (this.direction === 'north') {
                this.position.push([this.x, --this.y]);
            } else if (this.direction === 'south') {
                this.position.push([this.x, ++this.y]);
            }    
        }return this;
    }

    right () {
        switch (this.direction) {
            case "east":
                this.direction = "south"
                break;
            case "west":
                this.direction = "north"
                break;
            case "north":
                this.direction = "east"
                break;
            case "south":
                this.direction = "west"
                break; 
            default:
        } return this;
    }

    left () {
        switch (this.direction) {
            case "east":
                this.direction = "north"
                break;
            case "west":
                this.direction = "south"
                break;
            case "north":
                this.direction = "west"
                break;
            case "south":
                this.direction = "east"
                break; 
            default:
        } return this;
    }

    allPoints() {
        return this.position;
    }

    print() {
        console.log('-- BEGIN LOG');
        let minX = this.position[0][0];
        let maxX = this.position[0][0];
        let minY = this.position[0][1];
        let maxY = this.position[0][1];
        for (let coordinates of this.position) {
            if (coordinates[0] < minX) {
                minX = coordinates[0];
            }
            if (coordinates[0] > maxX) {
                maxX = coordinates[0];
            }
            if (coordinates[1] < minY) {
                minY = coordinates[1];
            }
            if (coordinates[1] > maxY) {
                maxY = coordinates[1];
            }
        } 
        const xCoord = Math.abs(maxX - minX);
        const yCoord = Math.abs(maxY - minY);
        // console.log(`minx is ${minX} maxx is ${maxX} miny is ${minY} maxy is ${maxY}`)
        // console.log(xCoord, yCoord)
        // for (let i = minY; i < yCoord; i++) {
        //     console.log(`minY is ${minY} maxY is ${maxY}`)
        //     for ( let j = minX; j < xCoord; j++) {
        //         console.log(`minX is ${minX} maxX is ${maxX}`)
        //         if (this.position.includes([j,i])) {
        //             console.log([j,i])
        //             console.log('*')
        //         } else {
        //             console.log("-")
        //         }
        //     }
        // }
        console.log('-- END LOG')
    }
}

const flash = new Turtle(0, 0).forward(3).left().forward(3);
// console.log(flash.allPoints())
console.log(flash.print())