import React ,{useEffect,useState}from 'react'
import { Button } from 'react-bootstrap';
import to_my_phone from '../assets/to_my_phone.png' 
import credit_pay_icon from '../assets/credit_pay_icon.svg' 
import path from '../assets/Path.svg' 
import logo2 from '../assets/mc.svg'
import {useHistory} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import Card from 'react-bootstrap/Card'
import '../index.css';

export const LoansPage=()=>{
    const {loading, request,error ,clearError} = useHttp()
    const history = useHistory()
    const [carouselValue,setCarouselValue] = useState(false)
    const [cardData,setCardData] = useState([])
    const [amount,setAmount]=useState(0)
    const [loanData,setLoanData] = useState([])
    const [index, setIndex] = useState(0);
    const [userData,setUserData] = useState([])
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    useEffect(()=>{
        pressHandlerCard()
        pressHandlerLoan()
        getUserData()
    },[])

    const pressHandlerCard = async() =>{
        try {
            const data =  await request(`api/links/getAccountDetail`,'GET',null,{})
            setCardData(data)
            console.log(data)
        } catch (error) {
            
        }
    }

    const setSelected =()=>{
        setCarouselValue(true)
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

    const finishPayment = async(account) =>{
        try {
            const data =  await request(`api/loan/setLoanActual`,'POST',{account:account.account,paymentAmount:account.paymentAmount,amount:account.amount,nextPaymentDay:account.nextPaymentDay,isActual:false})
            const linkData =  await request(`api/links/setLinkActual`,'POST',{account:account.account,paymentAmount:account.paymentAmount})
          //  const dataCreate =  await request('api/loan/setLoan','POST',{account:'',amount:amount ,owner:owner,paymentAmount:paymentAmount,paymentDay:new Date(),nextPaymentDay:new Date(),isActual:true})
            const loanTableData =  await request(`api/loansTable/setLoansTable/`,'POST',{account:account,paymentDate:Date.now(),amount:amount,loanName:'Телевизор'})
            //const loanTableDataActual =  await request(`api/loansTable/setLoanTableActual`,'POST',{account:account.account,amount:parseInt(amount)})
            const transferData =  await request(`api/auth/transferMoney`,'POST',{amount:amount,publicAddress:'7355219a4ac1562c59a0fbeca93738fc784472e4cba55ac13c041e6aeb51bdca.78349c3dec5c9936a9d947b845e21ca6ad12b7d3ff6bb5a1418cc527b86b58c0'})
      
            
            history.push('/PaymentConfirm')
        } catch (error) {
            
        }
       
    }
    return(
        <div>
            <div style={{ background: '#F9F9F9' }} className="container">
                <div style={{ display: 'flex', marginTop: 60 }}>
                    <div style={{ flex: 1}}>
                        <p style={{fontWeight: '700',fontSize: 18}}>
                            Внести платеж
                        </p>
                    </div>
                </div>
                <div style={{ display: 'flex'}}>
                    <div style={{ flex: 1}}>
                        <p style={{fontSize: 12}}>
                            Откуда
                        </p>
                    </div>
                </div>
                <div style={{backgroundColor:'green'}}>
                </div>
                <div style={{maxHeight:100, zIndex:-1}}>
                    <Carousel autoPlay={false} interval={10000000} showIndicators={false} showStatus={false} style={{maxHeight:'100px !important', textAlign:'left', maxHeight:90}}>
                    
                        <div style={{ background: 'linear-gradient(125.08deg, #B47C61 0%, #DCB294 100%)', borderRadius: 20, maxHeight:90}}>
                            <div>
                                {cardData.map((item,index)=>(
                                <div style={{display: 'flex'}}>
                                    <div style={{ flex: 2, color:'white'}}>
                                    </div>
                                    <div style={{ flex: 10, color:'white'}}>
                                        <p style={{fontSize: 15, fontWeight: '600'}}>
                                            Master Card - {item.owner}
                                        </p>
                                        <p style={{fontSize: 15, marginTop: -10, color:'white'}}>
                                            {item.cardNumber}
                                        </p>
                                        <p style={{fontSize: 14, marginTop: -10, color:'white'}}>
                                        {item.amount}₸
                                        </p>
                                    </div>
                                    <div style={{ flex: 2, marginLeft:10, color:'white'}}>
                                        <img src={logo2} style={{margin:10, width:50}}/>
                                    </div>
                                </div>
                            
                                ))}
                            </div>
                        </div>
                        <div style={{ background: 'linear-gradient(125.08deg, #B47C61 0%, #DCB294 100%)', borderRadius: 20, maxHeight:90, marginTop:-7}}>
                                {userData.map((item,index)=>(
                                    <Card style={{borderRadius:20,background: 'linear-gradient(135deg, #5EC794 0%, #7dd4aa 100%)', color:'white',  maxHeight:90}} >
                                        <Card.Body>
                                            <Card.Subtitle style={{fontSize:15}}>Счет ЦТ</Card.Subtitle>
                                            {/* <Card.Title className="mb-2" style={{fontSize:24, marginTop: 80}}>{format( "#,##0.####", 1234567.890 )}.00 ₸  </Card.Title> */}
                                            <Card.Title className="mb-2" style={{fontSize:14, marginTop: 20}}>{item.Balance.regular_balance}.00 ₸  </Card.Title>
                                        </Card.Body>
                                    </Card>
                                ))}
                        </div>
                    </Carousel>
                </div>
               
                
                <div style={{ display: 'flex', marginTop: 30}}>
                    <div style={{ flex: 1}}>
                        <p style={{fontSize: 12}}>
                            Куда
                        </p>
                    </div>
                </div>
                <div style={{ background: 'linear-gradient(129.08deg, #9E91E3 0%, #93A6E9 100%)', borderRadius: 20, padding: 10, marginRight: 10, minHeight:60  }}>
                    {loanData.map((item,index)=>(
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1, marginTop:8}}>
                                <img src={credit_pay_icon}/>
                            </div>
                            <div style={{ flex: 12, marginLeft:10, color:'white'}}>
                                <p style={{fontSize: 15, fontWeight: '600'}}>
                                    Кредит на телевизор
                                </p>
                                <p style={{fontSize: 12, marginTop: -8, color:'white'}}>
                                    Платеж по графику
                                </p>
                                <p style={{fontSize: 14, marginTop: -10, color:'white'}}>
                                    {item.paymentAmount}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex', textAlign: 'center', marginTop:20}}>
                    <div style={{ flex: 10}}>
                    <input 
                        placeholder="введите сумму"
                            id="link"
                            type="text"
                            value={amount}
                            onChange={e=>setAmount(e.target.value)}
                        />
                        <p style={{fontSize: 12, color:'gray'}}>
                            Комиссия отсутствует
                        </p>
                    </div>
                </div>
                {loanData.map((item,index)=>(
                    <Button style={{background:'#9C81E8', minWidth:'100%', minHeight:50, borderRadius:10}} onClick={()=> finishPayment(item)}> 
                        <div style={{ display: 'flex', textAlign: 'center', marginTop:5}}>
                            <div style={{ flex: 1}}> 
                                <img src={path}/>
                            </div> 
                            <div style={{ flex: 10}}> 
                                <p>Перевести</p>
                            </div> 
                            <div style={{ flex: 1}}> 
                            </div> 
                            
                        </div>
                    </Button>
                ))}
               
            </div>
        </div>
       
    )
}