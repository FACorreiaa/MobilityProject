import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientNav() {
  return (
    <div>
      <nav style={{ fontFamily: 'monospace' }}>
        <div className='nav-wrapper'>
          <a href='#' className='brand-logo right'>
            MERN
          </a>
          <ul id='nav-mobile' className='center hide-on-med-and-down'>
            <li>
              <Link to='/main'>List of Vehicles</Link>
            </li>
            <li>
              <Link to='/searchVehicles'>Search Vehicles</Link>
            </li>
            <li>
              <Link to='/balance'>Balance</Link>
            </li>
            <li>
              <Link to='/checkin'>Checkin</Link>
            </li>
            <li>
              <Link to='/logout'>Logout</Link>
            </li>

            {/* <li>
              <Link to='/profile'>Profile</Link>
            </li> */}
          </ul>
        </div>
      </nav>
    </div>
  );
}
