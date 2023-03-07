import React, { useEffect, useState } from "react";
import ProductAPI from "../API/ProductAPI";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import alertify from "alertifyjs";
import { addCart } from "../Redux/Action/ActionCart";
import CartAPI from "../API/CartAPI";
import queryString from "query-string";
import CommentAPI from "../API/CommentAPI";
import axios from "axios";
import axiosClient from "../API/axiosClient";
import { Card, Carousel } from "react-bootstrap";
import { AiOutlinePlus, AiOutlineLine, AiFillHeart, AiOutlineShoppingCart, AiTwotoneStar } from 'react-icons/ai'

function Detail(props) {
  const [detail, setDetail] = useState({});

  const dispatch = useDispatch();

  //id params cho từng sản phẩm
  let { id } = useParams();
  console.log("id product:", id);

  //id_user được lấy từ redux
  // const id_user = useSelector((state) => state.Cart.id_user);

  //listCart được lấy từ redux
  const listCart = useSelector((state) => state.Cart.listCart);

  const [product, setProduct] = useState([]);

  const [star, setStar] = useState(1);

  const [comment, setComment] = useState("");

  // id_user đã đăng nhập
  const idUser = useSelector((state) => state.Session.idUser);

  // Listcomment
  const [list_comment, set_list_comment] = useState([]);
  // console.log("list_comment", list_comment);
  // state này dùng để load lại comment khi user gửi comment lên
  const [load_comment, set_load_comment] = useState(false);

  const URL_PRODUCT = "http://localhost:3003/product";

  const URL_CART = "http://localhost:3003/carts";

  // Hàm này dùng để lấy dữ liệu comment
  // Hàm này sẽ chạy lại phụ thuộc vào id Param
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        idProduct: id,
      };
      const query = "?" + queryString.stringify(params);
      const response = await CommentAPI.getCommentProduct(query);
      set_list_comment(response);
    };
    fetchData();
  }, [id]);

  // Hàm thay đổi sao đánh giá
  const onChangeStar = (e) => {
    setStar(e.target.value);
  };

  // Hàm thay đổi comment
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  // Hàm này dùng để bình luận
  const handlerComment = () => {
    if (idUser === "") {
      alertify.set("notifier", "position", "bottom-left");
      alertify.error("Vui Lòng Kiểm Tra Đăng Nhập!");
      return;
    }
    const fetchSendComment = async () => {
      const params = {
        idProduct: id,
        idUser: sessionStorage.getItem("id_user"),
        fullname: sessionStorage.getItem("name_user"),
        content: comment,
        star: star,
      };

      const query = "?" + queryString.stringify(params);

      // const response = await CommentAPI.postCommentProduct(query);
      const response = await axios.post(`http://localhost:3003/comment/send/${query}`);

      console.log(response);

      set_load_comment(true);
    };
    fetchSendComment();
    setComment("");
  };

  // Hàm này dùng để load lại dữ liệu comment
  // Phụ thuộc vào state load_comment
  useEffect(() => {
    if (load_comment) {
      const fetchData = async () => {
        const params = {
          idProduct: id,
        };
        const query = "?" + queryString.stringify(params);
        // const response = await CommentAPI.getCommentProduct(query);
        const response = await axios.get(`http://localhost:3003/comment/${query}`);
        set_list_comment(response);
      };
      fetchData();
      set_load_comment(false);
    }
  }, [load_comment]);

  //Hàm này gọi API và cắt chỉ lấy 4 sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getAPI()
      const data = response.data.splice(0, 4);
      setProduct(data);
    };
    fetchData();
  }, []);

  //Phần này là để thay đổi số lượng khi mua sản phẩm
  const [text, setText] = useState(1);
  const onChangeText = (e) => {
    setText(e.target.value);
  };

  //Tăng lên 1 đơn vị
  const upText = () => {
    const value = parseInt(text) + 1;
    setText(value);
  };

  //Giảm 1 đơn vị
  const downText = () => {
    const value = parseInt(text) - 1;
    if (value === 0) return;
    setText(value);
  };

  //Hàm này để lấy dữ liệu chi tiết sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getDetail(id)
      setDetail(response.data)
    };
    fetchData();
  }, [id]);

  //Phần này dùng để xem review hay description
  const [review, setReview] = useState("description");
  const handlerReview = (value) => {
    setReview(value);
  };

  //------------------- Hàm này là Thêm Sản Phẩm vào giỏ ----------------
  const addToCart = () => {
    let id_user_cart = "";
    if (!sessionStorage.getItem("id_user")) {
      alertify.error("Bạn phải đăng nhập!");
      return;
    }

    id_user_cart = sessionStorage.getItem("id_user");
    const data = {
      idUser: id_user_cart,
      idProduct: detail._id,
      nameProduct: detail.name,
      priceProduct: detail.price,
      count: text,
      img: detail.avt,
      size: sizeProduct
    };
    console.log("addToCart: ", data);
    if (sessionStorage.getItem("id_user")) {
      const fetchPost = async () => {
        const params = {
          idUser: id_user_cart, //sessionStorage.getItem('id_user')
          idProduct: detail._id, // Lấy idProduct
          count: text, // Lấy số lượng
        };
        // const query = "?" + queryString.stringify(params);
        const response = await axios.post(`${URL_CART}/add${params}`);
        console.log("add to cart", response);
      };
      fetchPost();
    } else {
      const action = addCart(data);
      dispatch(action);
    }
    alertify.set("notifier", "position", "bottom-left");
    alertify.success("Bạn Đã Thêm Hàng Thành Công!");
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // convert string to array
  const album = detail.album;
  const size = detail.size;
  // console.log(album);
  // Kiểm tra nếu album, size là null thì trả về array rỗng
  const arrAlbum = album ? album.split(" ") : [];
  const arrSize = size ? size.split(" ") : [];

  //select size products
  const [sizeProduct, setSizeProduct] = useState(null)
  const selectSize = (selectedIndex) => {
    setSizeProduct(selectedIndex)
  }

  return (
    <section className="py-4 main-detail">
      <div className="py-2 bg-light mb-4">
        <div className="container">
          <ol className="breadcrumb justify-content-start">
            <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Cửa hàng</li>
            <li className="breadcrumb-item active" aria-current="page">{detail.name}</li>
          </ol>
        </div>
      </div>
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-2 col-3 d-flex flex-row flex-lg-column order-lg-1 order-2">
                {
                  arrAlbum.map((val, idx) => {
                    return (
                      <>
                        <Card.Img key={idx + 1} className="post-img mb-3 mr-4" src={val}></Card.Img>
                      </>
                    )
                  })
                }
              </div>
              <Carousel variant="dark" className="col-lg-10 order-lg-2 order-1" activeIndex={index} onSelect={handleSelect}>
                {
                  arrAlbum.map((val, idx) => {
                    return (
                      <Carousel.Item key={idx + 1}>
                        <img
                          className="d-block w-100"
                          src={val}
                          alt="Second Product"
                        />
                      </Carousel.Item>
                    )
                  })
                }
              </Carousel>
            </div>
          </div>
          <div className="col-lg-6 ">
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
            <Card.Title className='title-product mb-3'>{detail.name}</Card.Title>
            <div className="text-gray pb-2">
              <strong className="text-uppercase">Hãng:</strong>
              <span className="ml-2 text-muted">{detail.brand}</span>
            </div>
            <Card.Text className="text-base d-flex">
              <span className="sale-product">{"-30%"}</span>
              <span className="text-base" style={{ color: "red" }}>399,000₫</span>
              <span style={{ color: "grey", paddingLeft: "10px" }}>
                <del>{detail.price}₫</del>
              </span>
            </Card.Text>

            <div className="row align-items-center mb-4">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between py-3">
                  <div className="quantity">
                    <button className="dec-btn" onClick={downText}>
                      < AiOutlineLine />
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
              <div className="col-md-8 d-flex flex-md-row flex-column align-item-center mb-2">
                <a
                  className="btn btn-dark btn-base mr-3 text-white my-2"
                  onClick={addToCart}
                >
                  <AiOutlineShoppingCart /> Thêm vào giỏ hàng
                </a>
                <a className="btn btn-warning btn-base text-white hover-icon-heart mr-3 my-2" href="#">
                  <AiFillHeart className="" /> Thêm vào yêu thích
                </a>
              </div>

              <div className="" >
                <ul className="list-unstyled d-inline-block">
                  <li className="py-2 mb-1 bg-white text-muted">
                    <strong className="text-uppercase text-dark">
                      Thể loại:
                    </strong>
                    <a className="reset-anchor ml-2">{detail.category}</a>
                  </li>
                  <li className="py-2 mb-1 bg-white text-muted size-products">
                    <strong className="text-uppercase text-dark">Size:</strong>
                    {
                      arrSize.map((val, idx) => {
                        return (
                          <>
                            <a key={idx + 1} className="reset-anchor ml-2" onClick={() => selectSize(val)}>{val}</a>
                          </>
                        )
                      })
                    }
                  </li>
                </ul>
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
                <h6 className="text-uppercase mb-3">Product description </h6>
                <p className="text-muted text-small">
                  {detail.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="tab-pane fade show active">
              <div className="p-4 p-lg-5 bg-white">
                <div className="row">
                  <div className="col-lg-8">
                    {list_comment &&
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
                      ))}
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
            <span className="mt-2">Sao <AiTwotoneStar /> </span>
          </div>
          <div>
            <a
              className="btn btn-dark btn-sm btn-block px-0 text-white sm-w-100"
              style={{ width: "12rem" }}
              onClick={handlerComment}
            >
              Gửi
            </a>
          </div>
        </div>
        <h2 className="h5 text-uppercase mb-4">Sản phẩm liên quan</h2>
        <div className="row">
          {product &&
            product.map((value) => (
              <div className="col-lg-3 col-sm-6" key={value._id}>
                <div className="product text-center skel-loader">
                  <div className="d-block mb-3 position-relative product-detail">
                    <Link className="d-block" to={`/detail/${value._id}`}>
                      <img
                        className="img-fluid w-100"
                        src={value.avt}
                        alt="..."
                      />
                    </Link>
                    <div className="product-overlay">
                      <ul className="mb-0 list-inline">
                        <li className="list-inline-item m-0 p-0">
                          <Link className="btn btn-sm btn-dark" to={`/detail/${value._id}`}>
                            Thông tin sản phẩm
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <h6>
                    <a className="reset-anchor" href={`/detail/${value._id}`}>
                      {value.name}
                    </a>
                  </h6>
                  <Card.Text style={{ color: "red" }}>{value.promotionPrice}₫
                    <span style={{ color: "grey", paddingLeft: "10px" }}>
                      <del>{value.price}₫</del>
                    </span>
                  </Card.Text>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section >
  );
}

export default Detail;
