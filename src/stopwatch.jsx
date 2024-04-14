import { useState, useEffect, useRef } from "react";

function Stopwatch() {
  // sets the initial state of the stopwatch to not running
  const [isRunning, setIsRunning] = useState(false);
  // sets the initial state of the elapsed time to 0
  const [elapsedTime, setElapsedTime] = useState(0);
  // stores the interval id
  const intervalIdRef = useRef(null);
  // stores the start time
  const startTimeRef = useRef(0);

  // updates the virtual DOM when the isRunning state changes
  useEffect(() => {
    // checks if the stopwatch is running
    if (isRunning) {
      // if the stopwatch is running, it sets the interval to update the elapsed time every 10 milliseconds
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    // cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalIdRef.current);
    };
    // runs the effect whenever the isRunning state changes
  }, [isRunning]);

  function start() {
    // sets the isRunning state to true
    setIsRunning(true);
    // sets the start time to the current time minus the elapsed time
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    // returns the stopwatch to the initial state of not running
    setIsRunning(false);
  }

  function reset() {
    // sets the elapsed time back to 0
    setElapsedTime(0);
    // returns the stopwatch to the initial state of not running
    setIsRunning(false);
  }

  function formatTime() {
    // calculates the hours, minutes, seconds, and milliseconds
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    // pads the numbers with a leading zero if they are less than 10
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="stopwatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="startBtn">
          Start
        </button>
        <button onClick={stop} className="stopBtn">
          Stop
        </button>
        <button onClick={reset} className="resetBtn">
          Reset
        </button>
      </div>
    </div>
  );
}
export default Stopwatch;
