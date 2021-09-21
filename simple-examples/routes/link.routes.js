const {Router } = require('express')
const Link = require('../models/Link')
const router = Router()
const config = require('config')


router.get('/:id',async(req,res)=>{
    try {
        const link = await Link.find()
        res.json(link)
       
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
})



router.post('/chargeMoney',async(req,res)=>{
    try {
        const {account,amount,code,owner,cardNumber} = req.body
        const link = new Link({
            account,amount,code,owner,cardNumber
        })
        await link.save()
        res.status(201).json({
            message: 'Data saved'
        })
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
})


router.post('/setLinkActual',async(req,res)=>{
    try {
        const {account,paymentAmount} = req.body
  
        const record = { account: account }
        const exactData = await Link.findOne({account})

        const newvalues = {amount:exactData.amount - paymentAmount };
       Link.updateOne(record, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 link document updated");
          });

        res.status(201).json({
            message: 'link Data saved'
        })

       
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
})

module.exports = router
