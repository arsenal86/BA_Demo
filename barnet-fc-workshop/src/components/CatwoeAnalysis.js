import React from 'react';

function CatwoeAnalysis() {
  const catwoeElements = [
    {
      letter: 'C',
      title: 'Customers',
      question: 'Who are the beneficiaries/victims of the system?',
      points: [
        'Fans (seeking entertainment, success, community)',
        'Sponsors (seeking visibility, association)',
        'Local community (impacted by club\'s activities)',
      ],
    },
    {
      letter: 'A',
      title: 'Actors',
      question: 'Who carries out the transformation or activities?',
      points: [
        'Players and coaching staff',
        'Club management and employees',
        'Volunteers',
      ],
    },
    {
      letter: 'T',
      title: 'Transformation',
      question: 'What is the core process that changes inputs to outputs?',
      text: 'Input: Underperforming club with declining engagement.\nOutput: Successful, financially stable club with strong fan and community engagement.',
    },
    {
      letter: 'W',
      title: 'Weltanschauung (Worldview)',
      question: 'What is the bigger picture or belief that makes this system meaningful?',
      text: '"Barnet FC is a vital community asset and a source of local pride that should strive for sporting excellence and financial sustainability."',
    },
    {
      letter: 'O',
      title: 'Owners',
      question: 'Who has the power to start up or shut down the system?',
      points: ['Board of Directors', 'Club Ownership'],
    },
    {
      letter: 'E',
      title: 'Environmental Constraints',
      question: 'What external constraints or limitations exist?',
      points: [
        'League regulations and financial fair play',
        'Economic climate',
        'Competition from other clubs',
        'Fan expectations and media scrutiny',
      ],
    },
  ];

  return (
    <div id="catwoe" className="tab-content">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">CATWOE Analysis</h2>
      <p className="text-gray-700 mb-6">
        Use CATWOE to analyze a business situation or problem from different perspectives. It helps in understanding the different stakeholders and their views of a system.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {catwoeElements.map((element, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-indigo-700 mb-2">{element.letter} - {element.title}</h3>
            <p className="text-gray-600 font-medium mb-1">{element.question}</p>
            {element.points && (
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {element.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}
            {element.text && (
              <p className="text-gray-600 whitespace-pre-line">{element.text}</p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 bg-purple-100 border-l-4 border-purple-500 text-purple-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Reflect and Discuss:</p>
        <p>How does this CATWOE analysis help in framing the problem and potential solutions for Barnet FC? Consider this before moving to the "Twist".</p>
      </div>
    </div>
  );
}

export default CatwoeAnalysis;
