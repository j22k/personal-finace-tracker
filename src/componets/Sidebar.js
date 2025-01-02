import React, { useState } from 'react';
import { MenuIcon, X, PieChart, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import Income from './Income'; // Import Income component
import Expenses from './Expenses'; // Import Expenses component
import PiechartExpenses from './PiechartExpenses'; // Import PiechartExpenses component
import Overview from './Overview';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState('Overview'); // Track active menu item

  const menuItems = [
    { title: 'Overview', icon: <PieChart size={20} /> },
    { title: 'Income', icon: <ArrowUpCircle size={20} /> },
    { title: 'Expense', icon: <ArrowDownCircle size={20} /> }
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case 'Income':
        return <Income />;
      case 'Expense':
        return <Expenses />;
      default:
        return <Overview />;
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700"
      >
        {isOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-800 text-white z-40
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:w-64
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}
      `}>
        {/* Logo/Header */}
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>

        {/* Menu Items */}
        <nav className="mt-6">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${activeMenu === item.title ? 'bg-gray-700 text-white' : ''}`}
              onClick={() => setActiveMenu(item.title)} // Update active menu
            >
              <span className="mr-4">{item.icon}</span>
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="lg:ml-64 p-6">
        {renderContent()} {/* Render content based on active menu */}
      </div>
    </>
  );
};

export default Sidebar;
