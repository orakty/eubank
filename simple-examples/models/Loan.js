const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
 account:{type:String, unique:true},
 amount:{type:Number},
 paymentAmount:{type:Number},
 paymentDay:{type:Date,default:Date.now},
 nextPaymentDay:{type:Date,default:Date.nows},
 owner:{type:String},
 isActual:{type:Boolean},
 loanName:{type:String}
})

module.exports = model('Loan',schema)