import React, { useEffect, useState } from "react";
import "./Checkout.css";
import { HOST } from "../domain/host/host";
import axios from "axios";
import { Link } from "react-router-dom";
import alertify from "alertifyjs";
import Image from "../Share/img/Image"
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

  // Select City 
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  // Phương thức thanh toán
  const [paymentMethod, setPaymentMethod] = useState('cod');
  // gọi ra API của các thành phố
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      });
  }, []);
  // hàm này sẽ không cho user chọn quận huyện nếu chưa chọn tỉnh thành 
  useEffect(() => {
    if (selectedCity !== "") {
      const districtsInSelectedCity = cities.find(
        (city) => city.Id === selectedCity
      ).Districts;
      setDistricts(districtsInSelectedCity);
    } else {
      setDistricts([]);
      setWards([]);
    }
    setSelectedDistrict("");
    setSelectedWard("");
  }, [selectedCity, cities]);

  // hàm này sẽ không cho user chọn phường xã nếu chưa chọn quận huyện
  useEffect(() => {
    if (selectedDistrict !== "") {
      const wardsInSelectedDistrict = districts.find(
        (district) => district.Id === selectedDistrict
      ).Wards;
      setWards(wardsInSelectedDistrict);
    } else {
      setWards([]);
    }
    setSelectedWard("");
  }, [selectedDistrict, districts]);

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
  }, [getCartById]);

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
  const validateFormCheckout = () => {
    let isValid = true;
    const error = {};

    if (!user.fullname && !fullName) {
      isValid = false;
      error.fullName = "Họ và Tên không được trống!";
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
      error.phone = "Số điện thoại không được trống!";
    } else if (!validatePhoneNumber(phone)) {
      isValid = false;
      error.phone = "Số điện thoại không hợp lệ!";
    }

    if (!user.address && !address) {
      isValid = false;
      error.address = "Địa chỉ không được trống!";
    }
    if (!selectedCity) {
      isValid = false;
      error.city = "Tỉnh thành không được trống!";
    }
    if (!selectedDistrict) {
      isValid = false;
      error.district = "Quận huyện không được trống!";
    }
    if (!selectedWard) {
      isValid = false;
      error.ward = "Phường xã không được trống!";
    }
    setErrors(error);
    return isValid;
  }
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (validateFormCheckout()) {
      setLoad(true);
      const nameProduct = getCartById.map((val) => val.nameProduct);
      const price = getCartById.map((val) =>
        val.promotionPrice ? val.promotionPrice : val.price
      );
      const quantity = getCartById.map((val) => val.quantity);
      const size = getCartById.map((val) => val.size);
      const idProduct = getCartById.map((val) => val.idProduct);
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
        payment: paymentMethod,
        idProduct: idProduct.toString()
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
        setLoad(false);
      }, 4000);
    }
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
            <h2 className="text-uppercase mb-4">Xác Nhận Đơn Hàng</h2>
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
                        Email:
                      </label>
                      <input
                        className="form-control form-control-lg w-100"
                        style={{ maxWidth: "100%" }}
                        value={email}
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
                        value={phone}
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
                    <div className='col-lg-4 col-md-12 mb-3'>
                      <label className="text-small text-uppercase" htmlFor="Tỉnh thành">Tỉnh thành: </label>
                      <select
                        className="form-select form-select-sm form-control-lg"
                        value={selectedCity}
                        onChange={(event) => setSelectedCity(event.target.value)}
                      >
                        <option value="">Chọn tỉnh thành</option>
                        {cities.map((city) => (
                          <option key={city.Id} value={city.Id}>
                            {city.Name}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <span className="text-danger">{errors.city}</span>
                      )}
                    </div>

                    <div className='col-lg-4 col-md-12 mb-3'>
                      <label className="text-small text-uppercase" htmlFor="Quận huyện">Quận huyện: </label>
                      <select
                        className="form-select form-select-sm form-control-lg"
                        value={selectedDistrict}
                        onChange={(event) => setSelectedDistrict(event.target.value)}
                        disabled={!selectedCity}
                      >
                        <option value="">Chọn quận huyện</option>
                        {districts.map((district) => (
                          <option key={district.Id} value={district.Id}>
                            {district.Name}
                          </option>
                        ))}
                      </select>
                      {errors.district && (
                        <span className="text-danger">{errors.district}</span>
                      )}
                    </div>

                    <div className='col-lg-4 col-md-12 mb-3'>
                      <label className="text-small text-uppercase" htmlFor="Phường xã">Phường xã: </label>
                      <select
                        className="form-select form-select-sm form-control-lg"
                        value={selectedWard}
                        onChange={(event) => setSelectedWard(event.target.value)}
                        disabled={!selectedDistrict}
                      >
                        <option value="">Chọn phường xã</option>
                        {wards.map((ward) => (
                          <option key={ward.Id} value={ward.Id}>
                            {ward.Name}
                          </option>
                        ))}
                      </select>
                      {errors.ward && (
                        <span className="text-danger">{errors.ward}</span>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mb-3">
                      <div className="form-method-pay">
                        <label className="text-small text-uppercase" htmlFor="Tỉnh thành">Phương thức thanh toán</label>
                        <div className="content-pay-method">
                          <div className="">
                            <input type="radio" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label className="ml-3">Thanh toán khi nhận hàng</label>
                          </div>
                          <img src={Image.logoPay} className="img-logo-pay" alt="logoPay" />
                        </div>
                        <div className="content-pay-method">
                          <div className="">
                            <input type="radio" value="momo" checked={paymentMethod === 'momo'} onChange={(e) => setPaymentMethod(e.target.value)} />
                            <label className="ml-3">Momo</label>
                          </div>
                          <img src={Image.logoMomo} className="img-logo-pay" alt="logoMomo" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
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
        )
        }

        {
          success && (
            <section className="py-5">
              <div className="p-5 text-center">
                <h1>Bạn đã đặt hàng thành công!</h1>
                <p style={{ fontSize: "1.2rem" }}>Vui lòng check mail.</p>

                <Link className="btn btn-warning mt-2" to={"/"}>
                  Trở về trang chủ
                </Link>
              </div>
            </section>
          )
        }
      </div >
    </div >
  );
}

export default Checkout;
