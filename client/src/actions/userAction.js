import api from '../httpService';

export const login = ({ userData, check }, action) => async (dispatch) => {
    try {
        const { data: payload } = await api('/user').post('/login', userData)
        if (check) {
            localStorage.setItem('refresh_token', payload.refresh_token)
            localStorage.setItem('token', payload.token)
        } else {
            sessionStorage.setItem('refresh_token', payload.refresh_token)
            sessionStorage.setItem('token', payload.token)
        }
        delete payload.token
        delete payload.refresh_token
        dispatch({ type: 'LOG_IN', payload })
        // getAccessToken()
    } catch (error) {
        const message = error?.response?.data || error
        console.log(error.response)
        action(message)
    }
}
export const keepLogin = () => async (dispatch) => {
    try {
        const { data: payload } = await api('/user').post('/keepLogin')
        console.log(payload)
        dispatch({ type: 'LOG_IN', payload })
    } catch (error) {
        const message = error?.response?.data || error
        console.log(message)
        dispatch({ type: 'LOG_OUT' })
    }
}

export const getAccessToken = async (dispatch, username) => {
    try {
        const refresh_token = sessionStorage.refresh_token || localStorage.refresh_token
        if (refresh_token) {
            console.log('Updating token')
            if (!refresh_token) return
            const { data } = await api('/auth').post('/getAccessToken', {}, { headers: { refresh_token } })
            console.log(data.token)
            if (localStorage.token) localStorage.token = data.token
            if (sessionStorage.token) sessionStorage.token = data.token
            if (!username) dispatch(keepLogin())
        }
    } catch (error) {
        dispatch(logout())
    }
}

export const logout = () => async (dispatch) => {
    try {
        const refresh_token = sessionStorage.refresh_token || localStorage.refresh_token
        if (refresh_token) {
            await api('/user').delete('/logout', {}, { headers: { refresh_token } })
        }
    } catch (error) {
        console.log(error?.response?.data || error)
    } finally {
        dispatch({ type: 'LOG_OUT' })
    }
}

export const checkToken = async (token, action) => {
    try {
        await api('/user').post('/checkToken/' + token)
        action()
    } catch (error) {
        const errorMsg = error?.response?.data
        const messages = {
            JsonWebTokenError: 'Invalid link',
            TokenExpiredError: 'Expired link'
        }
        action(messages[errorMsg] || 'Some error occurred please try again later')
    }
}

export const resetRequest = async (userData, cb) => {
    try {
        const { data } = await api('/user').post('/forgot', userData)
        cb(false, data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        cb(errorMessage)
    }
}


export const resetPassword = async (allData, cb) => {
    try {
        await api('/user').patch('/reset', allData)
        cb(false)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        cb(errorMessage)
    }
}

export const postAddress = async (addressData, action) => {
    try {
        const { data } = await api('/user').post('/addAddress', addressData)
        console.log(data)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}
export const deleteAddress = async (id_address, action) => {
    try {
        const { data } = await api('/user').delete('/deleteAddress/' + id_address)
        console.log(data)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}

export const registerUser = async (userData, action) => {
    try {
        await api('/user').post('/register', userData);
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}

export const verifyUser = async (token, action) => {
    try {
        console.log(token)
        await api('/user').patch('/verify', { token })
        console.log(token)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}

export const changePassword = async (data, action) => {
        try {
        // console.log(token)
            await api('/user').patch('/changePassword', data)
        // console.log(token)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}

export const sendVerificationEmail = async (username, action) => {
    try {
        const { data } = await api('/user').post('/resend', { username })
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action('Fail to send email verification please try again later')
    }
}


export const editAddress = async (addressData, action) => {
    try {
        await api('/user').patch('/editAddress', addressData)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action('Fail to edit address please try again later')
    }
}


export const uploadProfilePicture = async (formData, action) => {
    try {
        await api('/user').post('/uploadProfilePicture', formData)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
    } finally {
        action()
    }
}

export const deleteProfilePicture = async (id_user, action) => {
    try {
        await api('/user').delete('/deleteProfilePicture/' + id_user)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
    } finally {
        action()
    }
}

export const deactivateUser = async (action) => {
    try {
        await api('/user').patch('/deactivate')
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(true)
    }
}

export const changeEmail = async(email,action)=>{
    try {
        await api('/user').patch('/changeEmail',{email})
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}