import React, { useState, useEffect } from 'react';
import './Nav.css'

function Nav() {

    const [show, handleshow] = useState(false)

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          handleshow(true)
        } else handleshow(false);
      });
      return () => {
        window.removeEventListener("scroll")
      }
    }, []);
    
    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/255px-Netflix_2015_logo.svg.png" 
            alt="Netflix Logo" 
            className="nav__logo"/>

            <img 
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" 
            alt="Netflix Logo" 
            className="nav__avatar"/>
        </div>
    );
}

export default Nav
