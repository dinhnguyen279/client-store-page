import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import { Link } from "react-router-dom";
import Search from "./Component/Search";
import Pagination from "./Component/Pagination";
import Products from "./Component/Products";
import SortProduct from "./Component/SortProduct";
import axios from "axios";
import axiosClient from "../API/axiosClient";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Card } from "react-bootstrap";
import CartAPI from "../API/CartAPI";
import alertify from "alertifyjs";
import CardProduct from "../components/cardProduct/cardProduct";
import { HOST } from "../domain/host/host";

function Shop(props) {
  const URL_PRODUCTS = `${HOST}/products`;
  const URL_CART = "http://localhost:3003/cart/add";

  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  //state dùng để sắp xếp sản phẩm
  const [sort, setSort] = useState("default");
  //Tổng số trang
  const [totalPage, setTotalPage] = useState();
  //Từng trang hiện tại
  const [pagination, setPagination] = useState({
    page: "1",
    count: "9",
    search: "",
    category: "all",
  });
  const [dataAddCart, setDataAddCart] = useState({});

  const idUser = sessionStorage.getItem("id_user");
  //Hàm nà dùng để lấy value từ component SortProduct truyền lên
  const handlerChangeSort = (value) => {
    console.log("Value: ", value);
    setSort(value);
  };

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    console.log("Value: ", value);
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  //Hàm này dùng để thay đổi state pagination.search
  //Hàm này sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerSearch = (value) => {
    console.log("Value: ", value);

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  //Hàm này dùng để thay đổi state pagination.category
  const handlerCategory = (value) => {
    console.log("Value: ", value);

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: pagination.search,
      category: value,
    });
  };

  useEffect(() => {
    axios
      .get(URL_PRODUCTS)
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  //Gọi hàm Pagination
  // useEffect(() => {

  //     const fetchData = async () => {

  //         const params = {
  //             page: pagination.page,
  //             count: pagination.count,
  //             search: pagination.search,
  //             category: pagination.category
  //         }

  //         const query = queryString.stringify(params)

  //         const newQuery = '?' + query

  //         // const response = await ProductAPI.getPagination(newQuery)
  //         const response = await axios.get(`${URL_PRODUCT}/pagination${newQuery}`)
  //         console.log(response)

  //         setProducts(response)
  //         setTemp(response)

  //     }

  //     fetchData()

  // }, [pagination])

  return (
    <div className="container main-shop">
      <section className="py-3 bg-light mb-3">
        <div className="container">
          <ol className="breadcrumb justify-content-start">
            <li className="breadcrumb-item">
              <Link to={"/"}>Trang chủ</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Cửa hàng
            </li>
          </ol>
        </div>
      </section>

      {/* -------------Modal Product----------------- */}

      <section className="py-5">
        <div className="container p-0">
          <div className="row">
            <div className="col-lg-3 order-2 order-lg-1">
              <h5 className="text-uppercase mb-4">Thể loại</h5>
              <div className="py-2 px-4 bg-dark text-white mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  Thời trang &amp; Phụ kiện
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("all")}
                  >
                    Tất cả
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  Quần áo
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("tshirt")}
                  >
                    Áo bóng đá
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("pants")}
                  >
                    Quần bóng đá
                  </a>
                </li>
              </ul>
              <div className="py-2 px-4 bg-light mb-3">
                <strong className="small text-uppercase font-weight-bold">
                  Giày thể thao
                </strong>
              </div>
              <ul className="list-unstyled small text-muted pl-lg-4 font-weight-normal">
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("sneaker")}
                  >
                    Sneaker
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    className="reset-anchor"
                    href="#"
                    onClick={() => handlerCategory("watch")}
                  >
                    Bóng đá
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-9 order-1 order-lg-2 mb-5 mb-lg-0">
              <div className="row mb-3 align-items-center">
                {/* ------------------Search----------------- */}
                <Search handlerSearch={handlerSearch} />
                {/* ------------------Search----------------- */}

                <div className="col-lg-8">
                  <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                    <li className="list-inline-item">
                      <SortProduct handlerChangeSort={handlerChangeSort} />
                    </li>
                  </ul>
                </div>
              </div>

              <CardProduct itemsProducts={products} />

              {/* <Products products={products} sort={sort} /> */}

              <Pagination
                pagination={pagination}
                handlerChangePage={handlerChangePage}
                totalPage={totalPage}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
