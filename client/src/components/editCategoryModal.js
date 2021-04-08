import React, { useState } from 'react'
import { Modal, Form, Button, ButtonGroup } from 'react-bootstrap'
import { addCategory, deleteCategory, editCategory } from '../actions'
export default function EditCategoryModal({ show, setShow, allCategory, setAllCategory }) {
    const [newCategory,setNewCategory] =useState('')
    const handleEdit = editedCategory => {
        editCategory(editedCategory,setAllCategory)
    }
    const handleDelete = id_category => {
        deleteCategory(id_category,setAllCategory)
    }
    const handleAdd = () => {
        console.log(newCategory)
        if (newCategory) addCategory({category:newCategory}, data => {
            setNewCategory('')
            setAllCategory(data)
        })

    }
    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            size='sm'
        >
            <Modal.Header onClick={setShow} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: '400px', overflowY: 'scroll' }} >
                {allCategory.map((item, idx) => (
                    <CategoryRow handleDelete={handleDelete} handleEdit={handleEdit} item={item} key={idx} />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Form.Group style={{ display: 'flex', gap: '10px' }}>
                    <Form.Control value={newCategory} onChange={e=>setNewCategory(e.target.value)} type='text' placeholder='add category' />
                    <Button onClick={handleAdd} variant='success'>Add</Button>
                </Form.Group>
            </Modal.Footer>
        </Modal>
    )
}

function CategoryRow({ item = {}, handleEdit, handleDelete }) {
    const { category, id_category } = item
    const [edit, setEdit] = useState(false)
    const [editedCategory, setEditedCategory] = useState('')
    const handleSave = () => {
        if (editedCategory !== category && editedCategory) handleEdit({ id_category, category: editedCategory })
        setEdit(false)
    }
    if (edit) return (
        <Form.Group style={{ display: 'flex', gap: '10px', minHeight: '35px', alignItems: 'center' }}>
            <Form.Control value={editedCategory} onChange={e => setEditedCategory(e.target.value)} size='sm' />
            <ButtonGroup aria-label="Basic example">
                <Button onClick={() => setEdit(false)} size='sm' variant="danger">
                    <i className='fa fa-ban'></i>
                </Button>
                <Button size='sm' onClick={handleSave} variant="success">
                    <i className='fa fa-save'></i>
                </Button>
            </ButtonGroup>
        </Form.Group>
    )

    return (
        <Form.Group style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', minHeight: '35px', alignItems: 'center' }}>
            <Form.Label>{category}</Form.Label>
            <ButtonGroup aria-label="Basic example">
                <Button onClick={() => handleDelete(id_category)} size='sm' variant="danger">
                    <i className='fa fa-trash-alt'></i>
                </Button>
                <Button onClick={() => {
                    setEdit(true)
                    setEditedCategory(category)
                }} size='sm' variant="success">
                    <i className='fa fa-edit'></i>
                </Button>
            </ButtonGroup>
        </Form.Group>
    )
}