import React from 'react'
import MotionIndicator from './MotionIndicator'

import Message from './Message'

export default ({ motionRatio, label, hint }) => (
  <div className="flex flex-col items-center">
    <MotionIndicator motionRatio={motionRatio} />
    <Message title={label}>{hint}</Message>
  </div>
)
