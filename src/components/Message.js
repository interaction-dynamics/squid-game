import React from 'react'

export default ({ title, children }) => (
  <div className="p-5 text-center">
    <div className="text-2xl pb-5 uppercase">{title}</div>
    <div className="text-lg">{children}</div>
  </div>
)
