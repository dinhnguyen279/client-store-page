import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "./Contact.css"
const Contact = () => {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [content, setContent] = useState("")

    const onChangeName = (e) => {
        setFullname(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePhone = (e) => {
        setPhone(e.target.value)
    }
    const onChangeContent = (e) => {
        setContent(e.target.value)
    }

    const dataSubmitGoogleSheet = {
        fullname: fullname,
        email: email,
        phone: phone,
        content: content
    }
    const saveGoogleSheet = {
        url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSd2SUQqIMP8FvHQn96_yT2TYr5YHCFFzG5g71vPLLsyk1pciw/formResponse",
        body: {

            "entry.1930305784": dataSubmitGoogleSheet.fullname,
            "entry.19587616": dataSubmitGoogleSheet.email,
            "entry.1411795444": dataSubmitGoogleSheet.phone,
            "entry.45765494": dataSubmitGoogleSheet.content
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault()
        axios.post(saveGoogleSheet.url, saveGoogleSheet.body, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => console.log(res))
    }
    return (
        <>
            <section className="py-3 bg-light mb-3 header-contact">
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
                            <h5>SPORT ZONE</h5>
                            <ul className='text-small p-t-30 list-contact'>
                                <li className='list-item'>55 Trần Văn Quang</li>
                                <li className='list-item'>Phường 10, Quận Tân Bình</li>
                                <li className='list-item'>Thành phố Hồ Chí Minh</li>
                                <li className='p-t-40'>Điện thoại: +84 082 995 4321</li>
                                <li className='list-item'>Email: sportzone@gmail.com</li>
                            </ul>

                        </div>
                        <div className='col-12 col-md-7'>
                            <h5>Điền giúp chúng tôi vài dòng</h5>
                            <form className='text-small p-t-30' onSubmit={onSubmitForm}>
                                <div className='form-input-contact'>
                                    <label>Tên (bắt buộc)*</label>
                                    <input className='input-contact ' type="text" name="fullname" value={fullname} onChange={onChangeName} />
                                </div>
                                <div className='form-input-contact'>
                                    <label>Email (bắt buộc)*</label>
                                    <input className='input-contact' type="text" name="email" value={email} onChange={onChangeEmail} />
                                </div>
                                <div className='form-input-contact'>
                                    <label>Số Điện Thoại</label>
                                    <input className='input-contact' type="text" name="phone" value={phone} onChange={onChangePhone} />
                                </div>
                                <div>
                                    <textarea
                                        onChange={onChangeContent}
                                        value={content}
                                        name="content"
                                        aria-required={true}
                                        aria-invalid={false}
                                        rows={5}
                                        className="textarea-contact"
                                        placeholder="Nội dung tư vấn"
                                    ></textarea>
                                </div>
                                <div className='contact-submit m-t-10'>
                                    <button type='submit' className='btn-contact'>
                                        Gửi
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