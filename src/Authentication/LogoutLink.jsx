import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaUserAlt } from "react-icons/fa"
function LogoutLink(props) {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to={`/signin`}>
                    Đăng nhập
                </Link>
            </li>
            <li>
                {"|"}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={`/signup`}>
                    Đăng ký
                </Link>
            </li>
        </>
    );
}

export default LogoutLink;