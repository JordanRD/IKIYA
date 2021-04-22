import React,{useState} from 'react'
import { Modal, Form, Button ,InputGroup} from 'react-bootstrap'

export default function ChangePasswordModal({ show, setShow, message, handleSave, handleChange, value }) {
    const[visible1,setVisible1]=useState(false)
    const[visible2,setVisible2]=useState(false)
    const onChange = ({ target: { name, value } }) => handleChange(p => ({ ...p, [name]: value }))
    return (
        <Modal
            show={show}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header onClick={setShow} closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Change Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form>
                    <Form.Group controlId="dfefwfwfe">
                        <Form.Label>Old Password</Form.Label>
                        <InputGroup className="mb-3">
                        <Form.Control value={value.oldPassword} onChange={onChange} name='oldPassword' type={visible1?'text':"password"} placeholder="Enter old password" />
                            <InputGroup.Append>
                                <Button onClick={() => setVisible1(p => !p)} variant="outline-secondary">
                                    {visible1 ?
                                        <i className='fa fa-eye-slash'></i> :
                                        <i className='fa fa-eye'></i>
                                    }
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="dfefwf4wfe">
                        <Form.Label>New Password</Form.Label>
                        <InputGroup className="mb-3">
                                    <Form.Control value={value.password} onChange={onChange} name='password' type={visible2?'text':"password"} placeholder="Enter password" />
                            <InputGroup.Append>
                                <Button onClick={() => setVisible2(p => !p)} variant="outline-secondary">
                                    {visible2 ?
                                        <i className='fa fa-eye-slash'></i> :
                                        <i className='fa fa-eye'></i>
                                    }
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>

                    </Form.Group>
                    <Form.Group controlId="dfefwf3wfe">
                        <Form.Control value={value.confirmPassword} onChange={onChange} name='confirmPassword' type={visible2?'text':"password"} placeholder="Confirm password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Text style={{ color: 'red' }}>
                            {message}
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave} variant='success'>Change Password</Button>
            </Modal.Footer>
        </Modal>
    )
}
