
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
    fs.writeFile(fileName, output, (err) => {
        if (err) {console.err(err)} 
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// let list = '';
// const fileName = 'todo_list.txt';
// const splitTaskInArr = fs.readFileSync(fileName).toString().split('\n');
console.log('Welcome to TODO CLI!\n------------------\n')

const menu = () => {
    rl.question ('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>', (response) => {
        if (response.toLowerCase() === 'v') {
            getData('todo_list.txt');
        }
        
        else if (response.toLowerCase() === 'n') {
            rl.question('what?\n>', (addNew) => {
                let list = '';
                let countTasksInFile = 1;
                if (fs.readFileSync('todo_list.txt').toString().split('\n').length === 0) {
                    countTasksInFile = 1;
                } else {
                    countTasksInFile = fs.readFileSync('todo_list.txt').toString().split('\n').length - 1;
                }

                list += `${countTasksInFile} [ ] ${addNew}\n`;
                fs.appendFile('todo_list.txt', list, (err) => {
                    if (err) {console.err(err)} 
                    else {menu()}
                })
            })   
        } 
        
        else if (response.toLowerCase()[0] === 'c') {
            completeResult = '';
            for (let tasks of splitTaskInArr) {
                let taskSplit = tasks.split(" ");
                if (taskSplit[0] === response.slice(1)) {
                    let indexOfSelected = splitTaskInArr.indexOf(tasks)
                    completeResult += `${taskSplit[0]} [*] ${taskSplit[3]}\n`;
                    splitTaskInArr.splice(indexOfSelected, 1, completeResult);
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
            for (let tasks of splitTaskInArr) {
                let taskSplit = tasks.split(" ");
                if (taskSplit[0] === response.slice(1)) {
                    let indexOfSelected = splitTaskInArr.indexOf(tasks)
                    if (taskSplit[1] === '[*]') {
                    console.log(`\ndeleted ${taskSplit[2]}\n`)                   
                    } else if (taskSplit[1] === '['){
                        console.log(`\ndeleted ${taskSplit[3]}\n`)
                    }
                    splitTaskInArr.splice(indexOfSelected, 0);
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

