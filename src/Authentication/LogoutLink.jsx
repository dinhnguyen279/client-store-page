import React from 'react';
import { Link } from 'react-router-dom';

function LogoutLink(props) {
    return (
        <li className="nav-item">
            <Link className="nav-link" style={{ color: 'white' }} to={`/signin`}>
                <i className="fas fa-user-alt mr-2 text-gray"></i>Đăng nhập
            </Link>
        </li>
    );
}

export default LogoutLink;