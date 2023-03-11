import React, { useEffect, useState, useRef } from 'react';
import ProductAPI from '../API/ProductAPI';
import { Link } from 'react-router-dom';
import Search from './Component/Search';
import Pagination from './Component/Pagination';
import SortProduct from './Component/SortProduct';
import axios from 'axios';
import axiosClient from '../API/axiosClient';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { Card } from 'react-bootstrap';
import CartAPI from '../API/CartAPI';
import queryString from "query-string";
import alertify from 'alertifyjs';
import CardProduct from '../components/CardProduct';

function Shop(props) {

    const [products, setProducts] = useState([])
    const [temp, setTemp] = useState([])

    // search product
    const [search, setSearch] = useState('')
    const delaySearchTextTimeOut = useRef(null)

    //state dùng để sắp xếp sản phẩm
    const [sort, setSort] = useState('default')

    //Tổng số trang
    const [totalPage, setTotalPage] = useState()

    //Từng trang hiện tại
    const [pagination, setPagination] = useState({
        page: '1',
        count: '9',
        search: '',
        category: 'all',
    })
    const URL_PRODUCT = 'http://localhost:1425/products';
    const URL_CART = 'http://localhost:1425/cart/add';
    const URL_SEARCH = 'http://localhost:1425/searchProducts';

    const idUser = sessionStorage.getItem("id_user")
    console.log("id user shop", idUser);

    //Hàm nà dùng để lấy value từ component SortProduct truyền lên
    const handlerChangeSort = (value) => {
        console.log("Value: ", value)
        setSort(value)
    }

    //Hàm này dùng để thay đổi state pagination.page
    //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
    const handlerChangePage = (value) => {
        console.log("Value: ", value)

        //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
        setPagination({
            page: value,
            count: pagination.count,
            search: pagination.search,
            category: pagination.category,

        })
    }

    //Hàm này dùng để thay đổi state pagination.search
    //Hàm này sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
    // const handlerSearch = (value) => {
    // console.log("value", value);

    // setPagination({
    //     page: pagination.page,
    //     count: pagination.count,
    //     search: value,
    //     fildter: "name",
    //     category: pagination.category
    // })
    // }

    const onChangeText = (e) => {
        const value = e.target.value;
        const dataSearch = {
            fildter: "name",
            value: value
        }
        console.log(value);
        setSearch(value)
        console.log("resSearh", dataSearch);
        const query = "?" + queryString.stringify(dataSearch)
        console.log(query);

        axios.get(`${URL_SEARCH}${query}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log("err search", err))

        console.log("search xong", products);
    }
    // if (onChangeText) {
    //     //Nếu người dùng đang nhập thì mình clear cái giây đó
    //     if (delaySearchTextTimeOut.current) {
    //         clearTimeout(delaySearchTextTimeOut.current)
    //     }
    //     delaySearchTextTimeOut.current = setTimeout(() => {
    //         onChangeText(search)
    //     }, 500)
    // }

    //Hàm này dùng để thay đổi state pagination.category
    // const handlerCategory = (value) => {
    //     console.log("Value: ", value)

    //     setPagination({
    //         page: pagination.page,
    //         count: pagination.count,
    //         search: pagination.search,
    //         category: value,

    //     })
    // }

    //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
    //Và nó phụ thuộc và state pagination
    useEffect(() => {
        const fetchAllData = async () => {
            await ProductAPI.getAPI().then((res) => setProducts(res.data))
            console.log('products', products);
            // Nếu mà category === 'all' thì nó sẽ gọi hàm get tất cả sản phẩm
            // Ngược lại thì nó sẽ gọi hàm pagination và phân loại sản phẩm
            // if (pagination.category === 'all'){
            //     response = await axios.get(URL_PRODUCT)
            //     console.log(response)

            // }else{
            //     const params = {
            //         page: pagination.page,
            //         count: pagination.count,
            //         search: pagination.search,
            //         category: pagination.category
            //     }

            //     const query = queryString.stringify(params)

            //     const newQuery = '?' + query

            //     // response = await ProductAPI.getPagination(newQuery)
            //     response = await axios.get(`${URL_PRODUCT}/pagination${newQuery}`)
            //     console.log(response)
            // }

            //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
            // const totalPage = Math.ceil(parseInt(response.length) / parseInt(pagination.count))
            // console.log('totalPage',totalPage)

            // setTotalPage(totalPage)
        }
        fetchAllData()
        // pagination
    }, [])
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
                        <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Cửa hàng</li>
                    </ol>
                </div>
            </section>
            {/* -------------Modal Product----------------- */}
            {
                products && products.map(value => (
                    <div className="modal fade show" id={`product_${value._id}`} key={value._id}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body p-0">
                                    <div className="row align-items-stretch">
                                        <div className="col-lg-6 p-lg-0">
                                            <img style={{ width: '100%' }} className="product-view d-block h-100 bg-cover bg-center" src={value.avt} data-lightbox={`product_${value._id}`} />
                                            {/* <img className="d-none" href={value.img2} />
                                            <img className="d-none" href={value.img3} /> */}
                                        </div>
                                        <div className="col-lg-6">
                                            {/* Để tắt modal phải có class="close" và data-dissmiss="modal" và aria-label="Close" */}
                                            <a className="close p-4" type="button" href="#section_product" data-dismiss="modal" aria-label="Close">×</a>
                                            <div className="p-5 my-md-4">
                                                <ul className="list-inline mb-2">
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                    <li className="list-inline-item m-0"><i className="fas fa-star small text-warning"></i></li>
                                                </ul>
                                                <h2 className="h4">{value.name}</h2>
                                                <Card.Text style={{ color: "red" }}>{value.promotionPrice}₫
                                                    <span style={{ color: "grey", paddingLeft: "10px" }}>
                                                        <del>{value.price}₫</del>
                                                    </span>
                                                </Card.Text>
                                                <p className="text-small mb-4">{value.description}</p>
                                                <div className="row align-items-stretch mb-4">
                                                    <div className="col-sm-12 pl-sm-0 fix_addwish mb-2">
                                                        <button type='button' className='btn-warning btn btn-sm btn-block'><AiOutlineShoppingCart /> Thêm giỏ hàng</button>
                                                    </div>
                                                    <div className="col-sm-12 pl-sm-0 fix_addwish">
                                                        <a className="btn btn-dark btn-sm btn-block">
                                                            <i className="far fa-heart mr-2"></i>Thêm danh sách yêu thích</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {/* -------------Modal Product----------------- */}

            <section className="py-5">
                <div className="container p-0">
                    <div className="row">
                        <div className="col-lg-12 mb-5 mb-lg-0">
                            <div className="row mb-3 align-items-center">

                                {/* ------------------Search----------------- */}
                                {/* <Search handlerSearch={handlerSearch} /> */}
                                <div className="col-lg-4">
                                    <input
                                        className="form-control form-control-lg"
                                        type="text"
                                        placeholder="Sản phẩm cần tìm..."
                                        onChange={onChangeText}
                                    />
                                </div>
                                {/* ------------------Search----------------- */}

                                <div className="col-lg-8">
                                    <ul className="list-inline d-flex align-items-center justify-content-lg-end mb-0">
                                        <li className="list-inline-item">
                                            <SortProduct handlerChangeSort={handlerChangeSort} />
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='row'>
                                {
                                    products && products.map(value => {
                                        return (
                                            <CardProduct itemProduct={value} sort={sort} />
                                        )
                                    }
                                    )}
                            </div>

                            <Pagination pagination={pagination} handlerChangePage={handlerChangePage} totalPage={totalPage} />

                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;