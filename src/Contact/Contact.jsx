import React from 'react'
import "./Contact.css"
const Contact = () => {
    return (
        <section className='bg-light contact-main p-l-55 p-r-55 p-t-65 p-b-50'>
            <div className="container">
                <div className='row'>
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
                                <lable className="text-uppercase">Tên (bắt buộc)*</lable>
                                <input className='input-contact' type="text" name="name" />
                            </div>
                            <div className='form-input-contact'>
                                <lable className="text-uppercase">Email (bắt buộc)*</lable>
                                <input className='input-contact' type="text" name="email" />
                            </div>
                            <div className='form-input-contact'>
                                <lable className="text-uppercase">Số Điện Thoại</lable>
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
                                <button type='submit' className='btn-contact'>
                                    <i class="fa fa-arrow-circle-right text-gray-100"></i>
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
    )
}

export default Contact;