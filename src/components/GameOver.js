import React from 'react'

import Message from './Message'

export default ({ onStart }) => (
  <div className="text-center">
    <Message title="Game Over">You moved, you lost!</Message>
    {/* <div className="text-2xl p-5">GAME OVER</div>
    <div className="text-2xl pb-5"></div> */}
    <div>
      <button onClick={onStart} className="h-10 px-6 font-semibold rounded-md bg-white hover:bg-gray-200 text-black" type="submit">
        Back to Start Menu
      </button>
    </div>
  </div>
)
