import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import { AuthPage } from './Pages/AuthPage'
import { CreatePage } from './Pages/CreatePage'
import { DetailPage } from './Pages/DetailsPage'
import { LinksPage } from './Pages/LinksPage'
import {CardsPage} from './Pages/CardsPage'
import { LoansPage } from './Pages/LoansPage'
import { PaymentConfirm } from './Pages/PaymentConfirm'

export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
        <Switch>
            <Route path='/links' exact>
                <LinksPage />
            </Route>
            <Route path='/loansPage' exact>
                <LoansPage />
            </Route>
            <Route path='/create' exact>
                <CreatePage />
            </Route> 
            <Route path='/details/:id'>
                <DetailPage />
            </Route>
            <Route path='/cards'>
                <CardsPage />
            </Route>
            <Route path='/PaymentConfirm'>
                <PaymentConfirm />
            </Route>
            <Redirect to="/create"/>
        </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}