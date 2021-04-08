import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:2000/user' })


export const login = ({userData,check}, action) => async (dispatch) => {
    try {
        const { data: payload } = await api.post('/login', userData)
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
        const { data: payload } = await api.post('/keepLogin', { token: localStorage.token||sessionStorage.token })
        console.log(payload)
        dispatch({ type: 'LOG_IN', payload })
    } catch (error) {
        const message = error?.response?.data || error
        console.log(message)
        dispatch({ type: 'LOG_OUT' })
    }
}
export const logout = () => ({ type: 'LOG_OUT' })


export const resetRequest = async (userData, cb) => {
    try {
        const { data } = await api.post('/forgot', userData)
        cb(false, data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        cb(errorMessage)
    }
}


export const resetPassword = async (allData, cb) => {
    try {
        await api.patch('/reset', allData)
        cb(false)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        cb(errorMessage)
    }
}

export const postAddress = async (addressData, action) => {
    try {
        const { data } = await api.post('/addAddress', addressData)
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
        const { data } = await api.delete('/deleteAddress/' + id_address)
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
        await api.post('/register', userData);
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}

export const verifyUser = async (token, action) => {
    try {
        await api.patch('/verify', { token })
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action(errorMessage)
    }
}

export const sendVerificationEmail = async (username, action) => {
    try {
        const {data }=await api.post('/resend',{username})
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action('Fail to send email verification please try again later')
    }
}


export const editAddress = async (addressData, action) => {
    try {
        await api.patch('/editAddress', addressData)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
        action('Fail to edit address please try again later')
    }
}


export const uploadProfilePicture = async (formData, action) => {
    try {
        await api.post('/uploadProfilePicture', formData)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
    } finally {
        action()
    }
}

export const deleteProfilePicture = async (id_user, action) => {
    try {
        await api.delete('/deleteProfilePicture/' + id_user)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.log(errorMessage)
    } finally {
        action()
    }
}