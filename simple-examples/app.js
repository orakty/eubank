const express = require("express");
const config = require('config')
const mongoose = require('mongoose')
const https = require('https');
const fs = require('fs');

const app = express()

app.use(express.json({extended:true}))

app.use('/api/auth',require('./routes/auth.routes'))
app.use('/api/links', require('./routes/link.routes'))
app.use('/api/loan', require('./routes/loans.routes'))
app.use('/api/loansTable', require('./routes/loansTable.routes'))

  const sslServer = https.createServer({
    key: fs.readFileSync('./cert_prod/private.pem','utf8'),
    cert: fs.readFileSync('./cert_prod/client_eubank.pem','utf8')
  },
  app)

const PORT = config.get('port')||5000

async function start(){
    try{
        await mongoose.connect(config.get('mongoUri'),{
        }) 
        sslServer.listen(PORT,()=>console.log(`App has been started on port ${PORT} ...`))
    }catch(e){
        console.log('Server Error',e.message)
        process.exit(1)
    }
}

start()

//  function start(){
//      try{
//         await mongoose.connect(config.get('mongoUri'),{
//         }) 
//         sslServer.listen(PORT,()=>console.log(`App has been started on  port ${PORT} ...`))
//     }catch(e){
//         console.log('Server Error',e.message)
//         process.exit(1)
//     }
// }

// start()