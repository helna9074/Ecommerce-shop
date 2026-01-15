import React from 'react'
import { SIDE_MENU_DATA } from '../../Utils/data'
import { useNavigate } from 'react-router-dom'

const AdminMenu = ({ activeMenu, setSideMenu }) => {
  const navigate = useNavigate()

  const handleClick = (route) => {
    if (route === 'Logout') {
      handleLogout()
      return
    }
    navigate(route)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div className="w-full p-4 bg-slate-50 border-r border-slate-500 min-h-full">
      <div className="flex flex-col gap-3 w-full">
        {SIDE_MENU_DATA.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item.path)}
            className={`
              p-3 w-full text-left rounded-xl
              transition-all duration-300 ease-in-out
              ${
                activeMenu === item.label
                  ? 'btn-primary text-white scale-[1.02] shadow-md'
                  : 'hover:bg-slate-200'
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdminMenu
