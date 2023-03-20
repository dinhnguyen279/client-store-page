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

  useEffect(() => {
    let idUser = sessionStorage.getItem("id_user");
    axios
      .get(`${URL_GetDetailUser}/${idUser}`)
      .then((response) => setGetDataUser(response.data))
      .catch((error) => console.log(error));
    axios
      .get(`${URL_BILLBYID}/${idUser}`)
      .then((response) => setHistory(response.data))
      .catch((error) => console.log(error));
  }, []);

  // const purchasedProduct = history.find(val => val.nameProduct)
  const listProduct = [];

  for (let i = 0; i < history.length; i++) {
    const obj = {};
    obj.name = history[i].nameProduct;
    obj.quantity = history[i].quantity;
    obj.price = history[i].price;
    obj._id = history[i]._id;
    listProduct.push(obj);
  }

  // console.log("listProduct", listProduct);
  // console.log('purchasedProduct',purchasedProduct);
  return (
    <div className={"container-fluid main-profile p-l-55 p-r-55 p-b-50"}>
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
                data-toggle="collapse"
                data-target="#overview"
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
                data-toggle="collapse"
                data-target="#history"
                className="link-profile"
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

      <div className="card-profile m-t-40 collapse" id="overview">
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

      <div className="card-profile m-t-40 collapse" id="history">
        <div className="header-history">
          <FaStore className="mr-2" />
          <span>Sports Zone</span>
        </div>
        {history.map((val, key) => (
          <div className="col-md-12 history-profile-user" key={key + 1}>
            <div className="content-history">
              <p>Mã đơn hàng: {val._id}</p>
              <p>Tên sản phẩm: {val.nameProduct}</p>
              <p>Số lượng: {val.quantity}</p>
              <p>Giá: {val.price}</p>
              <p>
                <b>Tổng:</b> {val.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
