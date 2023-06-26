import React from 'react'
import '../category-item/category-item.component'
import './menu.styles.scss'
import Card from '../category-item/category-item.component'
import data from './data.json'

export default function Menu() {
    return (
        <div className="categories-container">
          {
            data.map((category) => (
              <Card key={category.id} category={category} />
            ))
          }
        </div>
  )
}
