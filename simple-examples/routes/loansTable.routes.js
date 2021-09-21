const {Router } = require('express')
const LoanTable = require('../models/LoanTable')
const router = Router()
const config = require('config')
const mongoose = require('mongoose');

router.get('/:id',async(req,res)=>{
    try {
        const loansTable = await LoanTable.find()
        res.json(loansTable)
    } catch (e) {
        res.status(500).json({
            message: 'OOPS,try again'
        })
    }
})


router.post('/setLoansTable',async(req,res)=>{
    try {
       
        const {account,loanName,amount,paymentDate,totalAmount} = req.body
   
        const loanTable = new LoanTable({
            account,loanName,amount,paymentDate,totalAmount
        })
        await loanTable.save()

        res.status(201).json({
            message: 'Data saved'
        })

       
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
})

router.post('/setLoanTableActual',async(req,res)=>{
    try {
        const {account,amount} = req.body
        let currentAmount = LoanTable.findOne({account})
        let newTotalAmount = currentAmount.totalAmount - amount
        const record = { account: newTotalAmount }
        const newvalues = {totalAmount:newAmount };
        LoanTables.updateOne(record, newvalues, function(err, res) {
            if (err) throw err;
            console.log("table  document updated");
          });

        res.status(201).json({
            message: 'Data table  saved'
        })

       
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
})

module.exports = router
