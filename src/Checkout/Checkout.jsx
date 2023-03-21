import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { HOST } from "../domain/host/host";
import axios from "axios";
import { Link } from "react-router-dom";
import CitySelectionForm from "./CitySelectionForm";
import alertify from "alertifyjs";

function Checkout(props) {
  const URL_CART = `${HOST}/getCartById`;
  const URL_CheckOut = `${HOST}/createBill`;
  const URL_getUserById = `${HOST}/user`;

  const [getCartById, setCartById] = useState([]);

  const [total, setTotal] = useState(0);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState(false);
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState({});

  //Hàm này check User có đăng nhập chưa nếu chưa thì sử dụng id khách
  let idUser = ""
  if (sessionStorage.getItem("id_user")) {
    const id_user = sessionStorage.getItem("id_user");
    idUser = id_user;
  }
  else if (localStorage.getItem("id_user_clientage")) {
    const id_user_clientage = localStorage.getItem("id_user_clientage")
    idUser = id_user_clientage;
  }

  useEffect(() => {
    if (idUser) {
      axios
        .get(`${URL_CART}/${idUser}`)
        .then((response) => {
          setCartById(response.data);
          getTotal(response.data);
        })
        .catch((error) => console.log(error));
      axios
        .get(`${URL_getUserById}/${idUser}`)
        .then((response) => setUser(response.data))
        .catch((error) => console.log(error));
    }
  }, []);

  useEffect(() => {
    if (getCartById.length === 0) return;
    if (load) {
      const nameProduct = getCartById.map((val) => val.nameProduct);
      const price = getCartById.map((val) =>
        val.promotionPrice ? val.promotionPrice : val.price
      );
      const quantity = getCartById.map((val) => val.quantity);
      const size = getCartById.map((val) => val.size);

      const data = {
        idUser: idUser,
        phone: phone ? phone : user.phone,
        address: address ? address : user.address,
        fullname: fullName ? fullName : user.fullname,
        total: total,
        quantity: quantity.toString(),
        email: email ? email : user.email,
        nameProduct: nameProduct.toString(),
        price: price.toString(),
        size: size.toString(),
      };
      console.log(data);
      if (data.total === 0) {
        alertify.set("notifier", "position", "bottom-left");
        alertify.error("Vui Lòng Kiểm Tra Lại Giỏ Hàng!");
        return;
      }
      axios.post(URL_CheckOut, data);
      setTimeout(() => {
        setSuccess(!success);
        setLoad(!load);
      }, 4000);
    }
  }, [load, getCartById]);

  //Hàm này dùng để tính tổng tiền carts
  const getTotal = (getCartById) => {
    let total = getCartById;
    let sub_total = 0;
    total.map((value) => {
      return (sub_total +=
        parseInt(value.promotionPrice ? value.promotionPrice : value.price) *
        parseInt(value.quantity));
    });
    setTotal(sub_total);
  };

  // ---------------------- validate ----------------------
  const validateEmail = (email) => {
    const validEmail = /\S+@\S+\.\S+/;
    return validEmail.test(String(email).toLowerCase());
  };
  const validatePhoneNumber = (phone) => {
    const validPhone = /^\d{10}$/;
    return validPhone.test(phone);
  };

  const onChangeName = (e) => {
    setFullName(user.fullname ? user.fullname : e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  //Check Validation
  const handlerSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    const error = {};

    if (!user.fullname && !fullName) {
      isValid = false;
      error.fullName = "Họ và Tên không được bỏ trống!";
    }

    if (!user.email && !email) {
      isValid = false;
      error.email = "Email không tồn tại!";
    } else if (!validateEmail(email)) {
      isValid = false;
      error.email = "Email không hợp lệ!";
    }

    if (!user.phone && !phone) {
      isValid = false;
      error.phone = "Số điện thoại không được để trống!";
    } else if (!validatePhoneNumber(phone)) {
      isValid = false;
      error.phone = "Số điện thoại không hợp lệ!";
    }

    if (!user.address && !address) {
      isValid = false;
      error.address = "Địa chỉ không được bỏ trống!";
    } else {
      console.log("Thanh Cong");
      setLoad(!load);
    }
    setErrors(error);
    return isValid;
  };

  return (
    <div>
      {load && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}

      <div className="main-checkout">
        <section className="py-3 bg-light">
          <div className="container">
            <ol className="breadcrumb justify-content-start">
              <li className="breadcrumb-item">
                <Link to={"/"}>Trang chủ</Link>{" "}
              </li>
              <li className="breadcrumb-item">
                <Link to={"/cart"}>Giỏ hàng</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thanh toán
              </li>
            </ol>
          </div>
        </section>

        {!success && (
          <section className="py-5 container">
            <h2 className="h5 text-uppercase mb-4">Chi tiết thanh toán</h2>
            <div className="row">
              <div className="col-lg-8">
                <form>
                  <div className="row">
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Fullname"
                      >
                        Họ và Tên:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        style={{ maxWidth: "100%" }}
                        value={user.fullname ? user.fullname : fullName}
                        onChange={onChangeName}
                        type="text"
                        placeholder="Nhập họ và tên của bạn ở đây!"
                      />

                      {errors.fullName && (
                        <span className="text-danger">{errors.fullName}</span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Email"
                      >
                        Email:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg w-100"
                        style={{ maxWidth: "100%" }}
                        value={user.email ? user.email : email}
                        onChange={onChangeEmail}
                        type="text"
                        placeholder="Nhập Email của bạn ở đây!"
                      />

                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Phone"
                      >
                        Số Điện Thoại:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        style={{ maxWidth: "100%" }}
                        value={user.phone ? user.phone : phone}
                        onChange={onChangePhone}
                        type="number"
                        placeholder="Nhập số điện thoại của bạn ở đây!"
                      />

                      {errors.phone && (
                        <span className="text-danger">{errors.phone}</span>
                      )}
                    </div>
                    <div className="col-lg-12 form-group">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Địa Chỉ:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        style={{ maxWidth: "100%" }}
                        value={user.address ? user.address : address}
                        onChange={onChangeAddress}
                        type="text"
                        placeholder="Nhập địa chỉ của bạn ở đây!"
                      />

                      {errors.address && (
                        <span className="text-danger">{errors.address}</span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    {/* <CitySelectionForm /> */}
                    <div className="col-lg-12 form-group">
                      <button
                        className="btn btn-dark"
                        style={{ color: "white" }}
                        type="submit"
                        onClick={handlerSubmit}
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Đơn hàng của bạn</h5>
                    <ul className="list-unstyled mb-0">
                      {getCartById &&
                        getCartById.map((value) => (
                          <div key={value._id}>
                            <li className="d-flex align-items-center justify-content-between">
                              <strong className="small font-weight-bold">
                                {value.nameProduct}
                              </strong>
                              <span className="text-muted small">
                                {(parseInt(
                                  value.promotionPrice
                                    ? value.promotionPrice
                                    : value.price
                                )).toLocaleString()}
                                {"₫ "}x {value.quantity}
                              </span>
                            </li>
                            <li className="border-bottom my-2"></li>
                          </div>
                        ))}
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="font-weight-bold">Tổng cộng</strong>
                        <span className="d-flex">
                          <p className="mr-2"> VND </p> {total.toLocaleString()}₫
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {success && (
          <section className="py-5">
            <div className="p-5 text-center">
              <h1>Bạn đã đặt hàng thành công!</h1>
              <p style={{ fontSize: "1.2rem" }}>Vui lòng check mail.</p>

              <Link className="btn btn-warning mt-2" to={"/"}>
                Trở về trang chủ
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Checkout;
