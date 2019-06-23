const express = require('express')
const router = express.Router();
const knex = require('../db/client')

router.get('/new', (req, res) => {
    res.render('teams/new')
})

router.post('/new', (req, res) => {
    knex('cohorts')
        .insert({
            name: req.body.name,            
            members: req.body.members,
            logoUrl: req.body.url
        })
        .returning('*')
        .then((data) => {
            const record = data[0]
            res.redirect(`/new/${record.id}`)
        })
})

router.get('/', (req, res) => {
    res.render('teams/cohorts')
})

router.get('/:id', (req,res) => {
    const id = req.params.id
    knex.insert('cohorts')
        .where('id', id)
        .first()
        .then((data) => {
            if (data) {
                res.render('teams/show')
            } else {
                res.send('The request is not available')
            }
        })
})

module.exports = router