import React from 'react';

function Scenario() {
  return (
    <div id="scenario" className="tab-content">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">The Scenario: Barnet FC's Challenge</h2>
      {/* Assuming the image will be in public/images/ and accessible at /images/barnet_fc_stadium.jpg */}
      <img
        src="/images/barnet_fc_stadium.jpg"
        alt="Barnet FC Stadium"
        className="rounded-lg shadow-md mb-6 w-full md:w-1/2 float-right ml-6"
      />
      <p className="text-gray-700 mb-4 clear-both">
        Barnet FC, a historic football club, is facing a period of significant challenges and opportunities. After being relegated from the English Football League (EFL) a few seasons ago, the club is currently competing in the National League. The board of directors has identified a critical need to improve the club's overall business operations, fan engagement, and financial sustainability to support their ambition of returning to the EFL and establishing a stronger community presence.
      </p>
      <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Key Areas of Concern:</h3>
      <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
        <li>Declining match attendance and season ticket sales.</li>
        <li>Limited revenue streams beyond ticket sales and basic sponsorships.</li>
        <li>Outdated digital presence and fan engagement strategies.</li>
        <li>Need for improved community outreach and involvement.</li>
        <li>Financial constraints impacting investment in players and facilities.</li>
      </ul>
      <p className="text-gray-700 mb-4">
        As a business analyst, you have been brought in to help Barnet FC identify key issues, analyze the current situation, and propose actionable recommendations. This workshop will take you through several analysis techniques to build a comprehensive understanding and a strategic plan.
      </p>
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Your Task!</p>
        <p>Begin by exploring the PESTLE analysis to understand the macro-environmental factors affecting Barnet FC.</p>
      </div>
    </div>
  );
}

export default Scenario;
