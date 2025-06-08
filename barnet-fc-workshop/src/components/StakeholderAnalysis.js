import React from 'react';

function StakeholderAnalysis() {
  const stakeholders = [
    { group: 'Fans & Supporters', interests: 'Club success, matchday experience, ticket prices, club identity', influence: 'High (collectively)' },
    { group: 'Players & Coaching Staff', interests: 'Competitive salaries, good facilities, team performance, career development', influence: 'High' },
    { group: 'Board of Directors & Owners', interests: 'Financial stability, long-term vision, club reputation, return on investment', influence: 'Very High' },
    { group: 'Sponsors & Partners', interests: 'Brand exposure, corporate social responsibility, return on investment', influence: 'Medium to High' },
    { group: 'Local Community', interests: "Community programs, club's impact on local area, pride", influence: 'Medium' },
    { group: 'Governing Bodies (e.g., FA, National League)', interests: 'Compliance with regulations, league integrity, sport development', influence: 'High' },
  ];

  return (
    <div id="stakeholder" className="tab-content">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Stakeholder Analysis</h2>
      <p className="text-gray-700 mb-6">
        Identify key stakeholders of Barnet FC and analyze their interests, influence, and potential impact on the club's objectives. This involves creating a stakeholder map or matrix.
      </p>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto"> {/* Added overflow-x-auto for responsiveness */}
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Stakeholder Groups</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stakeholder Group</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interests</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Influence/Power</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stakeholders.map((stakeholder, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stakeholder.group}</td>
                <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{stakeholder.interests}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stakeholder.influence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Next Steps:</p>
        <p>Consider how to engage with each stakeholder group. Proceed to CATWOE analysis to define key transformations needed.</p>
      </div>
    </div>
  );
}

export default StakeholderAnalysis;
