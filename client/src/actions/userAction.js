import api from '../httpService';

export const login = ({userData,check}, action) => async (dispatch) => {
    try {
        const { data: payload } = await api('/user').post('/login', userData)
        if (check) {
            localStorage.setItem('token', payload.token)
        } else {
            sessionStorage.setItem('token', payload.token)
        }
        delete payload.token
        dispatch({ type: 'LOG_IN', payload })
    } catch (error) {
        const message = error?.response?.data || error
        console.log(message)
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
export const logout = () => ({ type: 'LOG_OUT' })

export const checkToken = async (token,action) => {
    try {
        await api('/user').post('/checkToken/' + token)
        action()
    } catch (error) {
        const errorMsg = error?.response?.data
        const messages = {
            JsonWebTokenError: 'Invalid link',
            TokenExpiredError:'Expired link'
        }
        action(messages[errorMsg]||'Some error occurred please try again later')
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
        await api('/user').patch('/verify', { token })
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}

export const sendVerificationEmail = async (username, action) => {
    try {
        const {data }=await api('/user').post('/resend',{username})
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