import React from 'react'
import { Button, Modal, } from 'react-bootstrap'

export default function ConfirmationModal({ show, handleSubmit, setShow,message, title='confirmation' }) {

    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header onClick={setShow} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant='success' onClick={handleSubmit}>Yes</Button>
                <Button variant='danger' onClick={setShow}>No</Button>
            </Modal.Footer>
        </Modal>
    )
}
