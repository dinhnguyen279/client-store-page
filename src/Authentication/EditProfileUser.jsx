import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const EditProfileUser = (props) => {
  const getDataUser = props.getDataUser;
  console.log("getDataUser", getDataUser);
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="m-auto">
          <h2 className="h4 text-uppercase text-dark">Cập nhật thông tin</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="input-edit-user">
          <Form.Group className="mb-3 input-text position-relative" controlId="formBasicEmail">
            <Form.Control className="form-input-user mw-100" type="name" placeholder=" " value={getDataUser.fullname} />
            <Form.Label className="form-label">Họ và Tên</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 input-text position-relative" controlId="formBasicEmail">
            <Form.Control className="form-input-user mw-100" type="phone" placeholder=" " value={getDataUser.phone} />
            <Form.Label className="form-label">Số điện thoại</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 input-text position-relative" controlId="formBasicEmail">
            <Form.Control className="form-input-user mw-100" type="email" placeholder=" " value={getDataUser.email} />
            <Form.Label className="form-label">Email</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3 input-text position-relative" controlId="formBasicEmail">
            <Form.Control className="form-input-user mw-100" type="address" placeholder=" " value={getDataUser.address} />
            <Form.Label className="form-label">Địa chỉ</Form.Label>
          </Form.Group>

          <Button className='w-100' type="submit" >Cập nhật</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileUser;
