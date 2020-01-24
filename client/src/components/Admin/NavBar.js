import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div>
      <nav style={{ fontFamily: 'monospace' }}>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo right'>
            MERN
          </a>
          <ul id='nav-mobile' className='center hide-on-med-and-down'>
            <li>
              <Link to='/validateUsers'>Validate Users</Link>
            </li>
            <li>
              <Link to='/checkParkings'>Check Parkings</Link>
            </li>
            <li>
              <Link to='/marParkings'>Visualize Parkings</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
