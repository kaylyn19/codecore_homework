
const fs = require('fs');
const readline = require('readline');

// const getData =function () {
//     fs.readFile(file, {encoding: 'utf8'}, (err, data) => {
//         if (err) {
//             console.err(err);
//         }
//         return data;
//     })
// }

// const add = function (response) {
//     fs.writeFile(file, response, (err) => {
//         if (err) {
//             console.err(err);
//         } return;
//     })
// }

// const del = function (id) {
//     file.splice(id);
// }

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const menu = () => {
    rl.question ('Welcome to TODO CLI!\n------------------\n(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n>', (response) => {
        switch (response.toLowerCase()) {
            case 'v':
                // getData();
                fs.readFile('todo_list.txt', (err, data) => {
                    if (data.length === 0) {
                        console.log('list is empty!')
                    } else {
                        console.log(data);
                    }
                })
                menu()
                break;
            case 'n':
                rl.question('what?', (addNew) => {
                    // add(addNew);
                    
                    console.log(`${addNew} has been added`)
                })
                menu()
                break;
            case 'c':
                menu()
                break;
            case 'd':
                del(dX)
                menu()
                break;
            case 'q':
                rl.close()
                break;
            default:
        }
    })
}

menu();