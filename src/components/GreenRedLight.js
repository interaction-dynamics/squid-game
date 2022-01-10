import React from 'react'
import MotionIndicator from './MotionIndicator'

export default ({ motion, motionMax, label }) => (
  <div className="flex flex-col items-center">
    <MotionIndicator motion={motion} motionMax={motionMax} />
    <div className="text-2xl p-5">{label}</div>
  </div>
)
