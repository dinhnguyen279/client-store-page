import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import LoginLink from './LoginLink';
import mainLayoutFacade from '../utils/mainLayoutFacade';

function Name(props) {
  const layoutFacade = mainLayoutFacade.useFacade();
  const idUser = layoutFacade.idUser;
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getDetailData(idUser);
      setName(response.data.fullname);
    };
    fetchData();
  }, []);
  const handleUserNone = () => {
    // hàm này check người dùng đăng nhập chưa
    if (!idUser) {
      return redirect('/signin');
    }
  };

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        style={{ cursor: 'pointer' }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user-alt mr-1 text-gray"></i>
        {name}
      </a>
      <div className="dropdown-menu mt-3 name-item" aria-labelledby="pagesDropdown">
        <a className="dropdown-item border-0 transition-link" href="/detail-user" onClick={handleUserNone}>
          Thông tin người dùng
        </a>
        <LoginLink />
      </div>
    </li>
  );
}

export default Name;
