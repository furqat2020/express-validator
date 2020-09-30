const { check } = require('express-validator/check')
const express = require('express')
const { matchedData } = require('express-validator/filter')
router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/contact', (req, res) => {
    res.render('contact', {data:{}, errors:{}})
})

router.post('/contact', [
    check('message').isLength({min:1}).withMessage('Xabar bosh bolmasligi kerak...'),
    check('email').isEmail().withMessage('Email-da hatolik bor...').trim().normalizeEmail()
], (req, res) => {
    
    req.getValidationResult()
    .then( errors => {
        if(!errors.isEmpty()){
            res.render('contact', {
                data:req.body, 
                errors:errors.mapped()
            })
        }

        const data = matchedData(req)
        console.log('Sanitized', data)

        req.flash('success', "Xabar uchun rahmat. Aloqada bo'ling.")
        res.redirect('/')
    })
})

module.exports = router