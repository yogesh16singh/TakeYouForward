"use client";
import React from "react";
import Link from "next/link";

import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Take You Forward </h1>
      <div className="nav-buttons">
        <Link href="/">
          <button>Home</button>
        </Link>
        <Link href="/submissions">
          <button>Submissions</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
