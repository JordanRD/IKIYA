import React, { useState, useEffect, useRef } from 'react'
import { Button, Dropdown, Form, } from 'react-bootstrap'
import { useHistory } from 'react-router'
import { getCategories, addProduct} from '../actions'
import AlertModal from '../components/alertModal'
export default function AddProductPage() {
    const [newProductInfo, setNewProductInfo] = useState({ id_category: 12, price: 0, description: '', name: '' })
    const [allCategory, setAllCategory] = useState([])
    const [newImages, setNewImages] = useState([])
    const [modalMessage,setModalMessage]=useState('')
    const fileRef = useRef()
    const history = useHistory()

    useEffect(() => {
        getCategories(data => setAllCategory(data))
    }, [])

    const handleFile = ({ target }) => {
        const allImage = [...newImages, ...target.files]
        setNewImages(allImage)
    }

    const handleChange = ({ target: { value, name } }) => {
        setNewProductInfo(p => ({ ...p, [name]: value }))
    }

    const handleSave = () => {
        if (!newProductInfo.description || !newProductInfo.name) return setModalMessage('all input can not be empty')
        if (newProductInfo.price <= 1000) return setModalMessage('price must be higher than 1,000 IDR')
        if (newImages.length <= 0) return setModalMessage('you should have at least 1 image')
        const formData = new FormData()
        newImages.forEach(item => {
            formData.append('IMG', item)
        })
        const dataWillBeSend = {
            newProduct: newProductInfo,
        }
        formData.append('productData', JSON.stringify(dataWillBeSend))
        addProduct(formData, err => {
            if (err) return setModalMessage(err)
            setModalMessage('success')
            setNewImages([])
            setNewProductInfo({ id_category: 12, price: 0, description: '', name: '' })
        })
    }
    // console.log(oldImages)
    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '4fr 5fr', height: '90vh', alignItems: 'center', gap: '20px', padding: '20px' }}>
                <div style={{ backgroundColor: 'gray', display: 'flex', maxHeight: '500px', flexWrap: 'wrap', gap: '10px', alignItems: 'center', padding: '20px', overflowY: 'scroll' }} >
                    {
                        newImages.map((item, index) => {
                            const selectedImage = URL.createObjectURL(item)
                            return (
                                <div key={index} style={{ height: '150px', position: 'relative' }}>
                                    <img style={{ height: '100%', objectFit: 'contain' }} src={selectedImage} alt="" />
                                    <Button onClick={() => setNewImages(newImages.filter((_, i) => i !== index))} size='sm' variant='danger' style={{ position: 'absolute', top: 0, right: 0, borderRadius: '0' }}>X</Button>
                                </div>
                            )
                        })
                    }
                    {
                        newImages.length < 5 &&
                        <div style={{ height: '150px', position: 'relative' }}>
                            <Button variant='light' onClick={() => fileRef.current.click()} style={{ height: '100%', width: '150px', fontSize: '50px', display: 'grid', placeItems: 'center', color: 'gray' }}>+</Button>
                            <input multiple onChange={handleFile} style={{ display: 'none', pointerEvents: 'none' }} ref={fileRef} type='file' accept='image/*' />
                        </div>
                    }
                </div>
                <div style={{ padding: '0 40px', display: 'flex', flexDirection: 'column', overflowY: 'scroll', maxHeight: '80vh', justifyContent: 'space-evenly', height: '100%' }}>

                    <Form >
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={newProductInfo.name} type="text" onChange={handleChange} name='name' placeholder="name" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.Con44trolInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={newProductInfo.price} type="number" onChange={handleChange} name='price' placeholder="price" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control style={{ minHeight: '50px', maxHeight: '150px' }} onChange={handleChange} name='description' value={newProductInfo.description} placeholder='description' as="textarea" rows={3} />
                        </Form.Group>
                        <Form.Group style={{ display: 'flex', gap: '20px', alignItems: 'center' }} controlId="exampleForm.ControlTeyxtarea1">
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                    Category
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {
                                        allCategory.map((item, idx) => (
                                            <Dropdown.Item key={idx} onClick={() => setNewProductInfo(p => ({ ...p, id_category: item.id_category }))}>{item.category}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                            <>{allCategory?.find(i => i?.id_category === newProductInfo?.id_category)?.category || ''}</>
                        </Form.Group>
                        <Form.Group style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} controlId="exampleForm.ControlTextasrea1">
                            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <Button onClick={() => history.replace('/')} variant='danger'>Cancel</Button>
                                <Button onClick={handleSave} variant='success'>Save</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
            </div>
            <AlertModal show={Boolean(modalMessage)} setShow={() => setModalMessage('')} message={modalMessage}/>
        </>
    )
}


