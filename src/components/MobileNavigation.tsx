import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  User, 
  Settings, 
  Menu, 
  FileText, 
  Users,
  ChevronDown,
  ChevronUp,
  Shield
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function MobileNavigation() {
  const { user, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAdminExpanded, setIsAdminExpanded] = React.useState(false);

  const mainNavItems = [
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
    }
  ];

  const adminNavItems = [
    {
      to: '/admin/designs',
      icon: <ShoppingBag className="h-5 w-5" />,
      label: 'Manage Designs'
    },
    {
      to: '/admin/orders',
      icon: <FileText className="h-5 w-5" />,
      label: 'Orders'
    },
    {
      to: '/admin/customers',
      icon: <Users className="h-5 w-5" />,
      label: 'Customers'
    }
  ];

  const visibleItems = mainNavItems.filter(item => {
    if (item.requiresAuth && !user) return false;
    return true;
  });

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-indigo-600"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-600 hover:text-indigo-600"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 px-4 py-2 overflow-y-auto">
              {/* Main Navigation Items */}
              {visibleItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 text-lg font-medium rounded-lg mb-2
                    ${isActive 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : 'text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </NavLink>
              ))}

              {/* Admin Section */}
              {isAdmin && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-2 px-4 py-2 text-sm text-gray-600">
                    <Shield className="h-4 w-4 mr-2 text-indigo-600" />
                    <span>Admin Area</span>
                  </div>
                  
                  <button
                    onClick={() => setIsAdminExpanded(!isAdminExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Settings className="h-5 w-5" />
                      <span className="ml-3">Admin</span>
                    </div>
                    {isAdminExpanded ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  {isAdminExpanded && (
                    <div className="ml-4 mt-2 space-y-1">
                      {adminNavItems.map((item) => (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive }) => `
                            flex items-center px-4 py-3 text-lg font-medium rounded-lg
                            ${isActive 
                              ? 'bg-indigo-50 text-indigo-600' 
                              : 'text-gray-700 hover:bg-gray-50'}
                          `}
                        >
                          {item.icon}
                          <span className="ml-3">{item.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}