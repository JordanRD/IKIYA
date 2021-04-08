import React from 'react'
import { Switch, Route, useRouteMatch, Redirect } from 'react-router'
import {useSelector} from 'react-redux'
import StockNavs from '../../components/stockNavs'
import AddStockPage from './addStockPage'
import MoveStockPage from './moveStockPage'
import ManageStore from './manageStore'
export default function Orders() {
    const { path } = useRouteMatch()
    const { id_role } = useSelector(state => state.user)
    if(id_role!==2)return <Redirect to='/' />
    return (
        <>
            <StockNavs />
            <Switch>
                <Route path={path + '/add'} exact component={AddStockPage}  />
                <Route path={path + '/move'} exact component={MoveStockPage} />
                <Route path={path + '/stores'} exact component={ManageStore} />
            </Switch>
        </>
    )
}
