import React from 'react';

function Footer(props) {
    return (
        <footer className="bg-dark text-white">
            <div className="container py-4">
                <div className="row py-5">
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h6 className="text-uppercase mb-3">Chính sách khách hàng</h6>
                        <ul className="list-unstyled mb-0">
                            <li><a className="footer-link" href="/">Bảo hành &amp; Đỗi trả</a></li>
                            <li><a className="footer-link" href="/">Chính sách bảo mật</a></li>
                            <li><a className="footer-link" href="/">Chính sách vận chuyển</a></li>
                            <li><a className="footer-link" href="/">Hướng dẫn mua hàng</a></li>
                            <li><a className="footer-link" href="/">Quy định &amp; Điều khoản</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-3 mb-md-0">
                        <h6 className="text-uppercase mb-3">Thông tin liên hệ</h6>
                        <ul className="list-unstyled mb-0">
                            <li><a className="footer-link" href="/">Gọi mua hàng:  0935 90 3666 (8h30 - 21h30)</a></li>
                            <li><a className="footer-link" href="/">Gọi khiếu nại: 096 893 89 88 - 079 01 23456 (9h00 - 20h00)</a></li>
                            <li><a className="footer-link" href="/">Gọi tư vấn:  0935 90 7979 (8h30 - 21h30)</a></li>
                            <li><a className="footer-link" href="/">Gọi bảo hành: 0935 90 7979 - 079 01 23456 (10h00 - 20h00)</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h6 className="text-uppercase mb-3">TDT Store</h6>
                        <ul className="list-unstyled mb-0">
                            <li><a className="footer-link" href="/">Địa chỉ: 55 Trần Văn Quang, Phường 10, Quận Tân Bình.</a></li>
                            <li><a className="footer-link" href="/">Số điện thoại: 085 432 2789 - 093 596 8794</a></li>
                            <li><a className="footer-link" href="/">Email: thuantran347@gmail.com</a></li>
                            <li><a className="footer-link" href="/">Thời gian mở của: 8:30 - 21:30</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-top pt-4" style={{ borderColor: '#1d1d1d !important' }}>
                    <div className="row">
                        <div className="col-lg-6">
                            <p className="small text-muted mb-0">&copy; 2023 All rights reserved.</p>
                        </div>
                        <div className="col-lg-6 text-lg-right">
                            <p className="small text-muted mb-0">Thuan Nguyen</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;