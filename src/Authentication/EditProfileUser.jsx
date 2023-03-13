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
                        <div className='col-md-12 input-text position-relative'>
                            <input className='form-input-user' type="text" name="fullName" placeholder=" " />
                            <label className="text-small text-uppercase form-label" htmlFor="Fullname">Họ và Tên</label>
                        </div>
                        <div className='col-md-12 input-text position-relative'>
                            <input className='form-input-user' type="text" name="Email" placeholder=' ' />
                            <label className="text-small text-uppercase form-label" htmlFor="Email">Email</label>
                        </div>
                        <div className='col-md-12 input-text position-relative'>
                            <input className='form-input-user' type="text" name="password" placeholder=' ' />
                            <label className="text-small text-uppercase form-label" htmlFor="password">Mật khẩu</label>
                        </div>
                        <div className='col-md-12 input-text position-relative'>
                            <input className='form-input-user' type="text" name="address" placeholder=' ' />
                            <label className="text-small text-uppercase form-label" htmlFor="address">Địa chỉ</label>
                        </div>
                        <div className='col-md-12 input-text position-relative'>
                            <input className='form-input-user' type="text" name="phone" placeholder=' ' />
                            <label className="text-small text-uppercase form-label" htmlFor="phone">Số điện thoại</label>
                        </div>
                        <div className='col-md-12'>
                            <Button className='w-50' type='button' >
                                Lưu thay đổi
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