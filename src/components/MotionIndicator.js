import React from 'react'

export default ({ motionRatio }) => (
  <div className="relative rounded-full border-2 border-white w-16 h-16 opacity-40 flex items-center justify-center overflow-hidden">
    <div className="bg-white absolute rounded-full" style={{ width: `${100 * motionRatio}%`, height: `${100 * motionRatio}%` }}></div>
  </div>
)
