
const fs = require('fs');
const readline = require('readline');

const getData =function (file_name) {
    fs.readFile(file_name, {encoding:'utf8'}, (err, data) => {
        if (data.length === 0) {
            console.log('list is empty!')
            menu();
        } else {
            console.log(data);
            menu();
        }
    })
}

const write = function(file_name, output) {
    fs.writeFile(file_name, output, (err) => {
        if (err) {console.err(err)} 
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const fileName = 'todo_list.txt';
// const splitTaskArr = () => fs.readFileSync(fileName).toString().split('\n');
console.log('Welcome to TODO CLI!\n------------------\n')

const menu = () => {
    rl.question ('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>', (response) => {
        if (response.toLowerCase() === 'v') {
            getData(fileName);
        }
        
        else if (response.toLowerCase() === 'n') {
            rl.question('what?\n>', (addNew) => {
                let list = '';
                let countTasksInFile = 1;
                if (fs.readFileSync(fileName).toString().split('\n').length === 0) {
                    countTasksInFile = 1;
                } else {
                    countTasksInFile = fs.readFileSync(fileName).toString().split('\n').length - 1;
                }

                list += `${countTasksInFile} [ ] ${addNew}\n`;
                fs.appendFile(fileName, list, (err) => {
                    if (err) {console.err(err)} 
                    else {menu()}
                })
            })   
        } 
        
        else if (response.toLowerCase()[0] === 'c') {
            completeResult = '';
            for (let tasks of fs.readFileSync(fileName).toString().split('\n')) {
                let taskSplit = tasks.split(" ");
                if (taskSplit[0] === response.slice(1)) {
                    let indexOfSelected = fs.readFileSync(fileName).toString().split('\n').indexOf(tasks)
                    completeResult += `${taskSplit[0]} [*] ${taskSplit[3]}\n`;
                    fs.readFileSync(fileName).toString().split('\n').splice(indexOfSelected, 1, completeResult);
                   console.log(`\ncompleted ${taskSplit[3]}\n`)
                } else {
                    completeResult += `${tasks}\n`
                } 
            } 
            write(fileName, completeResult);
            menu();
        } 
        
        else if (response.toLowerCase()[0] === 'd') {
            deleteResult = '';
            for (let tasks of fs.readFileSync(fileName).toString().split('\n')) {
                let taskSplit = tasks.split(" ");
                if (taskSplit[0] === response.slice(1)) {
                    let indexOfSelected = fs.readFileSync(fileName).toString().split('\n').indexOf(tasks)
                    if (taskSplit[1] === '[*]') {
                    console.log(`\ndeleted ${taskSplit[2]}\n`)                   
                    } else if (taskSplit[1] === '['){
                        console.log(`\ndeleted ${taskSplit[3]}\n`)
                    }
                    fs.readFileSync(fileName).toString().split('\n').splice(indexOfSelected, 0);
                } else {
                    deleteResult += `${tasks}\n`
                }
            } //console.log(deleteResult)
            write(fileName, deleteResult);
            menu();
        } 
        
        else {
            rl.close();
        }
    })
}

menu();

