const {Router } = require('express')
const Loan = require('../models/Loan')
const router = Router()
const config = require('config')
const mongoose = require('mongoose');
router.get('/:id',async(req,res)=>{
    try {
        const loans = await Loan.find()
        res.json(loans)
       
    } catch (e) {
        res.status(500).json({
            message: 'OOPS,try again'
        })
    }
})


router.post('/setLoan',async(req,res)=>{
    try {
        const {account,amount,owner,paymentAmount,nextPaymentDay,paymentDay,isActual} = req.body
   
        const loan = new Loan({
            account,amount,owner,paymentAmount,nextPaymentDay,paymentDay,isActual
        })
        await loan.save()

        res.status(201).json({
            message: 'Data saved'
        })

       
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
})

router.post('/setLoanActual',async(req,res)=>{
    try {
       
        const {account,isActual,nextPaymentDay,paymentAmount,amount} = req.body
        let date = new Date();

        date.setDate(date.getDate() + 30);
        const record = { account: account }
        const newvalues = {isActual: isActual,payment:amount - paymentAmount ,nextPaymentDay:date };
        Loan.updateOne(record, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
          });

        res.status(201).json({
            message: 'Data saved'
        })

       
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
})
module.exports = router
