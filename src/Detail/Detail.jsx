import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { Link, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import alertify from "alertifyjs";
// import { addCart } from "../Redux/Action/ActionCart";
// import CartAPI from "../API/CartAPI";
import queryString from "query-string";
// import CommentAPI from "../API/CommentAPI";
import axios from "axios";
import { Card, Carousel } from "react-bootstrap";
import {
  AiOutlinePlus,
  AiOutlineLine,
  AiFillHeart,
  AiOutlineShoppingCart,
  AiTwotoneStar,
} from "react-icons/ai";
import { HOST } from "../domain/host/host";
import CartAPI from "../API/CartAPI";
import CardProduct from "../components/CardProduct";
import { v4 as uuid } from "uuid"

function Detail(props) {
  const URL_AddToCart = `${HOST}/addToCart`;
  const URL_GetCartById = `${HOST}/getCartById`;
  const URL_GetVoucher = `${HOST}/coupons`;

  // const [load_comment, set_load_comment] = useState(false);
  const [product, setProduct] = useState([]);
  // const [list_comment, set_list_comment] = useState([]);
  const [detail, setDetail] = useState({});
  const [review, setReview] = useState("description");
  const [comment, setComment] = useState("");
  const [star, setStar] = useState(1);
  const [text, setText] = useState(1);
  const [index, setIndex] = useState(0);
  const [sizeProduct, setSizeProduct] = useState(null);
  const [getVoucher, setGetVoucher] = useState("");
  const [getCartById, setGetCartById] = useState({})
  let { id } = useParams();
  // const listCart = useSelector((state) => state.Cart.listCart);
  // const idUser = useSelector((state) => state.Session.idUser);

  // Hàm này dùng để lấy ra thông tin từng sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getDetail(id);
      setDetail(response.data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (detail.coupons) {
      axios
        .get(URL_GetVoucher)
        .then((response) => {
          let voucher = response.data.filter(
            (val) => detail.coupons === val.nameCoupons
          )[0];
          setGetVoucher(voucher.voucher);
        })
        .catch((error) => console.log("error", error));
    }
  }, [detail.coupons]);

  const addToCart = () => {
    let id_user_cart = "";
    let id_user_clientage = "";
    if (!sessionStorage.getItem("id_user")) {
      if (!localStorage.getItem("id_user_clientage")) {
        // Nếu id fake chưa có thì chúng ta tiến tạo hành một id mới
        var unique_id = uuid();
        var create_id_user_fake = unique_id.slice(0, 8)
        localStorage.setItem("id_user_clientage", create_id_user_fake)
        console.log(create_id_user_fake);
      }
    }
    if (!sizeProduct) {
      alertify.error("Bạn phải chọn size!");
      return;
    }
    if (!text) {
      alertify.error("Bạn phải chọn số lượng!");
      return;
    }
    // idUser
    id_user_cart = sessionStorage.getItem("id_user");
    // idUser khách
    id_user_clientage = localStorage.getItem("id_user_clientage");
    const data = {
      idUser: id_user_cart ? id_user_cart : id_user_clientage,
      idProduct: detail._id,
      quantity: text,
      nameProduct: detail.name,
      price: detail.price,
      promotionPrice: detail.promotionPrice,
      img: detail.avt,
      size: sizeProduct,
    };
    axios.post(URL_AddToCart, data)
    alertify.set("notifier", "position", "bottom-left");
    alertify.success("Bạn Đã Thêm Hàng Thành Công!");
    props.fecthCount();
  };

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const upText = () => {
    const value = parseInt(text) + 1;
    setText(value);
  };

  const downText = () => {
    const value = parseInt(text) - 1;
    if (value === 0) return;
    setText(value);
  };

  const selectSize = (selectedIndex) => {
    setSizeProduct(selectedIndex);
  };

  const handlerReview = (value) => {
    setReview(value);
  };
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // Hàm thay đổi sao đánh giá
  const onChangeStar = (e) => {
    setStar(e.target.value);
  };

  // Hàm viết comment
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  // Hàm này dùng để gửi bình luận
  const submitComment = () => {
    const id_user = sessionStorage.getItem("id_user");
    if (!id_user) {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Đăng Nhập!");
      return;
    }
    const data = {
      idProduct: id,
      idUser: sessionStorage.getItem("id_user"),
      fullname: sessionStorage.getItem("name_user"),
      content: comment,
      star: star,
    };
  };

  //Hàm này gọi API lấy sản phẩm có liên quan
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getAPI();
      const data = response.data.splice(0, 4);
      setProduct(data);
    };
    fetchData();
  }, []);

  // convert string to array
  const album = detail.album;
  const size = detail.size;
  const arrAlbum = album ? album.split(" ") : [];
  const arrSize = size ? size.split(" ") : [];

  return (
    <section className="py-4 main-detail" >
      <div className="py-2 bg-light mb-4">
        <div className="container">
          <ol className="breadcrumb justify-content-start">
            <li className="breadcrumb-item">
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cửa hàng
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {detail.name}
            </li>
          </ol>
        </div>
      </div>

      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 col-3 d-flex flex-row flex-lg-column order-lg-1 order-2">
                <Card.Img
                  className="post-img mb-3 mr-4"
                  src={detail.avt}
                ></Card.Img>
                {arrAlbum.map((val, idx) => {
                  return (
                    <>
                      <Card.Img
                        key={idx + 1}
                        className="post-img mb-3 mr-4"
                        src={val}
                      ></Card.Img>
                    </>
                  );
                })}
              </div>
              <Carousel
                variant="dark"
                className="col-lg-10 order-lg-2 order-1"
                activeIndex={index}
                onSelect={handleSelect}
              >
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={detail.avt}
                    alt="Second Product"
                  />
                </Carousel.Item>
                {arrAlbum.map((val, idx) => {
                  return (
                    <Carousel.Item key={idx + 1}>
                      <img
                        className="d-block w-100"
                        src={val}
                        alt="Second Product"
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
          <div className="col-lg-6 ">
            {/* Đánh giá  */}
            <ul className="list-inline mb-2">
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
              <li className="list-inline-item m-0">
                <i className="fas fa-star small text-warning"></i>
              </li>
            </ul>
            {/* end Đánh giá  */}
            <Card.Title className="title-product mb-3">
              {detail.name}
            </Card.Title>
            <div className="text-gray pb-2">
              <strong className="text-uppercase">Thương hiệu:</strong>
              <span className="ml-2 text-muted">{detail.brand}</span>
            </div>
            <Card.Text className="text-base d-flex">
              {detail.coupons && (
                <span className="sale-product">{getVoucher}%</span>
              )}
              <span className="text-base" style={{ color: "red" }}>
                {parseInt(detail.promotionPrice ? detail.promotionPrice : detail.price).toLocaleString()}₫
              </span>
              <span style={{ color: "grey", paddingLeft: "10px" }}>
                <del>{detail.promotionPrice ? parseInt(detail.price).toLocaleString() + "₫" : ""}</del>
              </span>
            </Card.Text>

            <div className="row align-items-center mb-4">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <div className="quantity">
                    <button className="dec-btn" onClick={downText}>
                      <AiOutlineLine />
                    </button>
                    <input
                      className="form-control border-0 shadow-0 p-0"
                      type="text"
                      value={text}
                      onChange={onChangeText}
                    />
                    <button className="inc-btn" onClick={upText}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              </div>
              <div className="">
                <ul className="list-unstyled d-inline-block">
                  <li className="py-2 mb-1 bg-white text-muted">
                    <strong className="text-uppercase text-dark">
                      Thể loại:
                    </strong>
                    <a className="ml-2">{detail.category}</a>
                  </li>
                  <li className="py-2 mb-1 size-products">
                    <strong className="text-uppercase text-dark">Size:</strong>
                    {arrSize.length === 0 ? "null" : arrSize.map((val, idx) => {
                      return (
                        <a
                          key={idx + 1}
                          className={`size-product-item ml-2 
                          ${sizeProduct === val ? "text-check-size text-light" : "text-uncheck-size"}`}
                          onClick={() => selectSize(val)}
                        >
                          {val}
                        </a>
                      );
                    })}
                  </li>
                </ul>
              </div>
              <div className="col-md-8 d-flex flex-md-row flex-column align-item-center mb-2">
                <a
                  className="btn btn-dark btn-base mr-3 text-white my-2"
                  onClick={addToCart}
                >
                  <AiOutlineShoppingCart /> Thêm vào giỏ hàng
                </a>
                <a
                  className="btn btn-warning btn-base text-white hover-icon-heart mr-3 my-2"
                  href="#"
                >
                  <AiFillHeart /> Thêm vào yêu thích
                </a>
              </div>
            </div>
          </div>
        </div>

        <ul className="nav nav-tabs border-0">
          <li className="nav-item">
            <a
              className="nav-link fix_comment"
              onClick={() => handlerReview("description")}
              style={
                review === "description"
                  ? { backgroundColor: "#383838", color: "#ffffff" }
                  : { color: "#383838" }
              }
            >
              Mô tả
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link fix_comment"
              onClick={() => handlerReview("review")}
              style={
                review === "review"
                  ? { backgroundColor: "#383838", color: "#ffffff" }
                  : { color: "#383838" }
              }
            >
              Đánh giá
            </a>
          </li>
        </ul>
        <div className="tab-content mb-5">
          {review === "description" ? (
            <div className="tab-pane fade show active">
              <div className="p-4 p-lg-5 bg-white">
                <h6 className="text-uppercase mb-3">Mô tả sản phẩm</h6>
                <p className="text-muted text-small">{detail.description}</p>
              </div>
            </div>
          ) : (
            <div className="tab-pane fade show active">
              <div className="p-4 p-lg-5 bg-white">
                <div className="row">
                  <div className="col-lg-8">
                    {/* {list_comment &&
                      list_comment.map((value) => (
                        <div className="media mb-3" key={value._id}>
                          <img
                            className="rounded-circle"
                            src="https://img.icons8.com/color/36/000000/administrator-male.png"
                            alt=""
                            width="50"
                          />
                          <div className="media-body ml-3">
                            <h6 className="mb-0 text-uppercase">
                              {value.fullname}
                            </h6>
                            <p className="small text-muted mb-0 text-uppercase">
                              dd/mm/yyyy
                            </p>
                            <ul className="list-inline mb-1 text-xs">
                              <li className="list-inline-item m-0">
                                <i className={value.star1}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star2}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star3}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star4}></i>
                              </li>
                              <li className="list-inline-item m-0">
                                <i className={value.star5}></i>
                              </li>
                            </ul>
                            <p className="text-small mb-0 text-muted">
                              {value.content}
                            </p>
                          </div>
                        </div>
                      ))} */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Bình Luận:</label>
          <textarea
            className="form-control"
            style={{ maxWidth: "100%" }}
            rows="3"
            onChange={onChangeComment}
            value={comment}
          ></textarea>
        </div>
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4">
          <div className="d-flex sm-w-50 w-100 mb-3 sm-mb-0">
            <span className="mt-2">Đánh giá: </span>
            &nbsp; &nbsp;
            <input
              className="form-control w-25"
              type="number"
              min="1"
              max="5"
              value={star}
              onChange={onChangeStar}
            />
            &nbsp; &nbsp;
            <span className="mt-2">
              Sao <AiTwotoneStar />{" "}
            </span>
          </div>
          <div>
            <a
              className="btn btn-dark btn-sm btn-block px-0 text-white sm-w-100"
              style={{ width: "12rem" }}
              onClick={submitComment}
            >
              Gửi
            </a>
          </div>
        </div>
        <h2 className="h5 text-uppercase mb-4">Sản phẩm liên quan</h2>
        <div className="row">
          {product &&
            product.map((value, idx) => (
              <div className="col-md-4 col-xl-3 col-sm-6" key={idx + 1}>
                <CardProduct itemProduct={value} />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Detail;
