const {Schema,model,Types} = require('mongoose')

const schema = new Schema({
 account:{type:String, unique:true},
 amount:{type:Number},
 code:{type:String},
 date:{type:Date,default:Date.now},
 owner:{type:String},
 cardNumber:{type:String}
})

module.exports = model('Link',schema)