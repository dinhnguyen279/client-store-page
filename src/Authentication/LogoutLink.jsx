import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUserAlt } from "react-icons/fa"
function LogoutLink(props) {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to={`/signin`}>
                    <FaUserAlt className='mr-2 text-gray' /> Đăng nhập
                </Link>
            </li>
            <li>
                {"/"}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/signup`}>
                    <FaUserPlus className='mr-2 text-gray' /> Đăng ký
                </Link>
            </li>
        </>
    );
}

export default LogoutLink;