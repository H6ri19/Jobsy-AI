import React, { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Navbar from './Navbar';
import Footer from './Footer';

const DashboardLayout = ({ activeMenu, children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar activeMenu={activeMenu} />

      {/* Main Content */}
      {user && (
        <main className="flex-1 container mx-auto pt-4 pb-10 px-4 md:px-0">
          {children}
        </main>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DashboardLayout;
