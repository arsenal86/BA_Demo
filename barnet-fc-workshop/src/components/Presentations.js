import React from 'react';

function Presentations() {
  const handleFeedbackClick = () => {
    alert('Workshop feedback form would appear here!');
    // In a real app, this might open a modal or navigate to a feedback page.
  };

  return (
    <div id="presentations" className="tab-content">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Presentations & Wrap-up</h2>
      <p className="text-gray-700 mb-4">
        This section is for discussing your findings, preparing a short presentation, and wrapping up the workshop.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Group Discussion & Preparation</h3>
          <p className="text-gray-600 mb-2">
            Collaborate with your group (if applicable) to consolidate your analysis from the PESTLE, Stakeholder, and CATWOE exercises.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>What are the top 3-5 key challenges for Barnet FC?</li>
            <li>What are the most promising opportunities?</li>
            <li>Who are the critical stakeholders to engage?</li>
            <li>What is the core transformation Barnet FC needs to achieve?</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Presentation Guidelines</h3>
          <p className="text-gray-600 mb-2">
            Prepare a brief (5-10 minute) presentation summarizing your findings and recommendations.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Brief overview of the situation.</li>
            <li>Key findings from your analysis.</li>
            <li>Actionable recommendations.</li>
            <li>Potential impact of your recommendations.</li>
          </ul>
        </div>
      </div>
      <div className="bg-teal-100 border-l-4 border-teal-500 text-teal-700 p-4 rounded-md" role="alert">
        <p className="font-bold">Workshop Completion!</p>
        <p>Thank you for participating in the Barnet FC Business Analysis Workshop. We hope you found it insightful and that you can apply these techniques in your future endeavors.</p>
      </div>
      <div className="mt-6 text-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out"
          onClick={handleFeedbackClick}
        >
          Provide Feedback
        </button>
      </div>
    </div>
  );
}

export default Presentations;
