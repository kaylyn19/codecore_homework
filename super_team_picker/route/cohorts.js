const express = require('express')
const router = express.Router();
const knex = require('../db/client')

router.get('/new', (req, res) => {
    res.render('teams/new')
})

const COOKIE_MAX_AGE=1000 * 60 * 60 * 24 * 7
router.post('/', (req, res) => {
    const members = req.body.members
    knex('cohorts')
        .insert({
            name: req.body.name,            
            members: req.body.members,
            logoUrl: req.body.url
        })
        .returning('*')
        .then((data) => {
            const record = data[0]
            res.redirect(`/cohorts/${record.id}`)
        })
    res.cookie('members', members, {maxAge: COOKIE_MAX_AGE})
})

router.get('/', (req, res) => {
    knex('cohorts')
        .orderBy('createdAt', 'DESC')
        .then((data) => {
            res.render('teams/cohorts', {data: data})
        })
})

router.get('/:id', (req,res) => {
    function shuffle(array) {
        let i, j, k;
        for (i = array.length-1; i >= 0; i--) {
            j = Math.floor(Math.random() * array.length);
            k = array[i];
            array[i] = array[j];
            array[j] = k;
        } return array;
    }

    let result = [];
    function separateIntoTeams (value) {
        for (let i = 0; i < value; i++) {
            result.push([])
        } return result;
    }

    function assign(arr) {
        if (arr.length===0) {
            return result
        } else {
            for (let i = 0; i < result.length; i ++) {
                result[i].push(arr[0])
                arr.shift()
            }
            assign(arr)

        } return result
    }
    const members = req.cookies.members
    const quantity = Number(req.query.quantity)
    const split = members.split(',');
    const method = req.query.method
    const shuffleArr = shuffle(split);
    const remainder = shuffleArr % quantity
    const groups = Math.floor(shuffleArr.length/quantity);

    if (method === 'teamCount') {
        console.log('teamcount');
        separateIntoTeams(quantity);
        assign(shuffleArr)
    } else {
        console.log('Number Per Team');
        if (remainder > Math.ceil(quantity/2)) {
            separateIntoTeams(groups+1)
            arr = assign(shuffleArr)
        } 
        // else {
        //     separateIntoTeams(groups);
        //     assign(shuffleArr)
        // }
    }

    const id = req.params.id
    knex('cohorts')
        .where('id', id)
        .first()
        .then((data) => {
            if (data) {
                res.render('teams/show', {record: data, method:method, quantity:quantity, array: shuffleArr})
            } else {
                res.send('The request is not available')
            }
        })
})

router.delete('/:id', (req,res) => {
    const id = req.params.id
    knex('cohorts')
        .where('id', id)
        .del()
        .then(() => {
            res.redirect('/cohorts')
        })
})

router.get('/:id/edit', (req,res) => {
    const id = req.params.id;
    knex('cohorts')
        .where('id', id)
        .first()
        .then((data) => {
            if (data) {
                res.render('teams/edit', {record: data})
            } else {
                res.send('<div>The rquest is not available</div>')
            }
        })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    knex('cohorts')
        .where('id', id)
        .first()
        .update({
            name: req.body.name ,
            members: req.body.members,
            logoUrl: req.body.url
        })
        .returning('*')
        .then((data) => {
            const record = data[0];
            res.redirect(`/cohorts/${record.id}`)
        })
})

module.exports = router