import React, { useEffect, useState } from 'react'

export default ({ distance, walking }) => {
  return (
    <>
      <div className="fixed bottom-0 right-0 z-50" style={{ left: `${distance}%`, marginLeft: -40 }}>
        <lord-icon
          src="https://cdn.lordicon.com/ippkhukl.json"
          trigger={walking ? 'loop' : 'morph'}
          colors="primary:#ffffff,secondary:#ffffff"
          style={{ width: 100, height: 100 }}
        />
      </div>

      <div className="fixed bottom-0  right-0 h-3 bg-white z-50" style={{ width: `${100 - distance}%` }}></div>
    </>
  )
}
