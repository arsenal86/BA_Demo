import React from 'react';

function Sidebar({ activeTab, setActiveTab, openModal }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'scenario', label: 'The Scenario' },
    { id: 'pestle', label: 'PESTLE Analysis' },
    { id: 'stakeholder', label: 'Stakeholder Analysis' },
    { id: 'catwoe', label: 'CATWOE Analysis' },
    // 'The Twist!' is handled separately
    { id: 'presentations', label: 'Presentations & Wrap-up' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
      <h1 className="text-2xl font-bold">Barnet FC</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={`block py-2 px-4 rounded hover:bg-gray-700 ${
              activeTab === item.id ? 'bg-gray-700' : '' // More explicit active class based on prop
            }`}
            onClick={(e) => {
              e.preventDefault();
              setActiveTab(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#"
          id="twist-link"
          className="block py-2 px-4 rounded hover:bg-gray-700"
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
        >
          The Twist!
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;
