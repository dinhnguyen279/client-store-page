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
                    <h1 className="section-header">Contact</h1>
                    <div className='row p-t-50'>

                        <div className='col-12 col-md-7'>
                            <h5>Điền giúp chúng tôi vài dòng</h5>
                            <form className='text-small p-t-30 text-uppercase' onSubmit={onSubmitForm}>
                                <div className='form-input-contact'>
                                    <label>Tên (bắt buộc)*</label>
                                    <input className='input-contact ' type="text" name="fullname" value={fullname} onChange={onChangeName} />
                                </div>
                                <div className='form-input-contact'>
                                    <label>Email (bắt buộc)*</label>
                                    <input className='input-contact ' type="text" name="email" value={email} onChange={onChangeEmail} />
                                </div>
                                <div className='form-input-contact'>
                                    <label>Số Điện Thoại</label>
                                    <input className='input-contact ' type="text" name="phone" value={phone} onChange={onChangePhone} />
                                </div>
                                <div className=''>
                                    <textarea
                                        onChange={onChangeContent}
                                        value={content}
                                        name="content"
                                        aria-required={true}
                                        aria-invalid={false}
                                        rows={10}
                                        className="textarea-contact"
                                        placeholder="NỘI DUNG CẦN TƯ VẤN"
                                    />
                                </div>
                                <div className='contact-submit m-t-10'>
                                    {/* <button type='submit' className='btn-contact'>
                                        Gửi
                                    </button> */}
                                    <button className="btn btn-warning send-button" id="submit" type="submit" value="SEND">
                                        <div className="alt-send-button">
                                            <i className="fa fa-paper-plane"></i><span className="send-text">Gửi</span>
                                        </div>

                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className='col-12 col-md-5 contact-first'>
                            <h5>SPORT ZONE</h5>
                            <ul className='text-small p-t-30 list-contact'>
                                <li className='list-item'> <i className="fa fa-map-marker fa-2x" /> <span className="contact-text place">TP. Hồ Chí Minh</span> </li>
                                <li className='list-item'> <i className="fa fa-phone fa-2x" /><span className="contact-text phone">
                                    <a
                                        href="tel:0829954124"
                                        target="_self"
                                        className="contact-us"
                                    >
                                        Điện thoại: +84 082 995 4321
                                    </a>
                                </span></li>
                                <li className='list-item'><i className="fa fa-envelope fa-2x" /><span className="contact-text gmail"><a href="mailto:sportzone@gmail.com" title="Gửi đến email của shop">Email: sportzone@gmail.com</a></span></li>
                            </ul>
                            {/* <ul className="social-media-list">
                                <li><a href="#" target="_blank" className="contact-icon">
                                    <i className="fa fa-github" aria-hidden="true"></i></a>
                                </li>
                                <li><a href="#" target="_blank" className="contact-icon">
                                    <i className="fa fa-codepen" aria-hidden="true"></i></a>
                                </li>
                                <li><a href="#" target="_blank" className="contact-icon">
                                    <i className="fa fa-twitter" aria-hidden="true"></i></a>
                                </li>
                                <li><a href="#" target="_blank" className="contact-icon">
                                    <i className="fa fa-instagram" aria-hidden="true"></i></a>
                                </li>
                            </ul> */}

                            {/* <div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div> */}
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default Contact;