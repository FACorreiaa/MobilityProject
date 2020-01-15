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
              <Link to='/searchVehicles'>Search Vehicles</Link>
            </li>
            <li>
              <Link to='/balance'>Balance</Link>
            </li>
            <li>
              <Link to='/checkin'>Checkin</Link>
            </li>
            <li>
              <Link to='/checkout'>Checkout</Link>
            </li>
            <li>
              <Link to='/consult'>Consult</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
