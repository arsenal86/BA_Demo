import React, { useState } from 'react';
import './App.css'; // Assuming App.css will be created or index.css is properly set up
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Scenario from './components/Scenario';
import PestleAnalysis from './components/PestleAnalysis';
import StakeholderAnalysis from './components/StakeholderAnalysis';
import CatwoeAnalysis from './components/CatwoeAnalysis';
import Presentations from './components/Presentations';
import TwistModal from './components/TwistModal';
import Timer from './components/Timer';
import Footer from './components/Footer';
// Ensure src/index.css (which should contain Tailwind directives and original styles)
// is imported, typically in src/index.js. If not, import it here.
// import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isModalOpen, setModalOpen] = useState(false);

  // Placeholder for the main layout structure from index.html
  // This will be a simplified version for now, focusing on component integration.
  // The actual HTML structure from the original index.html needs to be adapted here.
  return (
    <div className="flex h-screen bg-gray-100"> {/* Example main container class */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} openModal={() => setModalOpen(true)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          {activeTab === 'home' && <Home />}
          {activeTab === 'scenario' && <Scenario />}
          {activeTab === 'pestle' && <PestleAnalysis />}
          {activeTab === 'stakeholder' && <StakeholderAnalysis />}
          {activeTab === 'catwoe' && <CatwoeAnalysis />}
          {activeTab === 'presentations' && <Presentations />}
          {/* Add other tab renderings here if any were missed */}
        </main>
        <Footer />
      </div>
      <Timer />
      {isModalOpen && <TwistModal closeModal={() => setModalOpen(false)} />}
    </div>
  );
}

export default App;
