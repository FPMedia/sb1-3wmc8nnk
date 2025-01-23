import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Settings, 
  ShoppingBag, 
  Users, 
  FileText,
  ChevronDown,
  ChevronUp,
  Shield
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function AdminMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  // Only render if user is admin
  if (!isAdmin) return null;

  return (
    <div className="relative flex items-center">
      <div className="flex items-center mr-3 text-sm">
        <Shield className="h-4 w-4 mr-1 text-indigo-600" />
        <span className="text-gray-600">
          Role: <span className="font-medium text-indigo-600">Admin</span>
        </span>
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 group"
      >
        <Settings className="h-4 w-4 mr-2 group-hover:rotate-90 transition-transform" />
        Admin
        {isOpen ? (
          <ChevronUp className="h-4 w-4 ml-1" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-1" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 top-full">
          <Link
            to="/admin/designs"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Manage Designs
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <FileText className="h-4 w-4 mr-2" />
            Orders
          </Link>
          <Link
            to="/admin/customers"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Users className="h-4 w-4 mr-2" />
            Customers
          </Link>
        </div>
      )}
    </div>
  );
}