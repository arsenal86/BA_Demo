import React from 'react';

function Home() {
  return (
    <div id="home" className="tab-content active"> {/* 'active' class might be redundant if App.js handles visibility exclusively */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Welcome to the Barnet FC Business Analysis Workshop</h2>
      <p className="text-gray-700 mb-4">
        This interactive workshop will guide you through various business analysis techniques using Barnet FC as a case study.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Workshop Objectives</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Understand key business analysis methodologies.</li>
            <li>Apply PESTLE, Stakeholder, and CATWOE analysis.</li>
            <li>Develop problem-solving skills in a real-world context.</li>
            <li>Practice presenting findings and recommendations.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">How to Navigate</h3>
          <p className="text-gray-600">
            Use the sidebar menu to explore different sections of the workshop. Each tab contains specific information, tasks, or analysis tools. Don't forget to check out "The Twist!" for an unexpected challenge.
          </p>
        </div>
      </div>
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Get Started!</p>
        <p>Click on "The Scenario" to begin your analysis journey with Barnet FC.</p>
      </div>
    </div>
  );
}

export default Home;
