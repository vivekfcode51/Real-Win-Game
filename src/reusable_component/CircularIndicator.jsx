/* eslint-disable react/prop-types */

const CircularIndicator = ({ percentage=0, color }) => {
  const circleRadius = 45; // Radius of the circle
  const circleCircumference = 2 * Math.PI * circleRadius; // Circumference of the circle
  const strokeDashoffset = circleCircumference * (1 - percentage / 100); // Dynamic offset

  return (
    <div className="relative w-32 h-32">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke="#e5e7eb" /* Tailwind gray-200 */
          strokeWidth="7"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={circleRadius}
          fill="none"
          stroke={color || "#ff9a8e"} /* Default to Tailwind blue-500 */
          strokeWidth="7"
          strokeDasharray={circleCircumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-xsm text-black font-semibold">{percentage.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default CircularIndicator;
