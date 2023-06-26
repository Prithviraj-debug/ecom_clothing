import React from 'react'
import { Outlet } from 'react-router-dom'
import Menu from '../../components/menu/menu.component'

export default function Home() {
  return (
    <div>
        <div>
            <Outlet />
            <Menu />
        </div>
    </div>
  )
}
