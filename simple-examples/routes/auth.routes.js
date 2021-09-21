const { Router,response} = require('express')
const User = require('../models/User')
const {check,validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = Router()
const config = require('config')
const { request, gql } = require('graphql-request')
const fetch =require('isomorphic-fetch');
const https = require('https')
const fs = require('fs');

const options = {
            
    key: fs.readFileSync(
    './cert_prod/private.pem',
    `utf-8`,
    ),
    cert: fs.readFileSync(
     './cert_prod/client_eubank.pem',
    'utf-8',
    )
};

function getaTokenFromStore(){
    return JSON.parse(localStorage.getItem('userData'))
}


const sslConfiguredAgent = new https.Agent(options);


router.post(
    '/login',
    // [
    //     check('email','Enter correct email').normalizeEmail().isEmail(),
    //     check('password','Enter password').exists()
    // ],
    async (req, res) => {
        console.log('here login')
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data on entering'
                })
            }

            const {email,password} = req.body

            const user = await  fetch('https://eubank.cbdc.rip/v1/graphql', {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                  },
                  agent: sslConfiguredAgent,
                body: JSON.stringify({
                    query: `{
                    auth_get_jwt(args: {_login: "${email}", _password: "${password}"}) {
                        jwt
                    }
                }`
                 })
            })
            .then((res) => res.json())
            .catch(error => console.log(error))

            const token = user.data.auth_get_jwt[0].jwt
        

            if(!user){
               return res.status(400).json({message:'Incorrect user'})
            }

           
            res.json({token}) 
        

        } catch (e) {
            res.status(500).json({
                message: 'OOPS,try again'
            })
        }

    })


    router.post(
        '/getDigitalTenge',
        async (req, res) => {
            try {
                const userData = await fetch('https://eubank.cbdc.rip/v1/graphql', {
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjogeyJ4LWhhc3VyYS1vcmctaWQiOiAiY2JkYyIsICJ4LWhhc3VyYS11c2VyLWlkIjogIjciLCAieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjogImJhbmstY2xpZW50IiwgIngtaGFzdXJhLWFsbG93ZWQtcm9sZXMiOiBbImJhbmstY2xpZW50IiwgImluZGl2aWR1YWwiXX19.Ubl57bShjjjn8RuzyrIqfe6K9VbC1p1wNUzzza9seTw',
                      },
                      agent: sslConfiguredAgent,
                      body: JSON.stringify({
                        query: `{ 
                            Wallet {                                                                                                
                               User { 
                                    id 
                                    real_name 
                                    }      
                                public_address 
                                view_key 
                                approve_time
                                Balance { 
                                    social_balance 
                                    regular_balance 
                                }
                            } 
                         }`
                     })
                })
                .then((res) => res.json())
                .catch(error => console.log(error))
                // console.log('userData',userData.data.Wallet[0])
                // const userDataResponse = JSON.parse(userData.data.Wallet[0])
            
                // console.log('userDataResponse',userDataResponse)
                if(!userData){
                   return res.status(400).json({message:'something went wrong'})
                }else{
                    return res.json({userData})
                }
                
               
                res.status(201).json({
                    message: 'Pulled succesfully!'
                })
            
    
            } catch (e) {
                res.status(500).json({
                    message: 'OOPS,try again'
                })
            }
    
        })

        router.post(
            '/transferMoney',
            async (req, res) => {
                try {
                    console.log('ehehey')
                    const {amount,publicAddess} = req.body
        
                    const user = await  fetch('https://eubank.cbdc.rip/v1/graphql', {
                        method:'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                          },
                          agent: sslConfiguredAgent,
                        body: JSON.stringify({
                            query: `mutation {
                            insert_OrgTransferRequest_one(object: {amount: ${amount}, publicAddress: "${publicAddess}", bank: "O=EUbank, L=Almaty, C=KZ"}) {
                              id
                            }
                          }`
                         })
                    })
                    .then((res) => res.json())
                    .catch(error => console.log(error))
        
                    const resData = user
                
        
                    if(!user){
                       return res.status(400).json({message:'Incorrect data on transfer'})
                    }
        
                   
                    res.json({resData}) 
                
        
                } catch (e) {
                    res.status(500).json({
                        message: 'OOPS,try again'
                    })
                }
        
            })
        
        

module.exports = router

