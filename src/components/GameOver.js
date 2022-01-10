import React from 'react'

export default ({ onStart }) => (
  <div className="text-center">
    <div className="text-2xl p-5">GAME OVER</div>
    <div className="text-2xl pb-5">You moved, you lost!</div>
    <div>
      <button onClick={onStart} className="h-10 px-6 font-semibold rounded-md bg-white hover:bg-gray-200 text-black" type="submit">
        Back to Start Menu
      </button>
    </div>
  </div>
)
