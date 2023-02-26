import React from 'react'
import { Link } from 'react-router-dom';
import "./Contact.css"
const Contact = () => {
    return (
        <>
            <section className="py-3 bg-light mb-3 m-t-160">
                <div className="container">
                    <ol className="breadcrumb justify-content-start">
                        <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Liên hệ</li>
                    </ol>
                </div>
            </section>
            <section className='contact-main p-l-55 p-r-55 p-b-50'>
                <div className="container">
                    <div className='row p-t-50'>
                        <div className='col-12 col-md-5 contact-first'>
                            <h5>ACCESSORY STORE</h5>
                            <ul className='text-small p-t-30 list-contact'>
                                <li className='list-item'>55 Trần Văn Quang</li>
                                <li className='list-item'>Phường 10, Quận Tân Bình</li>
                                <li className='list-item'>Thành phố Hồ Chí Minh</li>
                                <li className='p-t-40'>Điện thoại: +84 082 995 4321</li>
                                <li className='list-item'>Email: thuantran347@gmail.com</li>
                            </ul>

                        </div>
                        <div className='col-12 col-md-7'>
                            <h5>Điền giúp chúng tôi vài dòng</h5>
                            <form className='text-small p-t-30'>
                                <div className='form-input-contact'>
                                    <lable>Tên (bắt buộc)*</lable>
                                    <input className='input-contact' type="text" name="name" />
                                </div>
                                <div className='form-input-contact'>
                                    <lable>Email (bắt buộc)*</lable>
                                    <input className='input-contact' type="text" name="email" />
                                </div>
                                <div className='form-input-contact'>
                                    <lable>Số Điện Thoại</lable>
                                    <input className='input-contact' type="text" name="phone" />
                                </div>
                                <div>
                                    <textarea
                                        name="your-message"
                                        aria-required={true}
                                        aria-invalid={false}
                                        rows={5}
                                        className="textarea-contact"
                                        placeholder="Nội dung tư vấn"
                                    ></textarea>
                                </div>
                                <div className='contact-submit m-t-10'>
                                    <button type='submit' className='btn-contact'>Gửi
                                    </button>
                                    <a
                                        href="tel:0829954124"
                                        target="_self"
                                        className="contact-us"
                                    >
                                        <i className='fa fa-phone'></i>  LIÊN HỆ CHÚNG TÔI
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Contact;