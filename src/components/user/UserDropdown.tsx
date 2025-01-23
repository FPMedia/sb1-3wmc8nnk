import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Clock } from 'lucide-react';
import { Dropdown } from '../ui/Dropdown';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import { showSuccess } from '../../utils/toast';

export function UserDropdown() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    showSuccess('Signed out successfully');
    navigate('/');
  };

  return (
    <Dropdown
      trigger={
        <button className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
          <User className="h-5 w-5 text-gray-600" />
          <span className="text-sm text-gray-700">{user.phone}</span>
        </button>
      }
    >
      <div className="py-1">
        <div className="px-4 py-2 text-sm text-gray-500 border-b">
          {user.phone}
        </div>
        <Link
          to="/profile"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Profile Settings</span>
          </div>
        </Link>
        <Link
          to="/orders"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Order History</span>
          </div>
        </Link>
        <button
          onClick={handleSignOut}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </div>
        </button>
      </div>
    </Dropdown>
  );
}