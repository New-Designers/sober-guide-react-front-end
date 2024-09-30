// src/components/NavBar.tsx
import React, { useState } from 'react';
import './NavBar.module.css';

const NavBar: React.FC = () => {

  const [activeIndex, setActiveIndex] = useState<number | null>(null);


  const setActive = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <nav className="nav-bar">
      <a href="#" onClick={() => setActive(0)}>
        {activeIndex === 0 ? (
          <i className="bi bi-house-door-fill"></i>
        ) : (
          <i className="bi bi-house-door"></i>
        )}
      </a>

      <a href="#" onClick={() => setActive(1)}>
        {activeIndex === 1 ? (
          <i className="bi bi-clock-fill"></i>
        ) : (
          <i className="bi bi-clock"></i>
        )}
      </a>

      <a href="#" onClick={() => setActive(2)}>
        {activeIndex === 2 ? (
          <i className="bi bi-geo-alt-fill"></i>
        ) : (
          <i className="bi bi-geo-alt"></i>
        )}
      </a>

      <a href="#" onClick={() => setActive(3)}>
        {activeIndex === 3 ? (
          <i className="bi bi-bag-heart-fill"></i>
        ) : (
          <i className="bi bi-bag-heart"></i>
        )}
      </a>

      <a href="#" onClick={() => setActive(4)}>
        {activeIndex === 4 ? (
          <i className="bi bi-gift-fill"></i>
        ) : (
          <i className="bi bi-gift"></i>
        )}
      </a>

      <a href="#" onClick={() => setActive(5)}>
        {activeIndex === 5 ? (
          <i className="bi bi-person-arms-up"></i>
        ) : (
          <i className="bi bi-person-walking"></i>
        )}
      </a>

      <a href="#" onClick={() => setActive(6)}>
        {activeIndex === 6 ? (
          <i className="bi bi-journal-bookmark-fill"></i>
        ) : (
          <i className="bi bi-journal-bookmark"></i>
        )}
      </a>
    </nav>
  );
};

export default NavBar;
