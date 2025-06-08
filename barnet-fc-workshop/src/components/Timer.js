import React, { useState, useEffect, useCallback, useRef } from 'react';

// Helper function (can be outside component if it doesn't use hooks or props)
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

function Timer() {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // Initial 15 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [timerDuration, setTimerDuration] = useState(15); // In minutes, for slider

  const timerIntervalRef = useRef(null);

  const stopTimer = useCallback(() => {
     clearInterval(timerIntervalRef.current);
     timerIntervalRef.current = null;
  }, []);

  useEffect(() => {
    if (isRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            stopTimer();
            setIsRunning(false);
            alert("Time's up!");
            // Reset to the duration that was set, instead of just 0
            return timerDuration * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      stopTimer();
    }
    return () => stopTimer(); // Cleanup on unmount or if isRunning changes
  }, [isRunning, stopTimer, timerDuration]); // Added timerDuration to ensure reset to current duration

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(timerDuration * 60);
  }, [timerDuration]);

  const handleSetDefaultTimer = () => {
     setIsRunning(false);
     setTimerDuration(15);
     setTimeLeft(15 * 60);
  };

  const handleSliderChange = (event) => {
    const newDuration = parseInt(event.target.value, 10);
    setTimerDuration(newDuration);
    // No longer directly setting timeLeft here, relying on useEffect below
  };

  // Update timeLeft if timerDuration changes and timer is not running
  useEffect(() => {
     if (!isRunning) {
         setTimeLeft(timerDuration * 60);
     }
  }, [timerDuration, isRunning]);

  // Icon paths - assume they are in public/icons/
  const iconPath = (name) => `/icons/${name}.svg`;

  return (
    <div className="timer-container fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg shadow-xl w-60 z-50">
      <div className="text-center mb-2">
        <span id="timerDisplay" className="text-3xl font-mono">
          {formatTime(timeLeft)}
        </span>
      </div>
      <div className="flex justify-around items-center">
        <button onClick={handleSetDefaultTimer} className="timer-btn" title="Set Timer (15 mins)">
          <img src={iconPath('clock-plus')} alt="Set Timer" className="w-6 h-6" />
        </button>

        {!isRunning ? (
          <button onClick={handleStart} className="timer-btn" title="Start Timer">
            <img src={iconPath('play-circle')} alt="Start Timer" className="w-8 h-8" />
          </button>
        ) : (
          <button onClick={handlePause} className="timer-btn" title="Pause Timer">
            <img src={iconPath('pause-circle')} alt="Pause Timer" className="w-8 h-8" />
          </button>
        )}

        <button onClick={handleReset} className="timer-btn" title="Reset Timer">
          <img src={iconPath('arrow-clockwise')} alt="Reset Timer" className="w-6 h-6" />
        </button>
      </div>
      <input
        type="range"
        id="timerSlider"
        min="1"
        max="60"
        value={timerDuration}
        onChange={handleSliderChange}
        disabled={isRunning} // Disable slider when timer is running
        className="w-full mt-3 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
      />
    </div>
  );
}

export default Timer;
