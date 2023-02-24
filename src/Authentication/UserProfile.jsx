import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Image from '../Share/img/Image'
import "./Auth.css"
const UserProfile = () => {
    const [active, setActive] = useState('Overview')

    const handlerActive = (value) => {
        setActive(value)
    }

    return (
        <div className="container-fluid main-profile p-l-55 p-r-55 p-t-160 p-b-50">
            <div className="card-profile">
                <div className="row" style={{ margin: "auto" }}>
                    <div className="col-md-2" style={{ width: "150px", margin: "auto" }}>
                        <img src={Image.userprofile} style={{ width: "100%" }} className="img-fluid rounded-circle img-profile" alt="Profile Picture" />
                        <i class="fa fa-edit" aria-hidden="true"></i>
                    </div>
                    <div className='col-md-10 name-profile' style={{ margin: "auto" }}>
                        <h1>User Name</h1>
                        <p>Dev : Client</p>
                    </div>
                </div>
                <div className='row p-t-30' style={{ margin: "auto" }}>
                    <div className="list-profile">
                        <div className='m-r-10 btn-detail' style={active === 'Overview' ? { background: '#6e00ff' } : { background: 'none', color: "black" }} >
                            <button data-toggle="collapse" data-target="#overview" className="link-profile" onClick={() => handlerActive("Overview")}
                            ><i className="m-r-10 fa fa-home" style={{ fontSize: "20px" }} aria-hidden="true" /> Overview</button>
                        </div>
                        <div className='m-r-10 btn-detail' style={active === 'Notes' ? { background: '#6e00ff' } : { background: 'none', color: "black" }}>
                            <button data-toggle="collapse" data-target="#notes" className="link-profile" onClick={() => handlerActive("Notes")}
                            ><i className="m-r-10 fa fa-sticky-note" style={{ fontSize: "20px" }} aria-hidden="true" /> Notes</button>
                        </div>
                        <div className='btn-detail' style={active === 'History' ? { background: '#6e00ff' } : { background: 'none', color: "black" }}>
                            <button data-toggle="collapse" data-target="#history" className="link-profile" onClick={() => handlerActive("History")}
                            ><i className="m-r-10 fa fa-history" style={{ fontSize: "20px" }} aria-hidden="true" /> History</button>
                        </div>
                    </div>
                </div>
            </div >

            <div className='card-profile m-t-40 collapse' id='overview'>
                <div className='card-title d-flex justify-content-between'>
                    <h3 className='title-text'>Tất cả thông tin người dùng</h3>
                    <button className='btn btn-info rounded' type='button'>
                        <i className="fa fa-edit" aria-hidden="true"></i> Edit
                    </button>
                </div>
                <div className='row'>
                    <div className='col-md-6 icon-detail d-flex align-items-center'>
                        <i className='fa fa-envelope' aria-hidden="true"></i>
                        <div className='title-text'>
                            {"tdinhnguyen279@gmail.com"}
                            <p>Địa chỉ email</p>
                        </div>
                    </div>
                    <div className='col-md-6 icon-detail d-flex align-items-center'>
                        <i className="fa fa-mobile" aria-hidden="true"></i>
                        <div>
                            {"+ 84 0829954124"}
                            <p>Số điện thoại</p>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 icon-detail d-flex align-items-center'>
                        <i className='fa fa-birthday-cake' aria-hidden="true"></i>
                        <div>
                            {"27 tháng 09 2001"}
                            <p>22 tuổi</p>
                        </div>
                    </div>
                    <div className='col-md-6 icon-detail d-flex align-items-center'>
                        <i className="fa fa-code" aria-hidden="true"></i>
                        <div>
                            {"191A010009"}
                            <p>Mã số sinh viên</p>
                        </div>
                    </div>
                </div>

                <hr className='line-page' />

                <div className='row'>
                    <div className='col-md-12 icon-detail d-flex align-items-center'>
                        <i className='fa fa-location-arrow' aria-hidden="true"></i>
                        <div className='title-text'>
                            {"81, Nguyễn Bá Tước, phường 11, quận Tân Bình, HCM"}
                            <p>Vị trí</p>
                        </div>
                    </div>
                    <div className='col-md-12 icon-detail d-flex align-items-center'>
                        <i className="fa fa-address-book" aria-hidden="true"></i>
                        <div className='title-text'>
                            {"Remote, Fulltime, Part-time, Internship, Freelance"}
                            <p>Công việc đang làm</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='card-profile m-t-40 collapse' id='notes'>
                <h3 className='card-title'>Notes</h3>
                <p className="">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut dolor maxime vero fugiat, excepturi, cumque similique ipsam temporibus, alias at quibusdam quae magnam suscipit quia. Nemo tenetur cupiditate possimus repudiandae?</p>
            </div>

            <div className='card-profile m-t-40 collapse' id='history'>
                <h3 className='card-title title-text '>Lịch sử mua hàng</h3>
                <div className="table-responsive pt-5 pb-5">
                    <table className="table">
                        <thead className="bg-light">
                            <tr className="text-center">
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">ID Order</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">ID User</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Name</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Phone</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Address</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Total</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Delivery</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Status</strong></th>
                                <th className="border-0" scope="col"> <strong className="text-small text-uppercase">Detail</strong></th>
                            </tr>
                        </thead>
                        {/* <tbody>
                            {
                                listCart && listCart.map((value) => (
                                    <tr className="text-center" key={value._id}>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">{value._id}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">{value.idUser}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">{value.fullname}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">{value.phone}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">{value.address}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">${value.total}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">{!value.delivery ? 'Waiting for progressing' : 'Processed'}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <p className="mb-0 small">{!value.status ? 'Waiting for pay' : 'Paid'}</p>
                                        </td>
                                        <td className="align-middle border-0">
                                            <Link className="btn btn-outline-dark btn-sm" to={`/history/${value._id}`}>
                                                View<i className="fas fa-long-arrow-alt-right ml-2"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody> */}
                    </table>
                </div>
            </div>
        </div >
    )
}

export default UserProfile