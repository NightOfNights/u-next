import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link href={'/'}>
        <a className="navbar__item">Home</a>
      </Link>
      <Link href={'/store'}>
        <a className="navbar__item">Products</a>
      </Link>
      <Link href={'/cart'}>
        <a className="navbar__item">Cart</a>
      </Link>
    </div>
  );
};

export default Navbar;
