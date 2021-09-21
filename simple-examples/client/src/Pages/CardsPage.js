import React,{useState,useEffect} from 'react' 
import card_png from '../assets/date.png'
import to_my_phone from '../assets/to_my_phone.png'
import info from '../assets/info.svg'
import calendar from '../assets/calendar.svg'
import credit from '../assets/credit.svg'
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'


export const CardsPage=()=>{
    const {loading, request,error ,clearError} = useHttp()
    const [userData,setUserData] = useState([])
    const [tableData,setTableData] = useState([])
    const message = useMessage()
    const history = useHistory();

    useEffect(()=>{
        pressHandlerLoan()
        pressGetTable()
    },[])

    const enterAmount = async(account)=>{
        try {
            const data =  await request(`api/loan/setLoanActual`,'POST',{account:account,isActual:true})
            console.log(data)
            history.push('/loansPage')
        } catch (error) {
            console.log(error) 
        }
        
    }

    const pressGetTable = async() =>{
        try {
            const data =  await request(`api/loansTable/get`,'GET',null,{})
            setTableData(data)
            console.log(data)
        } catch (error) {
            
        }
    
    }

    const pressHandlerLoan = async() =>{
            try {
                const data =  await request(`api/loan/getAccountDetail`,'GET',null,{})
                setUserData(data)
                console.log(data)
            } catch (error) {
                console.log(error) 
            }
    }

    return(
        <div>
        {userData ?(
        <div style={{ background: '#F9F9F9' }} className="container">
            {userData.map((item) => (
            <div style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, padding: 20, border: '1px solid #DEE1E8',textAlign: 'center', marginTop: 15, background: 'white', width:'100%' }}>
                <div style={{ textAlign:"left" }}>
                    <div style={{ backgroundColor: `#9E91E3`, height:150, maxWidth:350, borderRadius:20,marginTop: "40px",color: "white",}}>
                    <div style={{ flex: 1}}>
                            <h6 style={{padding: 10,fontSize: 12}}>Платеж по графику</h6>
                            <p style={{fontWeight: '600',marginLeft:'10px',marginTop: '-20px',fontSize: 24}}>
                                {item.paymentAmount}.00 ₸
                                {/* {item.amount}.00 ₸ */}
                            </p>
                            
                            <h6 style={{padding: 10,fontSize: 12}}>Внесено за</h6>
                            <p style={{fontWeight: '600',marginTop: '-20px',marginLeft:'10px',fontSize: '20px'}}>
                                {/* {item.paymentAmount}.00 ₸ */}
                                0.00 ₸
                            </p>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: 10,height: 100 }}>
                    <div style={{ flex: 3}}>
                        <div style={{ background: '#F0F2FF', borderRadius: 10, padding: 20, marginRight: 10, minHeight:100  }}>
                            <div style={{ display: 'flex' }}>
                                <div style={{ flexBasis: 50 }}>
                                    <img src={card_png}/>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h7>Внесено до </h7>
                                    <div style={{ marginTop:"-3px"}}>
                                        <h7>{item.paymentDay.substring(0, 10)} </h7>
                                    </div>
                                    {/* <h6 style={{ marginTop:"-3px"}}>{item.paymentAmount}.00 ₸</h6> */}
                                    <h6 style={{ marginTop:"-3px"}}>0.00 ₸</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1}}>
                        <Button size="xxl" style={{borderRadius: 10, padding: 8, border: '1px solid #DEE1E8',backgroundColor:'white',color:'black',
                            textAlign: 'center', minHeight:100}} variant="outline-warning" onClick={() => enterAmount(item.account)}> 
                            <div> 
                                <img src={to_my_phone}/> 
                            </div> 
                            <div> 
                                <p style={{fontSize: 14, textTransform:'none', lineHeight:1}}>Внести платеж</p> 
                            </div> 
                        </Button>
                    </div>
                </div>
            </div>
             ))}
            <div style={{ display: 'flex', marginTop: 10,textAlign: 'center' }}>
                <div style={{ flex: 1}}>
                    <div style={{ display: 'flex' }}>
                        <div style={{ flex: 1 }}>
                            Выписка
                            <hr style={{backgroundColor:"#9C81E8"}}></hr>
                        </div>
                        <div style={{ flex: 1 }}>
                            График
                        </div>
                        <div style={{ flex: 1 }}>
                            Действие
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, marginBottom:40, padding: 20, border: '1px solid #DEE1E8',textAlign: 'center', background: 'white', width:'100%' }}>
                <div style={{ display: 'flex'}}>
                    <div style={{ flex: 3}}>
                        <p style={{fontWeight: '700',fontSize: 18}}>
                            История платежей
                        </p>
                    </div>
                    <div style={{ flex: 1}}>
                        <p style={{fontWeight: '700',fontSize: 18}}>
                            <img src={info}/>
                            <img src={calendar}/>
                        </p>
                    </div>
                </div>
                <div>
                   
                        {tableData.sort((a, b) => a.timeM > b.timeM ? 1:-1).map(
                            (item, i) => 
                            <div key={i}> 
                            <div style={{ display: 'flex' }}>
                                <div style={{ flex: 1 }}>
                                    <img src={credit}/>
                                </div>
                                <div style={{ flex: 9 }}>
                                    <p style={{fontWeight: '700',fontSize: '16px'}}>
                                        Погашение кредита
                                    </p>
                                    <p style={{fontWeight: '400',marginTop:'-15px',fontSize: '12px', color:'gray'}}>
                                        {item.loanName}
                                    </p>
                                </div>
                                <div style={{ flex: 4 }}>
                                    <p style={{fontWeight: '400',fontSize: '12px', color:'#35B879'}}>
                                        {item.amount}.00 ₸
                                    </p>
                                    <p style={{fontWeight: '400',marginTop:'-15px',fontSize: '12px', color:'gray'}}>
                                        {item.paymentDate.substring(0, 10)} <bp/>
                                        {item.paymentDate.substring(11, 16)}
                                    </p>
                                </div>
                            </div>
                            </div>
                        )}
                        {tableData.sort((a, b) => a.item > b.item ? 1:-1).map((item, index) =>(
                        <div key={index}>
                        </div>
                            ))}
                </div>
            </div>
        </div>
        ):(
            <p>loading</p>
        )}
        </div>
    )
}