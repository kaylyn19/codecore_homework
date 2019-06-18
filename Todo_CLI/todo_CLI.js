
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
// const add = function (response) {
//     fs.writeFile(file, response, (err) => {
//         if (err) {
//             console.err(err);
//         } return;
//     })
// }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let list = '';
const regex = /[ ]/g
const fileName = 'todo_list.txt';
console.log('Welcome to TODO CLI!\n------------------\n')

const menu = () => {
    rl.question ('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>', (response) => {
        if (response.toLowerCase() === 'v') {
            getData(fileName);
        } else if (response.toLowerCase() === 'n') {
            rl.question('what?\n>', (addNew) => {
                let order = 1;
                if (fs.readFileSync(fileName).length === 0) {
                    order = 1;
                }else {
                    order = fs.readFileSync(fileName).toString().split('\n').length;
                }
                list += `${order} [ ] ${addNew}\n`
                fs.appendFile(fileName, list, {encoding:'utf8'}, (err) => {
                    if (err) {
                        console.err(err);
                    } else {
                        menu();
                    }
                })
            })
        } else if (response.toLowerCase()[0] === 'c') {
            for (let tasks of fs.readFileSync(fileName).toString().split('\n')) {
                const indexOfSpace = tasks.indexOf(tasks.match(regex)[0]);
            }
        } else if (response.toLowerCase()[0] === 'd') {

        } else {
            rl.close();
        }
    })
}

menu();

