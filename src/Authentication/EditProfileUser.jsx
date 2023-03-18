import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
const EditProfileUser = (props) => {
  const getDataUser = props.getDataUser;
  console.log("getDataUser", getDataUser);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="m-auto">
          <h2 className="h4 text-uppercase text-dark">Cập nhật thông tin</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control type="name" placeholder="Họ và tên" value={getDataUser.fullname} />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="phone" placeholder="Số điện thoại" value={getDataUser.phone} />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="email" value={getDataUser.email} />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Địa chỉ</Form.Label>
            <Form.Control type="address" placeholder="address" value={getDataUser.address} />
            {/* <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text> */}
          </Form.Group>

          <Button type="submit">Cập nhật</Button>
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
