import React from 'react';
import { Link } from 'react-router-dom';
function LogoutLink(props) {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to={`/signin`}>
                    Đăng nhập
                </Link>
            </li>
            <li className='d-none d-lg-block'>
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