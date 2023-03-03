import React from 'react'
import { Button } from 'react-bootstrap'

const EditProfileUser = (props) => {
    const openEditUser = props.openEditUser
    return (
        <form className='form-edit-user' action=''>
            <header className="text-center">
                <h2 className="h4 text-uppercase text-dark">Cập nhật thông tin</h2>
            </header>
            <div className='input-edit-user'>
                <div className='row'>
                    <div className='col-md-12 input-text'>
                        <input type="text" name="fullName" id="" placeholder='Họ và Tên' className='input-focus' />
                    </div>
                    <div className='col-md-12 input-text'>
                        <input type="text" name="phone" id="" placeholder='Số điện thoại' />
                    </div>
                    <div className='col-md-12 input-text'>
                        <input type="text" name="address" id="" placeholder='Địa chỉ' />
                    </div>
                    <div className='col-md-12 input-text'>
                        <input type="text" name="Email" id="" placeholder='Email' />
                    </div>
                    <div className='col-md-12 input-text'>
                        <input type="text" name="password" id="" placeholder='Mật khẩu' />
                    </div>
                    <Button className='w-50 m-auto' type='button' >
                        Lưu
                    </Button>
                </div>
                <button className='close-popup' onClick={openEditUser}>
                    x
                </button>
            </div>

        </form>
    )
}

export default EditProfileUser