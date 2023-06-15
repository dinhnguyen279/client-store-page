import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { HOST } from "../../domain/host/host";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";



const EditProfileUser = (props) => {
  const URL_UPDATEUSER = `${HOST}/updateUser`;

  const dataUser = props.getDataUser;
  const setGetData = props.setGetDataUser;
  const [typePassWord, setTypePassWord] = useState("password");
  const [avatarUpload, setAvatarUpload] = useState("")

  const onChangeAvatar = (e) => {
    setAvatarUpload(e.target.files[0]);
  }

  useEffect(() => {
    const upLoadImages = async () => {
      if (avatarUpload) {
        const formData = new FormData();
        formData.append("file", avatarUpload)
        try {
          const response = await axios.post(`${HOST}/upload-cloud`, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          dataUser.avatar = response.data.avatar
        }
        catch (err) {
          console.error("err upload image cloud", err);
        }
      }
    }
    upLoadImages()
  }, [avatarUpload])

  const onSubmit = async (id) => {
    await axios
      .put(`${URL_UPDATEUSER}/${id}`, dataUser)
      .then((res) => {
        console.log("res", res)
        alertify.set("notifier", "position", "top-right");
        alertify.success("Bạn Đã Cập Nhật Thông Tin Thành Công!");
        setTimeout(function () {
          window.location.reload();
        }, 1200);
      }
      )
      .catch((err) => {
        console.error("err", err)
        alertify.set("notifier", "position", "top-right");
        alertify.error("Cập Nhật Thông Tin Thất Bại!");
      }
      );
  };


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h5 className="text-uppercase text-dark">Cập nhật thông tin</h5>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="input-edit-user">
          <Form.Group
            className="mb-4 main-img-profile"
            controlId="formBasicEmail"
          >
            <img
              src={dataUser.avatar}
              alt="Hình ảnh người dùng"
              className="img-profile"
            />
            <input type="file" onChange={onChangeAvatar}
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
              value={dataUser.fullname}
              onChange={(e) =>
                setGetData({ ...dataUser, fullname: e.target.value })
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
              type="address"
              placeholder=" "
              value={dataUser.address}
              onChange={(e) =>
                setGetData({ ...dataUser, address: e.target.value })
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
              type="date"
              placeholder=" "
              value={dataUser.birthday}
              onChange={(e) =>
                setGetData({ ...dataUser, birthday: e.target.value })
              }
            />
            <Form.Label className="form-label">Sinh nhật</Form.Label>
          </Form.Group>

          <Form.Group
            className="mb-3 input-text position-relative"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="form-input-user mw-100"
              type="text"
              placeholder=" "
              value={dataUser.sex}
              onChange={(e) =>
                setGetData({ ...dataUser, sex: e.target.value })
              }
            />
            <Form.Label className="form-label">Giới tính</Form.Label>
          </Form.Group>

          <Form.Group
            className="mb-3 input-text position-relative"
            controlId="formBasicEmail"
          >
            <Form.Control
              className="form-input-user mw-100"
              type="phone"
              placeholder=" "
              value={dataUser.phone}
              onChange={(e) =>
                setGetData({ ...dataUser, phone: e.target.value })
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
              value={dataUser.email}
              onChange={(e) =>
                setGetData({ ...dataUser, email: e.target.value })
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
              type={typePassWord}
              placeholder=" "
              value={dataUser.password}
              onChange={(e) =>
                setGetData({ ...dataUser, password: e.target.value })
              }
            />
            <Form.Label className="form-label">Mật Khẩu</Form.Label>
            {typePassWord === "password" ? (
              <button
                type="button"
                className="show-password-editprofile"
                onClick={() => setTypePassWord("text")}
              >
                <AiFillEye />
              </button>
            ) : (
              <button
                type="button"
                className="show-password-editprofile"
                onClick={() => setTypePassWord("password")}
              >
                <AiFillEyeInvisible />
              </button>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="w-100"
          onClick={() => onSubmit(dataUser._id)}
        >
          Cập nhật
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileUser;
