import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import styles from '../styles/crtPage.css';
import Card from 'react-bootstrap/Card'
import to_my_phone from '../assets/to_my_phone.png'
import CardPage from '../assets/Card_Inf.png'
import { Button } from 'react-bootstrap';

// account:{type:String, unique:true},
// amount:{type:String},
// paymentAmount:{type:Number},
// paymentDay:{type:Date,default:Date.now},
// nextPaymentDay:{type:Date,default:Date.now + 30*24*60*60*1000},
// owner:{type:String}

export const LinksPage=()=>{
    const {loading, request,error ,clearError} = useHttp()
    const [userData,setUserData] = useState([])
    const [account,setAccount] = useState('')

    const [loanName,setLoanName] = useState('') 
    const [paymentDate,setPaymentDate] = useState(new Date())

    const [owner,setOwner] = useState('')
    const [amount,setAmount] = useState(0)
    const [paymentAmount,setPaymentAmount] = useState(0)
    const [paymentDay,setPaymentDay] = useState(new Date())
    const [nextPaymentDay,setNextPaymentDay] = useState(new Date())
    const message = useMessage()
 
    const pressHandler = async event =>{
        if(event.key == 'Enter'){
            try {
                const data =  await request('api/loan/setLoan','POST',{account:account,amount:amount ,owner:owner,paymentAmount:paymentAmount,paymentDay:new Date(),nextPaymentDay:new Date(),isActual:true})
                console.log(data)
            } catch (error) {
                
            }
        }
    }

    const pressHandlerLoan = async() =>{
            try {
                const data =  await request(`api/loan/getAccountDetail`,'GET',null,{})
                console.log(data)
            } catch (error) {
                
            }
        
    }

    const pressHandlerActual = async() =>{
        try {
            const data =  await request(`api/loan/setLoanActual`,'POST',{account:account,isActual:false})
            console.log(data)
        } catch (error) {
            
        }
    
}
const pressCreateTable = async() =>{
    try {
        const data =  await request(`api/loansTable/setLoansTable/`,'POST',{account:account,paymentDate:paymentDate,amount:amount,loanName:loanName,})
        console.log(data)
    } catch (error) {
        
    }

}

const pressGetTable = async() =>{
    try {
        const data =  await request(`api/loansTable/get`,'GET',null,{})
        console.log(data)
    } catch (error) {
        
    }

}

 
  
    return(
        <div style={{marginTop:100,padding:20,height:'50vh'}}>
        
               
                <div className="row">
                    <div className="col-2">
                        <input 
                        placeholder="account"
                            id="link"
                            type="text"
                            value={account}
                            onChange={e=>setAccount(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div> 
                    <div className="col-2">
                    <input 
                        placeholder="payment amount"
                            id="link"
                            type="text"
                            value={paymentAmount}
                            onChange={e=>setPaymentAmount(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>   
                    <div className="col-2">
                    <input 
                        placeholder="owner"
                            id="link"
                            type="text"
                            value={owner}
                            onChange={e=>setOwner(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>   
                    <div className="col-2">
                    <input 
                        placeholder="amount"
                            id="link"
                            type="text"
                            value={amount}
                            onChange={e=>setAmount(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>   
                    <div className="col-2">
                    <input 
                        placeholder="payment day"
                            id="link"
                            type="text"
                            value={paymentDay}
                            onChange={e=>setPaymentDay(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>  
                    <div className="col-2">
                    <input 
                        placeholder="next payment day"
                            id="link"
                            type="text"
                            value={nextPaymentDay}
                            onChange={e=>setNextPaymentDay(e.target.value)}
                            onKeyPress={pressHandler}
                        />
                    </div>  
                    </div>
                    <div className="row">
                    <div className="col s8 offset-2">
                        <Button 
                            id="loan"
                            type="text"
                            onClick={pressHandlerLoan}
                        >получить данные
                        </Button>
                    </div>
                    <div className="col s8 offset-2">
                        <Button 
                            id="loan"
                            type="text"
                            onClick={pressHandlerActual}
                        >изменить
                        </Button>
                    </div>
                    </div>

                    <div className="row">
                    <div className="col s8 offset-2">
                        <Button 
                            id="loan"
                            type="text"
                            onClick={pressGetTable}
                        >получить данные table
                        </Button>
                    </div>
                    <div className="col-2">
                    <input 
                        placeholder="loan name"
                            id="link"
                            type="text"
                            value={loanName}
                            onChange={e=>setLoanName(e.target.value)}
                        />
                    </div>  
                    <div className="col-2">
                    <input 
                        placeholder="next payment day"
                            id="link"
                            type="text"
                            value={paymentDay}
                            onChange={e=>setPaymentDate(e.target.value)}
                        />
                    </div>  
                    <div className="col s8 offset-2">
                        <Button 
                            id="loan"
                            type="text"
                            onClick={pressCreateTable}
                        >создать table
                        </Button>
                    </div>
                    </div>
                    
           
        </div>
    )
}