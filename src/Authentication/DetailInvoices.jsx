import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DetailInvoices(props) {
    const dataDetail = props.dataDetail

    // hàm này tách sản phẩm trong bill ra
    const listProduct = [];
    const listNameProduct = dataDetail.nameProduct.split(",");
    const listImage = dataDetail.avt
    const listFullName = dataDetail.fullname;
    const listPrice = dataDetail.price.split(",");
    const listQuantity = dataDetail.quantity.split(",");
    const listSize = dataDetail.size.split(",");
    const total = dataDetail.total;
    for (let i = 0; i < listNameProduct.length; i++) {
        const oBill = {}
        oBill.name = listNameProduct[i];
        oBill.fullname = listFullName;
        oBill.price = listPrice[i];
        oBill.quantity = listQuantity[i];
        oBill.size = listSize[i];
        oBill.avt = listImage[i];
        oBill.total = total;
        listProduct.push(oBill);
        // console.log(oBill.avt);
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thông tin hóa đơn
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><b>Người nhận: {dataDetail.fullname}</b></p>
                {listProduct && listProduct.map((val, idx) => {
                    return (
                        <div>
                            <div className="detail-invoices content-order" key={idx + 1}>
                                <div>
                                    <div>
                                        <img src={val.avt} alt="" className='img-invoices' />
                                    </div>
                                    <p><b>{val.name}</b></p>
                                    <p><b>x{val.quantity}</b></p>
                                    <p><b>Size: {val.size}</b></p>
                                </div>
                                <div>
                                    <p><b>₫{parseInt(val.price).toLocaleString()}</b></p>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    )
                })}
                {/* <img src={dataDetail.avt} alt="" className='img-invoices' /> */}
                <p>Tổng: {dataDetail.total}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default DetailInvoices;