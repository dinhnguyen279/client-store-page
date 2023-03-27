import React from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import FileBase64 from "react-file-base64";
import { HOST } from "../domain/host/host";
import axios from "axios";
const EditProfileUser = (props) => {
  const URL_UPDATEUSER = `${HOST}/updateUser`;

  const getDataUser = props.getDataUser;
  const setGetDataUser = props.setGetDataUser;

  const onSubmit = async (id) => {
    await axios
      .put(`${URL_UPDATEUSER}/${id}`, getDataUser)
      .then((res) => console.log("res", res))
      .catch((err) => console.error("err", err));
    alertify.set("notifier", "position", "top-right");
    alertify.success("Bạn Đã cập nhật thông tin Thành Công!");
    setTimeout(function () {
      window.location.reload();
    }, 1200);
  };

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
          <Form.Group
            className="mb-4 main-img-profile"
            controlId="formBasicEmail"
          >
            <img
              src={getDataUser.avatar}
              alt="Hình ảnh người dùng"
              className="img-profile"
            />
            <FileBase64
              accept="image/*"
              multiple={false}
              type="file"
              className="form-control-file"
              id="image"
              value={getDataUser.avatar}
              onDone={({ base64 }) =>
                setGetDataUser({ ...getDataUser, avatar: base64 })
              }
            />
          </Form.Group>

          <Form.Group
            className="mb-3 input-text position-relative"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="form-input-user mw-100"
              type="name"
              placeholder=" "
              value={getDataUser.fullname}
              onChange={(e) =>
                setGetDataUser({ ...getDataUser, fullname: e.target.value })
              }
            />
            <Form.Label className="form-label">Họ và Tên</Form.Label>
          </Form.Group>

          <Form.Group
            className="mb-3 input-text position-relative"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="form-input-user mw-100"
              type="phone"
              placeholder=" "
              value={getDataUser.phone}
              onChange={(e) =>
                setGetDataUser({ ...getDataUser, phone: e.target.value })
              }
            />
            <Form.Label className="form-label">Số điện thoại</Form.Label>
          </Form.Group>

          <Form.Group
            className="mb-3 input-text position-relative"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="form-input-user mw-100"
              type="email"
              placeholder=" "
              value={getDataUser.email}
              onChange={(e) =>
                setGetDataUser({ ...getDataUser, email: e.target.value })
              }
            />
            <Form.Label className="form-label">Email</Form.Label>
          </Form.Group>

          <Form.Group
            className="mb-3 input-text position-relative"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="form-input-user mw-100"
              type="address"
              placeholder=" "
              value={getDataUser.address}
              onChange={(e) =>
                setGetDataUser({ ...getDataUser, address: e.target.value })
              }
            />
            <Form.Label className="form-label">Địa chỉ</Form.Label>
          </Form.Group>

          <Form.Group
            className="mb-3 input-text position-relative"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="form-input-user mw-100"
              type="password"
              placeholder=" "
              value={getDataUser.password}
              onChange={(e) =>
                setGetDataUser({ ...getDataUser, password: e.target.value })
              }
            />
            <Form.Label className="form-label">Mật Khẩu</Form.Label>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="w-100"
          onClick={() => onSubmit(getDataUser._id)}
        >
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileUser;
