
import React, { useEffect, useCallback, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, } from 'react-router'
import { getAccessToken, } from './actions'
import Navigation from './components/navigation'
import Home from './pages/home'
import Login from './pages/login'
import NotFound from './pages/notFound'
import Cart from './pages/cart'
import ProductDetail from './pages/productDetail'
import ForgotPasswordPage from './pages/forgotPasswordPage'
import Profile from './pages/profile'
import Checkout from './pages/checkout'
import Payment from './pages/payment'
import History from './pages/history'
import AdminHome from './pages/adminHome'
import AdminNavigation from './components/adminNavigation'
import EditProductPage from './pages/editProductPage'
import Register from './pages/register'
import Orders from './pages/orders'
import AddProductPage from './pages/addProductPage'
import Verification from './pages/verification'
import Stock from './pages/stock'
import WishList from './pages/wishlist'
export default function App() {
    const { username, id_role } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const timeRef = useRef()
    const refreshAccessToken = useCallback(() => {
        getAccessToken(dispatch, username)
        timeRef.current = setTimeout(() => {
            refreshAccessToken()
        }, 60000 * 2)
    }, [username, dispatch])

    useEffect(() => {
        if ((localStorage.refresh_token || sessionStorage.refresh_token)) {
            refreshAccessToken()
        }
        return () => {
            if (timeRef.current) clearTimeout(timeRef.current)
        }
    }, [refreshAccessToken])



    if (id_role === 2) return (
        <>
            <AdminNavigation />
            <Switch>
                <Route path='/' component={AdminHome} exact />
                <Route path='/stock' component={Stock} />
                <Route path='/edit/:id_product' component={EditProductPage} />
                <Route path='/login' component={Login} />
                <Route path='/orders' component={Orders} />
                <Route path='/add' component={AddProductPage} />
                <Route path='*' component={NotFound} />
            </Switch>
        </>
    )

    if (id_role === 1) return (
        <>
            <Navigation />
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/cart' component={Cart} />
                <Route path='/payment/:id_order' component={Payment} />
                <Route path='/profile' component={Profile} />
                <Route path='/checkout' component={Checkout} />
                <Route path='/verify/:token' component={Verification} />
                <Route path='/wishlist' component={WishList} />
                <Route path='/history' component={History} />
                <Route path='/detail/:id_product' component={ProductDetail} />
                <Route path='*' component={NotFound} />
            </Switch>
        </>
    )

    return (
        <>
            <Navigation />
            <Switch>
                <Route path='/' component={Home} exact />
                <Route path='/login' component={Login} />
                <Route path='/verify/:token' component={Verification} />
                <Route path='/register' component={Register} />
                <Route path='/detail/:id_product' component={ProductDetail} />
                <Route path='/forgot/:token' component={ForgotPasswordPage} />
                <Route path='*' component={NotFound} />
            </Switch>
        </>
    )
}
