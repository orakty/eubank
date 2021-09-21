import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import styles from '../styles/crtPage.css';
import Card from 'react-bootstrap/Card'
import to_my_phone from '../assets/to_my_phone.png'
import CardPage from '../assets/Card_Inf.png'
import { Button } from 'react-bootstrap';
import ui1 from '../assets/UI-1.svg'
import ui2 from '../assets/UI-2.svg'
import ui3 from '../assets/UI-3.svg'
import ui4 from '../assets/UI-4.svg'
import logo2 from '../assets/mc.svg'
import {useHistory} from 'react-router-dom'

export const CreatePage=()=>{
    const {loading, request,error ,clearError} = useHttp()
    const [userData,setUserData] = useState([])
    const [cardData,setCardData] = useState([])
    const [loanData,setLoanData] = useState([])
    const [link,setLink] = useState('')
    const [owner,setOwner] = useState('')
    const [amount,setAmount] = useState(0)
    const [cardNumber,setCardNumber] = useState('')
    const [code,setCode] = useState('')
    const message = useMessage()
    
    const history = useHistory()
    useEffect(()=>{
        getUserData()
    },[])

    useEffect(()=>{
        pressHandlerCard()
    },[])
    useEffect(()=>{

        pressHandlerLoan()
    },[])

    const pressHandler = async event =>{
        if(event.key == 'Enter'){
            try {
                const data =  await request('api/links/chargeMoney','POST',{account:link,amount:amount,code:code ,owner:owner,cardNumber:cardNumber})
                console.log(data)
            } catch (error) {
                
            }
        }
    }



    const pressHandlerCard = async() =>{
            try {
                const data =  await request(`api/links/getAccountDetail`,'GET',null,{})
                setCardData(data)
                console.log(data)
            } catch (error) {
                
            }
        
    }

    const pressHandlerLoan = async() =>{
        try {
            const data =  await request(`api/loan/getAccountDetail`,'GET',null,{})
            setLoanData(data)
            console.log(data)
        } catch (error) {
            
        }
    
    }

    const getUserData =async()=>{
        try{
            const data = await request('/api/auth/getDigitalTenge','POST')
            // message(data.message)
            setUserData(data?.userData?.data?.Wallet)
            console.log(data.userData.data)
        }catch(e){
        }
    }
  
    return(
        // <div style={{marginTop:100,padding:20,height:'50vh'}}>
        //    {userData ?(
        //     <div className="container">
        //         <div className="row" style={{alignItems:'center',justifyContent:'center'}}>
        //             <div className="col-md-8">
        //                 {userData.map((item,index)=>(
        //                     <Card style={{borderRadius:20}} >
        //                         <Card.Body>
        //                             <Card.Title>Моя любимая карта :)</Card.Title>
        //                                 <Card.Subtitle className="mb-2 text-muted">Владелец: {item.User.real_name}</Card.Subtitle>
        //                                 <Card.Subtitle className="mb-2 text-muted">Сумма: {item.Balance.regular_balance} тенге</Card.Subtitle>
        //                         </Card.Body>
        //                     </Card>
        //                 ))}
        //             </div>
        //             <div className="col-md-4">
        //                 <Card.Img variant="top" src={CardPage} style={{width:'100%',margin:'auto',borderRadius:20}} />
        //             </div>
        //         </div>
        //         <div className="row">
        //             <div className="col-2">
        //                 <input 
        //                 placeholder="account"
        //                     id="link"
        //                     type="text"
        //                     value={link}
        //                     onChange={e=>setLink(e.target.value)}
        //                     onKeyPress={pressHandler}
        //                 />
        //             </div> 
        //             <div className="col-2">
        //             <input 
        //                 placeholder="cardNUmber"
        //                     id="link"
        //                     type="text"
        //                     value={cardNumber}
        //                     onChange={e=>setCardNumber(e.target.value)}
        //                     onKeyPress={pressHandler}
        //                 />
        //             </div>   
        //             <div className="col-2">
        //             <input 
        //                 placeholder="owner"
        //                     id="link"
        //                     type="text"
        //                     value={owner}
        //                     onChange={e=>setOwner(e.target.value)}
        //                     onKeyPress={pressHandler}
        //                 />
        //             </div>   
        //             <div className="col-2">
        //             <input 
        //                 placeholder="code"
        //                     id="link"
        //                     type="text"
        //                     value={code}
        //                     onChange={e=>setCode(e.target.value)}
        //                     onKeyPress={pressHandler}
        //                 />
        //             </div>   
        //             <div className="col-2">
        //             <input 
        //                 placeholder="amount"
        //                     id="link"
        //                     type="text"
        //                     value={amount}
        //                     onChange={e=>setAmount(e.target.value)}
        //                     onKeyPress={pressHandler}
        //                 />
        //             </div>   
        //             </div>
        //             <div className="row">
        //             <div className="col s8 offset-2">
        //                 <Button 
        //                     id="loan"
        //                     type="text"
        //                     onClick={pressHandlerLoan}
        //                 >получить данные
        //                 </Button>
        //             </div>
        //             </div>
                    
              
        //     </div>  
        //     ):(
        //         <h1>Loading</h1>
        //     )}
           
        // </div>
        <div style={{marginTop:60,height:'50vh'}}>
        {userData ?(
         <div className="container">
             <div style={{minHeight:90}}>
                 <div style={{ display: 'flex', padding:0}}>
                     <div style={{ flex: 1}}> 
                         <img src={ui1} style={{margin:-10}}/>
                     </div> 
                     <div style={{ flex: 1}}> 
                         <img src={ui2} style={{margin:-10}}/>
                     </div> 
                     <div style={{ flex: 1}}> 
                         <img src={ui3} style={{margin:-10}}/>
                     </div> 
                     <div style={{ flex: 1}}> 
                         <img src={ui4} style={{marginTop:3,marginLeft:-10}}/>
                     </div> 
                     
                 </div>
             </div>
             <div className="row" style={{alignItems:'center',justifyContent:'center',marginTop:10}}>
                 <div className="col-md-8" style={{fontSize:24}}>
                     {userData.map((item,index)=>(
                         <Card style={{borderRadius:20,background: 'linear-gradient(135deg, #5EC794 0%, #7dd4aa 100%)', color:'white', padding: 10, minHeight:205}} >
                             <Card.Body>
                                 <Card.Subtitle style={{fontSize:24}}>Счет ЦТ</Card.Subtitle>
                                 <Card.Title className="mb-2" style={{fontSize:24, marginTop: 80}}>{item.Balance.regular_balance}.00 ₸</Card.Title>
                             </Card.Body>
                         </Card>
                     ))}
                 </div>
                 <div className="col-md-4">
                    {cardData.map((item,index)=>(
                        <div style={{ background: 'linear-gradient(125.08deg, #B47C61 0%, #DCB294 100%)', borderRadius: 20, padding: 10, minHeight:205, marginBottom:10  }}>
                         <div style={{ display: 'flex' }}>
                             <div style={{ flex: 10, marginLeft:10, color:'white'}}>
                                 <p style={{fontSize: 24, fontWeight: '600'}}>
                                     Master Card
                                 </p>
                                 <center>
                                     <p style={{fontSize: 24, marginTop: 20, color:'white'}}>
                                         {item.cardNumber}
                                     </p>
                                 </center>
                                 <p style={{fontSize: 24, marginTop: 30, color:'white'}}>
                                    {item.amount}.00 ₸ 
                                 </p>
                             </div>
                             <div style={{ flex: 2, marginLeft:10, color:'white'}}>
                                 <img src={logo2} style={{margin:-10}}/>
                             </div>
                         </div>
                     </div>

                    ))}
                     
                 </div>
                 <div className="col-md-4">
                     {loanData.map((item,index)=>(
                         
                    <Button style={{ background: 'linear-gradient(129.08deg, #9E91E3 0%, #93A6E9 100%)', borderRadius: 20, padding: 10, minHeight:205, marginBottom:60  }}  onClick={() => history.push('/loansPage')}> 
                              <div style={{ display: 'flex' }}>
                              <div style={{ flex: 12, marginLeft:10, color:'white'}}>
                                      <p style={{fontSize: 24, fontWeight: '600'}}>
                                          {item.isActual ?'Кредит на телевизор':'кредит на телевизор погашен на данный месяц'}
                                      </p>
                                      <p style={{fontSize: 18, marginTop: -8, color:'white'}}>
                                          Платеж по графику
                                      </p>
                                      <p style={{fontSize: 24, marginTop: 50, color:'white'}}>
                                          {item.isActual ?item.paymentAmount:0}.00 ₸
                                      </p>
                                  </div>
                              </div>
                    </Button>
                     ))}
            
                 </div>
             </div>
           
         </div>  
         ):(
             <h1>Loading</h1>
         )}
        
     </div>
    )
}