import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
    return (
        <header>
            <h1 className="header-title"><Link to="/" className="unlink">🛒MyCartList🍞</Link></h1>
            <h3><Link to="/usage" className="unlink"> - How to use -</Link></h3>
        </header>
    )
}