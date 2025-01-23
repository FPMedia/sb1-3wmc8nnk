import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, User, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { MobileNavigation } from './MobileNavigation';

export function Navigation() {
  const { user, isAdmin } = useAuth();

  const navItems = [
    { 
      to: '/', 
      icon: <Home className="h-5 w-5" />, 
      label: 'Home',
      requiresAuth: false
    },
    { 
      to: '/cart', 
      icon: <ShoppingBag className="h-5 w-5" />, 
      label: 'Cart',
      requiresAuth: false
    },
    { 
      to: '/profile', 
      icon: <User className="h-5 w-5" />, 
      label: 'Profile',
      requiresAuth: true
    },
    { 
      to: '/admin/designs', 
      icon: <Settings className="h-5 w-5" />, 
      label: 'Admin',
      requiresAuth: true,
      requiresAdmin: true
    }
  ];

  const visibleItems = navItems.filter(item => {
    if (item.requiresAdmin && !isAdmin) return false;
    if (item.requiresAuth && !user) return false;
    return true;
  });

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <MobileNavigation />
          
          <div className="hidden md:flex space-x-8">
            {visibleItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 text-sm font-medium
                  ${isActive 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'}
                `}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}