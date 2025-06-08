import React, { useState } from 'react';

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion-item bg-white rounded-lg shadow-md">
      <button
        className="accordion-header w-full text-left p-4 font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span
          className={`float-right transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        >
          &#9660;
        </span>
      </button>
      <div
        className={`accordion-content overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? 'max-h-screen' : 'max-h-0' // Using max-h-screen for open state, ensure it's large enough
        }`}
      >
        <div className="p-4 border-t border-gray-200">{children}</div>
      </div>
    </div>
  );
};

function PestleAnalysis() {
  const pestleFactors = [
    {
      title: 'Political Factors',
      points: [
        'Government funding for sports and community clubs.',
        'Local council planning permissions for stadium development.',
        'Safety regulations and licensing for sporting events.',
        'Brexit implications on player recruitment and EU funding.',
      ],
    },
    {
      title: 'Economic Factors',
      points: [
        'Local economic conditions and disposable income of fans.',
        'Sponsorship market and corporate investment in sports.',
        'Broadcasting rights and revenue distribution.',
        'Inflation and its impact on operational costs.',
      ],
    },
    {
      title: 'Social Factors',
      points: [
         'Changing demographics and fan preferences.',
         'Community engagement and social responsibility expectations.',
         'Impact of social media and fan forums.',
         'Health and wellness trends affecting sports participation.'
      ]
    },
    {
      title: 'Technological Factors',
      points: [
         'Advancements in broadcasting and streaming technologies.',
         'Use of data analytics in player performance and fan engagement.',
         'Online ticketing and merchandise platforms.',
         'Impact of social media and digital marketing.'
      ]
    },
    {
      title: 'Legal Factors',
      points: [
         'Employment laws affecting player contracts and staff.',
         'Broadcasting rights and intellectual property.',
         'Data protection regulations (e.g., GDPR).',
         'Advertising and sponsorship regulations.'
      ]
    },
    {
      title: 'Environmental Factors',
      points: [
         'Sustainability practices for stadium operations.',
         'Impact of weather conditions on matches and training.',
         'Environmental regulations affecting club facilities.',
         'Growing awareness of climate change and its impact on sports.'
      ]
    }
  ];

  return (
    <div id="pestle" className="tab-content">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">PESTLE Analysis</h2>
      <p className="text-gray-700 mb-6">
        Analyze the Political, Economic, Social, Technological, Legal, and Environmental factors affecting Barnet FC.
      </p>
      <div className="space-y-4" id="pestleAccordion">
        {pestleFactors.map((factor, index) => (
          <AccordionItem key={index} title={factor.title}>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {factor.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
}

export default PestleAnalysis;
