const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
    account:{type:String},
    loanName:{type:String},
    amount:{type:Number},
    paymentDate: {type:Date},
    totalAmount:{type:Number}
})

module.exports = model('LoanTable',schema)