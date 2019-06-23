const express = require('express')
const router = express.Router();
const knex = require('../db/client')

router.get('/new', (req, res) => {
    res.render('teams/new')
})

router.post('/', (req, res) => {
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
    // console.log('req.body.id is ', req.body.id)
    const id = req.params.id
    knex('cohorts')
        .where('id', id)
        .first()
        .then((data) => {
            if (data) {
                res.render('teams/show', {record: data})
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

})

module.exports = router