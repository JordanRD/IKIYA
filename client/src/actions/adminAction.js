import api from '../httpService';


export const getAllProductAdmin = async (allData, action) => {
    try {
        const { data } = await api('/admin').post('/getProduct', allData)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}

export const deleteProduct = async (id_product, action) => {
    try {
        await api('/admin').delete('/deleteProduct/' + id_product)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}
export const restoreProduct = async (id_product, action) => {
    try {
        await api('/admin').patch('/restoreProduct/' + id_product)
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}


export const getAdminProductById = async (id_product, action) => {
    try {
        const { data } = await api('/admin').get('/getProduct/' + id_product);
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)

    }
}

export const editProduct = async (data, action) => {
    try {
        await api('/admin').post('/editProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}
export const addProduct = async (data, action) => {
    try {
        await api('/admin').post('/addProduct', data, { headers: { 'Content-Type': 'multipart/form-data' } })
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
        action(errorMessage)
    }
}

export const addCategory = async (newCategory, action) => {
    try {
        const { data } = await api('/admin').post('/addCategory', newCategory)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}
export const deleteCategory = async (id_category, action) => {
    try {
        const { data } = await api('/admin').delete('/deleteCategory/' + id_category)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}

export const editCategory = async (item, action) => {
    try {
        const { data } = await api('/admin').patch('/editCategory', item)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)
    }
}


export const getOrder = async ({ id_order_status, page, perPage, orderBy,search }, action) => {
    try {

        const { data } = await api('/admin').get('/orders/' + id_order_status, { params: { page, perPage, orderBy, search } })
        console.log(data)
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)

    }
}

export const getStores = async (action) => {
    try {
        const { data } = await api('/admin').get('/stores');
        action(data.map(i => ({ ...i, stock: 0 })))
    } catch (error) {
        const errorMessage = error?.response?.data || error
        console.error(errorMessage)

    }
}

export const getStockData = async (pagination={},action) => {
    try {
        const { data } = await api('/admin').get('/getStock',{params: pagination});
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}

export const editStockData = async (newStockData, action) => {
    try {
        await api('/admin').patch('/editStock', newStockData);
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    } finally { action() }
}

export const deleteStockData = async (deletedData, action) => {
    try {
        await api('/admin').delete('/deleteStock', {params:deletedData});
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    } finally { action() }
}
export const addStockData = async (newData, action) => {
    try {
        await api('/admin').post('/addStock', newData);
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    } finally { action() }
}

export const getMoveStore= async(id_product,action) => {
    try {
        const { data } = await api('/admin').get('/getMoveProduct/' + id_product);
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}

export const moveStock = async (movedData, action) => {
    try {
        await api('/admin').patch('/movestock',movedData);
        action()
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
        action('move stock failed')
    }
}

export const getStoreDetails = async(pagination, action) => {
    try {
        const { data } = await api('/admin').get('/storeDetails/',{params: pagination});
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}
export const getStoreProductDetails = async(pagination, action) => {
    try {
        const { data } = await api('/admin').get('/storeProductDetails',{params: pagination});
        action(data)
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
    }
}

export const addNewStore = async (newStore, action) => {
    try {
        await api('/admin').post('/addStore',newStore);
        action();
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
        action('failed to add new store')
    }
}

export const deleteStore = async (id_store, action) => {
    try {
        await api('/admin').delete('/deleteStore/'+id_store);
        action();
    } catch (error) {
        const errorMessage = error?.response?.data || error;
        console.error(errorMessage)
        action(errorMessage)
    }
}