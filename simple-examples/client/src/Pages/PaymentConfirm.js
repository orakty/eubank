import React from 'react'
import { Button } from 'react-bootstrap';
import credit_pay_icon from '../assets/credit_pay_icon.svg' 
import ok_icon from '../assets/ok.svg' 
import renew from '../assets/renew.svg' 

import {useHistory} from 'react-router-dom'

export const PaymentConfirm=()=>{
    const history = useHistory()
    return(
        
        <div style={{ textAlign:'center'}} className="container">
            <div style={{ display: 'flex', marginTop: 100}}>
                <div style={{ flex: 1}}>
                    <img src={ok_icon}/>
                </div>
            </div>
            <div style={{ display: 'flex', textAlign: 'center', marginTop:20}}>
                <div style={{ flex: 10}}>
                    <p style={{fontWeight: '700',fontSize: 24}}>
                        Спасибо!
                    </p>
                    <p style={{ marginTop: -8, fontSize: 12, color:'#545863'}}>
                        Ваш перевод принят
                    </p>
                    {/* <p style={{fontSize: 32}}>
                        10 000.00 ₸
                    </p> */}
                </div>
            </div>
            <div style={{ background: 'linear-gradient(129.08deg, #9E91E3 0%, #93A6E9 100%)', borderRadius: 10, padding: 10, marginRight: 10, minHeight:60  }}>
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
                        
                    </div>
                </div>
            </div>
            <Button size="xxl" style={{backgroundColor:'white',textAlign: 'center', minHeight:80, marginTop: 20}} variant="outline-warning" onClick={() => history.push('/loansPage')}> 
                <div style={{ display: 'flex'}}>
                    <div style={{ flex: 1}}>
                        <img src={renew}/>
                        <p style={{  fontSize: 12, color:'#545863'}}>
                            Повторить
                        </p>
                    </div>
                </div>
            </Button>
            <Button style={{background:'#9C81E8', minWidth:'100%', minHeight:50, marginTop:20, borderRadius:10}} onClick={()=>history.push('/')}> 
                <div style={{ display: 'flex', textAlign: 'center', marginTop:5}}>
                    <div style={{ flex: 10}}> 
                        <p>Продолжить</p>
                    </div> 
                    
                </div>
            </Button>
        </div>
    )
}