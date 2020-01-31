import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <nav style={{ fontFamily: 'monospace' }}>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo right'>
          MOBILITY CITY
          </a>
          <ul id='nav-mobile' className='center hide-on-med-and-down'>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
