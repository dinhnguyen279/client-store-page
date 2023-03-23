import React from 'react';
import { Link } from 'react-router-dom';
function LogoutLink(props) {
    return (
        <>
            <li style={{ fontWeight: "600" }}>
                <Link className="nav-link" to={`/signin`} onClick={() => props.reloadPage()}>
                    Đăng nhập
                </Link>
            </li>
            <li className='d-none d-lg-block'>
                {"|"}
            </li>
            <li style={{ fontWeight: "600" }}>
                <Link className="nav-link" to={`/signup`} onClick={() => props.reloadPage()}>
                    Đăng ký
                </Link>
            </li>
        </>
    );
}

export default LogoutLink;