import React from "react";

const TermsOfService = () => {
  return (
    <div className="main-cart">
      <div className="py-2 bg-light">
        <div className="container">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href='/'>Trang chủ</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Chính sách đổi trả
            </li>
          </ol>
        </div>
      </div>
      <div className="container header-TermsOfService">
        <h3 className="mb-3">Điều khoảng dịch vụ</h3>
        <div className="mb-3">
          <h6 className="mb-3">1. Giới thiệu</h6>
          <p>
            Chào mừng quý khách hàng đến với website chúng tôi.
          </p>
          <p>
            Khi quý khách hàng truy cập vào trang website của chúng tôi có nghĩa là quý khách đồng ý
            với các điều khoản này. Trang web có quyền thay đổi, chỉnh sửa, thêm
            hoặc lược bỏ bất kỳ phần nào trong Điều khoản mua bán hàng hóa này, vào
            bất cứ lúc nào. Các thay đổi có hiệu lực ngay khi được đăng trên trang
            web mà không cần thông báo trước. Và khi quý khách tiếp tục sử dụng
            trang web, sau khi các thay đổi về Điều khoản này được đăng tải, có
            nghĩa là quý khách chấp nhận với những thay đổi đó.
          </p>
          <p>
            Quý khách hàng vui lòng kiểm tra thường xuyên để cập nhật những thay đổi của chúng tôi.
          </p>
        </div>
        <div className="mb-3">
          <h6 className="mb-3">2. Hướng dẫn sử dụng website</h6>
          <p>
            Khi vào web của chúng tôi, khách hàng phải đảm bảo đủ 18 tuổi, hoặc truy
            cập dưới sự giám sát của cha mẹ hay người giám hộ hợp pháp. Khách hàng
            đảm bảo có đầy đủ hành vi dân sự để thực hiện các giao dịch mua bán hàng
            hóa theo quy định hiện hành của pháp luật Việt Nam.
          </p>
          <p>
            Trong suốt quá trình ký, quý khách đồng ý nhận email quảng cáo từ website. Nếu không
            muốn tiếp tục nhận mail, quý khách có thể từ chối bằng cách nhấp vào
            đường link ở dưới cùng trong mọi email quảng cáo.
          </p>
        </div>
        <div className="mb-3">
          <h6 className="mb-3">3. Thanh toán an toàn và tiện lợi</h6>
          <p>
            Người mua có thể tham khảo các phương thức thanh toán sau đây và lựa chọn áp dụng phương thức phù hợp:
          </p>
          <p><b>Cách 1</b>: Thanh toán trực tiếp (người mua nhận hàng tại địa chỉ người bán)</p>
          <p><b>Cách 2</b> : Thanh toán sau (COD – giao hàng và thu tiền tận nơi)</p>
          <p><b>Cách 3</b>: Thanh toán online qua thẻ tín dụng, chuyển khoản</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
