import React, { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineScan } from "react-icons/ai";
import "./Auth.css";
import { Button } from "react-bootstrap";
import EditProfileUser from "./EditProfileUser";
import { HOST } from "../domain/host/host";
import axios from "axios";

import Form from "react-bootstrap/Form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaStore, FaShippingFast, FaStoreAlt } from "react-icons/fa";
import { Link, redirect, useNavigate } from "react-router-dom";

const UserProfile = (props) => {
  const URL_GetDetailUser = `${HOST}/user`;
  const URL_BILLBYID = `${HOST}/getBillById`;

  const [active, setActive] = useState("Overview");
  const [modalShow, setModalShow] = useState(false);
  const [getDataUser, setGetDataUser] = useState({
    avatar: "",
    fullname: "",
    address: "",
    email: "",
    phone: "",
    password: "",
    sex: "",
  });
  const [history, setHistory] = useState([]);
  // Show/hide password
  const [typePassWord, setTypePassWord] = useState("password");
  const handlerActive = (value) => {
    setActive(value);
  };
  let navigate = useNavigate();

  const idUser = sessionStorage.getItem("id_user");

  useEffect(() => {
    // Hàm này kiểm tra user đăng nhập chưa và hướng tới trang đăng nhập
    if (!idUser) {
      navigate('/signin', { replace: true });
    }
    // hàm này gọi thông tin user
    axios
      .get(`${URL_GetDetailUser}/${idUser}`)
      .then((response) => setGetDataUser(response.data))
      .catch((error) => console.log(error));
    // hàm này gọi thông tin hóa đơn
    axios
      .get(`${URL_BILLBYID}/${idUser}`)
      .then((response) => setHistory(response.data))
      .catch((error) => console.log(error));
  }, []);
  // const purchasedProduct = history.find(val => val.nameProduct)
  // const listProduct = [];

  // for (let i = 0; i < history.length; i++) {
  //   const obj = {};
  //   obj.name = history[i].nameProduct;
  //   obj.quantity = history[i].quantity;
  //   obj.price = history[i].price;
  //   obj._id = history[i]._id;
  //   listProduct.push(obj);
  // }
  // console.log(listProduct);

  // hàm này tách sản phẩm trong bill ra
  const listProduct = [];

  for (let i = 0; i < history.length; i++) {
    const oHistory = history[i];
    const idBills = oHistory._id.split(",");
    const names = oHistory.nameProduct.split(",");
    const quantities = oHistory.quantity.split(",");
    const prices = oHistory.price.split(",");
    for (let j = 0; j < names.length; j++) {
      const oBill = {}
      oBill.idBill = idBills[j];
      oBill.name = names[j];
      oBill.quantity = quantities[j];
      oBill.price = prices[j]
      listProduct.push(oBill)
    }
  }
  console.log(listProduct);

  return (
    <div className="container-fluid main-profile p-l-55 p-r-55 p-b-50">
      <div className="card-profile">
        <div className="d-block d-md-flex justify-between">
          <div className=" mb-3 main-img-profile d-block d-md-flex align-items-end">
            <img
              src={getDataUser.avatar}
              className="img-profile"
              alt="Profile Picture"
            />
            <h1>{getDataUser.fullname}</h1>
          </div>
          <div className=" name-profile">
            <Button className="text-uppercase">
              <AiOutlineScan /> In Hồ Sơ
            </Button>
          </div>
        </div>

        <div className="row p-t-30" style={{ margin: "auto" }}>
          <div className="list-profile">
            <div
              className="m-r-10 btn-detail"
              style={
                active === "Overview"
                  ? { background: "#6e00ff" }
                  : { background: "none" }
              }
              onClick={() => handlerActive("Overview")}
            >
              <button
                style={
                  active === "Overview"
                    ? { color: "white" }
                    : { color: "black" }
                }
                className="link-profile"
              >
                <i
                  className="m-r-10 fa fa-home"
                  style={{ fontSize: "20px" }}
                  aria-hidden="true"
                />
                Tài khoản
              </button>
            </div>
            <div
              className="btn-detail"
              style={
                active === "History"
                  ? { background: "#6e00ff" }
                  : { background: "none" }
              }
              onClick={() => handlerActive("History")}
            >
              <button
                className="link-profile"
                style={
                  active === "History"
                    ? { color: "white" }
                    : { color: "black" }
                }
              >
                <i
                  className="m-r-10 fa fa-history"
                  style={{ fontSize: "20px" }}
                  aria-hidden="true"
                />
                Đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin user */}
      {active === "Overview" ? (
        <div className="card-profile m-t-40">
          <div className="card-title d-flex justify-content-between">
            <h3 className="title-text">Thông tin cá nhân</h3>
            <Button
              type="button"
              variant="primary"
              onClick={() => setModalShow(true)}
            >
              <AiOutlineEdit /> Chỉnh sửa
            </Button>

            <EditProfileUser
              show={modalShow}
              onHide={() => setModalShow(false)}
              getDataUser={getDataUser}
              setGetDataUser={setGetDataUser}
            />
          </div>

          <div className="row">
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-envelope" aria-hidden="true"></i>
              <div className="title-text">
                {getDataUser.email}
                <p>Địa chỉ email</p>
              </div>
            </div>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-mobile" aria-hidden="true"></i>
              <div>
                {getDataUser.phone}
                <p>Số điện thoại</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-code" aria-hidden="true"></i>
              <div>
                {getDataUser.sex}
                <p>Gới tính</p>
              </div>
            </div>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <div>
                {/* <Form.input type="password" value={getDataUser.address} /> */}
                <Form.Group
                  className="wrap-inputInfo validate-input"
                  controlId="formBasicPassword"
                >
                  <p>Mật khẩu</p>
                  <Form.Control
                    type={typePassWord}
                    value={getDataUser.password}
                    className="inputInfo"
                    disabled
                  />
                  {typePassWord === "password" ? (
                    <button
                      type="button"
                      className="show-password-profile"
                      onClick={() => setTypePassWord("text")}
                    >
                      <AiFillEye />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="show-password-profile"
                      onClick={() => setTypePassWord("password")}
                    >
                      <AiFillEyeInvisible />
                    </button>
                  )}
                </Form.Group>
              </div>
            </div>
          </div>

          <hr className="line-page" />

          <div className="row">
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-location-arrow" aria-hidden="true"></i>
              <div className="title-text">
                {getDataUser.address}
                <p>Địa chỉ</p>
              </div>
            </div>
            <div className="col-md-6 icon-detail d-flex align-items-center">
              <i className="fa fa-address-book" aria-hidden="true"></i>
              <div className="title-text">
                {getDataUser.created_date}
                <p>Ngày tham gia</p>
              </div>
            </div>
          </div>
        </div>
      ) : ""}

      {/* Đơn hàng */}
      {active === "History" ?
        (
          <>
            {history.map((val, key) => (
              <div className="history-profile-user m-t-40" key={key + 1}>
                <div className="header-history">
                  <FaStore className="mr-2" />
                  <span>Sports Zone</span>
                </div>
                <div className="content-history">
                  <div className="code-order">
                    <div>
                      <p>Mã đơn hàng: {val._id}</p>
                    </div>
                    <div style={{ fontSize: "13px" }}>
                      <span className="text-success"> <FaShippingFast /> Đơn hàng đã được giao thành công</span> | <span className="text-uppercase" style={{ color: "red", fontWeight: "bolder" }}>Hoàn thành</span>
                    </div>
                  </div>
                  <div className="content-order">
                    <div>
                      <p>Tên sản phẩm: {val.nameProduct}</p>
                      <p>Số lượng: {val.quantity}</p>
                    </div>
                    <div>
                      <p>Giá: {val.price}₫</p>
                    </div>
                  </div>
                  <div className="footer-order">
                    <p className="text-base">
                      <b>Thành tiền:</b> {(parseInt(val.total)).toLocaleString()}₫
                    </p>
                    <div className="mt-3">
                      <Link className="btn btn-danger pr-4 pl-4 mr-3">Mua lại</Link>
                      <Link className="btn btn-outline-dark">Liên Hệ Shop</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : ""}

    </div>
  );
};

export default UserProfile;
