import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const EditProfileUser = (props) => {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" className='m-auto'>
                    <h2 className="h4 text-uppercase text-dark">Cập nhật thông tin</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='input-edit-user'>
                    <div className='row'>
                        <div className='col-md-12 input-text'>
                            <label className="text-small text-uppercase" htmlFor="Fullname">Họ và Tên:</label>
                            <input type="text" name="fullName" id="" placeholder='Họ và Tên' />
                        </div>
                        <div className='col-md-12 input-text'>
                            <label className="text-small text-uppercase" htmlFor="phone">Số điện thoại:</label>
                            <input type="text" name="phone" id="" placeholder='Số điện thoại' />
                        </div>
                        <div className='col-md-12 input-text'>
                            <label className="text-small text-uppercase" htmlFor="address">Địa chỉ:</label>
                            <input type="text" name="address" id="" placeholder='Địa chỉ' />
                        </div>
                        <div className='col-md-12 input-text'>
                            <label className="text-small text-uppercase" htmlFor="Email">Email:</label>
                            <input type="text" name="Email" id="" placeholder='Email' />
                        </div>
                        <div className='col-md-12 input-text'>
                            <label className="text-small text-uppercase" htmlFor="password">Mật khẩu:</label>
                            <input type="text" name="password" id="" placeholder='Mật khẩu' />
                        </div>
                        <div className='col-md-12'>
                            <Button className='w-50' type='button' >
                                Lưu
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='danger' onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProfileUser