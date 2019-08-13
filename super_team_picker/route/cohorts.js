const express = require('express')
const router = express.Router();
const knex = require('../db/client')

router.get('/new', (req, res) => {
    res.render('teams/new')
})

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
})

router.get('/', (req, res) => {
    knex('cohorts')
        .orderBy('createdAt', 'DESC')
        .then((data) => {
            res.render('teams/cohorts', {data: data})
        })
})

router.get('/:id', (req,res) => {
    const {method, quantity} = req.query

    function shuffle(array) {
        let i, j, k;
        for (i = array.length-1; i >= 0; i--) {
            j = Math.floor(Math.random() * array.length);
            k = array[i];
            array[i] = array[j];
            array[j] = k;
        } return array;
    }

    let teams = [];
    function separateIntoTeams (value) {
        for (let i = 0; i < value; i++) {
            teams.push([])
        } return teams;
    }

    function assign(arr, value) {
        for (let i = 0; i < arr.length; i++) {
            let arrayIndex = i % value
            teams[arrayIndex].push(arr[i])
            console.log(arr[i])
        } 
    }

    const id = req.params.id
    knex('cohorts')
        .where('id', id)
        .first()
        .then((data) => {
            if (data) {
                const splitMembers = data.members.split(',')
                const shuffledMembers = shuffle(splitMembers)
                const groups = Math.floor(shuffledMembers.length / quantity)
                if (method === 'teamCount') {
                    separateIntoTeams(quantity)
                    assign(shuffledMembers, quantity)
                } else if (method === 'numberPerTeam') {
                    separateIntoTeams(groups)
                    assign(shuffledMembers, groups)
                }
                res.render('teams/show', {record: data, shuffledMembers, method, quantity, teams})
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