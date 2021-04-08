import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import Canceled from './canceled'
import Completed from './completed'
import Pending from './pending'
import Delivery from './delivery'
import Confirmed from './confirmed'
import AdminNavs from '../../components/adminNavs'
export default function Orders() {
    const { path } = useRouteMatch()
    return (
        <>
            <AdminNavs />
            <Switch>
                <Route path={path + '/pending'} exact component={Pending} />
                <Route path={path + '/confirmed'} exact component={Confirmed} />
                <Route path={path + '/delivery'} exact component={Delivery} />
                <Route path={path + '/completed'} exact component={Completed} />
                <Route path={path + '/canceled'} exact component={Canceled} />
            </Switch>
        </>
    )
}
