import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:2000/admin' })


export const getAllProductAdmin = async (allData, action) => {
    try {
        const { data } = await api.post('/getProduct', allData)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}

export const deleteProduct = async (id_product, action) => {
    try {
        await api.delete('/deleteProduct/' + id_product)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}
export const restoreProduct = async (id_product, action) => {
    try {
        await api.patch('/restoreProduct/' + id_product)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}


export const getAdminProductById = async (id_product, action) => {
    try {
        const { data } = await api.get('/getProduct/' + id_product);
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)

    }
}

export const editProduct = async (data, action) => {
    try {
        await api.post('/editProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}
export const addProduct = async (data, action) => {
    try {
        await api.post('/addProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
        action(errorMessage)
    }
}

export const addCategory = async (newCategory, action) => {
    try {
        const { data } = await api.post('/addCategory', newCategory)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}
export const deleteCategory = async (id_category, action) => {
    try {
        const { data } = await api.delete('/deleteCategory/' + id_category)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}

export const editCategory = async (item, action) => {
    try {
        const { data } = await api.patch('/editCategory', item)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}


export const getOrder = async ({ id_order_status, page, perPage, orderBy }, action) => {
    try {

        const { data } = await api.get('/orders/' + id_order_status, { params: { page, perPage, orderBy } })
        console.log(data)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)

    }
}

export const getStores = async (action) => {
    try {
        const { data } = await api.get('/stores');
        action(data.map(i => ({ ...i, stock: 0 })))
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)

    }
}

export const getStockData = async (pagination={},action) => {
    try {
        const { data } = await api.get('/getStock',{params: pagination});
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}

export const editStockData = async (newStockData, action) => {
    try {
        await api.patch('/editStock', newStockData);
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    } finally { action() }
}

export const deleteStockData = async (deletedData, action) => {
    try {
        await api.delete('/deleteStock', {params:deletedData});
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    } finally { action() }
}
export const addStockData = async (newData, action) => {
    try {
        await api.post('/addStock', newData);
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    } finally { action() }
}

export const getMoveStore= async(id_product,action) => {
    try {
        const { data } = await api.get('/getMoveProduct/' + id_product);
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}

export const moveStock = async (movedData, action) => {
    try {
        await api.patch('/movestock',movedData);
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
        action('move stock failed')
    }
}

export const getStoreDetails = async(pagination, action) => {
    try {
        const { data } = await api.get('/storeDetails/',{params: pagination});
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}
export const getStoreProductDetails = async(pagination, action) => {
    try {
        const { data } = await api.get('/storeProductDetails',{params: pagination});
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}

export const addNewStore = async (newStore, action) => {
    try {
        await api.post('/addStore',newStore);
        action();
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
        action('failed to add new store')
    }
}