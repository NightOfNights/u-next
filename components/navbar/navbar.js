import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/client';

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
      <div className="navbar__item" onClick={signOut}>
        Sign out
      </div>
    </div>
  );
};

export default Navbar;
