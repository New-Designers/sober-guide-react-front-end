import React from 'react';
import './BodyTop.css';

function BodyTop() {
  const setActive = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.currentTarget;
    const icons = target.querySelectorAll('i');
    if (icons.length === 2) {
      icons[0].style.display = icons[0].style.display === 'none' ? '' : 'none';
      icons[1].style.display = icons[1].style.display === 'none' ? '' : 'none';
    }
  };

  return (
    <div className="body-top">
      <button className="back-button">
        <i className="bi bi-arrow-left"></i>
      </button>
      <nav className="nav-bar">
        <a href="#" onClick={(e) => setActive(e)}>
          <i className="bi bi-house-door"></i>
          <i className="bi bi-house-door-fill" style={{ display: 'none' }}></i>
        </a>

        <a href="#" onClick={(e) => setActive(e)}>
          <i className="bi bi-clock"></i>
          <i className="bi bi-clock-fill" style={{ display: 'none' }}></i>
        </a>

        <a href="../location/location.html" onClick={(e) => setActive(e)}>
          <i className="bi bi-geo-alt"></i>
          <i className="bi bi-geo-alt-fill" style={{ display: 'none' }}></i>
        </a>

        <a href="#" onClick={(e) => setActive(e)}>
          <i className="bi bi-bag-heart"></i>
          <i className="bi bi-bag-heart-fill" style={{ display: 'none' }}></i>
        </a>

        <a href="#" onClick={(e) => setActive(e)}>
          <i className="bi bi-gift"></i>
          <i className="bi bi-gift-fill" style={{ display: 'none' }}></i>
        </a>

        <a href="#" onClick={(e) => setActive(e)}>
          <i className="bi bi-person-walking"></i>
          <i className="bi bi-person-arms-up" style={{ display: 'none' }}></i>
        </a>

        <a href="#" onClick={(e) => setActive(e)}>
          <i className="bi bi-journal-bookmark"></i>
          <i className="bi bi-journal-bookmark-fill" style={{ display: 'none' }}></i>
        </a>
      </nav>

      <div>
        <a href="#">
          <img src="https://via.placeholder.com/50" alt="User Avatar" className="user-avatar" />
        </a>
      </div>

      <input type="text" className="search-bar" placeholder="  Search..." />
    </div>
  );
}

export default BodyTop;
