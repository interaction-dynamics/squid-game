import React, { useState } from 'react'

import Logo from './Logo'
import Footer from './Footer'
import GithubRibbon from './GithubRibbon'

import { DIFFICULTY } from '../types/difficulty'

export default ({ onStart, permissionAccepted, difficultyByDefault }) => {
  const [difficulty, setDifficulty] = useState(difficultyByDefault)

  const isHard = difficulty === DIFFICULTY.HARD

  return (
    <div className="flex flex-col items-center text-center">
      <GithubRibbon />
      <Footer />
      <Logo />
      <h1 className="text-5xl">Squid Game</h1>
      <div className="text-xl text-gray-300 p-5 py-7">
        <p className="p-0 m-0 pb-5">
          Run by pressing [space] or clicking on the page
          <br /> during the Green light and win.
        </p>
        <p className="p-0 m-0">Hold still during the Red light or die.</p>
      </div>
      {/* <div className="text-2xl p-5">
        
      </div>
      <div className="text-2xl pb-5"></div> */}
      <div className="block md:hidden my-5 py-5 px-5 bg-white text-blue-500 text-lg font-medium max-w-screen-sm	 rounded">
        If you are using a smartphone, we suggest you to place your smartphone on a table or use only easy mode. The vibrations while
        holding the smartphone will be considered as you moving.
      </div>
      {permissionAccepted ? (
        <div className="flex flex-col items-center">
          <div className="flex flex-row items-center py-5">
            <div
              className={`pr-2 cursor-pointer ${isHard ? 'text-gray-300' : 'text-white'}`}
              onClick={() => setDifficulty(DIFFICULTY.EASY)}>
              Easy
            </div>
            <label htmlFor="toggle" className="flex items-center cursor-pointer relative ">
              <input
                className="sr-only outline-0"
                type="checkbox"
                id="toggle"
                checked={isHard}
                onChange={event => setHard(event.target.checked ? DIFFICULTY.HARD : DIFFICULTY.EASY)}
              />
              <div className={`bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full ${isHard ? 'bg-blue-600 border-blue-600' : ''}`}>
                <div
                  className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm ${
                    isHard ? 'border-white' : ''
                  }`}
                  style={{ transform: isHard ? 'translateX(100%)' : '' }}
                />
              </div>
            </label>
            <div
              className={`pl-2 cursor-pointer ${isHard ? 'text-white' : 'text-gray-300'}`}
              onClick={() => setDifficulty(DIFFICULTY.HARD)}>
              Hard
            </div>
          </div>
          <button
            onClick={() => onStart(isHard)}
            className="h-10 px-6 font-semibold rounded-md bg-white hover:bg-gray-200 text-blue-500"
            type="submit">
            Start
          </button>
        </div>
      ) : (
        <div className="text-lg p-8 text-amber-200">
          This game requires the access to your webcam.
          <br />
          Please authorize the webcam.
        </div>
      )}
    </div>
  )
}
