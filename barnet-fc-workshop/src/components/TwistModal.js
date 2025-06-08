import React, { useState, useEffect } from 'react';

const twists = [
  "The club's main sponsor pulls out unexpectedly.",
  "A key player demands a transfer right before a crucial match.",
  "Local council announces plans for major transport disruption near the stadium.",
  "A wealthy investor shows interest in buying the club, but with controversial plans.",
  "Sudden change in league rules impacting player eligibility.",
  "The team unexpectedly qualifies for a lucrative cup competition, stretching resources."
];

function TwistModal({ closeModal }) {
  const [currentTwist, setCurrentTwist] = useState('');

  const selectRandomTwist = () => {
    const randomIndex = Math.floor(Math.random() * twists.length);
    setCurrentTwist(twists[randomIndex]);
  };

  // Select a random twist when the component mounts (modal becomes visible)
  useEffect(() => {
    selectRandomTwist();
  }, []); // Empty dependency array means this runs once on mount

  // Optional: Close modal on Escape key press
  useEffect(() => {
     const handleEsc = (event) => {
        if (event.keyCode === 27) {
         closeModal();
        }
     };
     window.addEventListener('keydown', handleEsc);

     return () => {
         window.removeEventListener('keydown', handleEsc);
     };
  }, [closeModal]);

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center"
      // onClick={closeModal} // Optional: close on backdrop click
    >
      <div
        className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg shadow-lg"
        onClick={e => e.stopPropagation()} // Prevents click inside modal from closing it if backdrop click is enabled
      >
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-600 hover:text-gray-800 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">The Twist!</h2>
        <p className="text-gray-700 mb-4">
          Just when you thought you had it all figured out... a new development emerges!
        </p>
        <div id="twistContent" className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md min-h-[60px]">
          {currentTwist}
        </div>
        <button
          onClick={selectRandomTwist}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Another Twist
        </button>
      </div>
    </div>
  );
}

export default TwistModal;
