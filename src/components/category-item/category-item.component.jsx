import React from 'react'
import './category-item.styles.scss'
import { Link } from 'react-router-dom';

export default function Card({ category }) {
  const { imageUrl, title } = category;
  return (
    <div className="category-container">
        <div className='background-image' style={{
            backgroundImage: `url(${imageUrl})`
        }} />
        <Link to={`shop/${title}`}  className="category-body-container">
            <h2>{title}</h2>
            <p>Shop Now</p>
        </Link>
      </div>
  )
}
