import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { CartIcon } from './cart/CartIcon';
import { AdminMenu } from './admin/AdminMenu';
import { UserDropdown } from './user/UserDropdown';
import { supabase } from '../lib/supabase';
import { showSuccess } from '../utils/toast';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    showSuccess('Signed out successfully');
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://cms.erzo.co.za/jolo-logo-phone.png" 
                alt="JOLO Designs Logo" 
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <AdminMenu />
            <CartIcon />
            {user ? (
              <>
                <UserDropdown />
                <button
                  onClick={handleSignOut}
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}