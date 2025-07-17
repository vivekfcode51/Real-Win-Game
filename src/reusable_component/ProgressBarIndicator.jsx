import React, { useState, useEffect } from "react";

const ProgressBarIndicator = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1; // Increase by 1% every 50ms
        });
      }, 50); // 5 seconds = 5000ms; 100 steps = 50ms per step
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="w-full max-w-lg mx-auto mt-20">
        <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-50"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, red, blue, green)",
            }}
          ></div>
        </div>
        <p className="text-center mt-2 text-gray-700">{progress}%</p>
      </div>
    );
  };
  

export default ProgressBarIndicator;
