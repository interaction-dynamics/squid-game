import React, { useEffect, useRef, useState } from 'react'

import Welcome from './Welcome'
import GameOver from './GameOver'
import Victory from './Victory'
import Distance from './Distance'
import MotionDetector from './MotionDetector'
import GreenRedLight from './GreenRedLight'
import useInterval from '../hooks/useInterval'
import useEventListener from '../hooks/useEventListener'
import useLocalStorage from '../hooks/useLocalStorage'

import { DIFFICULTY } from '../types/difficulty'
import { STATUS } from '../types/status'

const backgrounds = {
  WAIT_FOR_START: 'bg-blue-500',
  GREEN_LIGHT: 'bg-green-500',
  RED_LIGHT: 'bg-red-500',
  VICTORY: 'bg-sky-900',
  GAME_OVER: 'bg-black'
}

const Game = () => {
  const video = useRef()
  const canvas = useRef()

  const [gameStatus, setGameStatus] = useState(STATUS.WAIT_FOR_START)

  const [distance, setDistance] = useState(0)
  const [motionRatio, setMotionRatio] = useState(0)
  const [permissionAccepted, setPermissionAcceped] = useState(false)

  const [difficulty, setDifficulty] = useLocalStorage('mode-difficulty', DIFFICULTY.EASY)

  const onMotionDetected = () => {
    if (gameStatus === STATUS.RED_LIGHT) {
      setGameStatus(STATUS.GAME_OVER)
    }
  }

  const [walking, setWalk] = useState(false)

  const walkingDebounceTimeout = useRef(null)

  const walk = () => {
    if (gameStatus === STATUS.GREEN_LIGHT) {
      const newDistance = distance + 1

      setDistance(newDistance)
      if (newDistance === 100) {
        setGameStatus(STATUS.VICTORY)
        setWalk(false)
        return
      }

      setWalk(true)

      clearTimeout(walkingDebounceTimeout.current)
      walkingDebounceTimeout.current = setTimeout(() => {
        console.log('stopWalk')
        setWalk(false)
      }, 100)
    }
  }

  useEventListener('keyup', event => {
    if (event.keyCode === 32) {
      walk()
    }
  })

  useEventListener('click', event => {
    walk()
  })

  const isPlaying = gameStatus === STATUS.GREEN_LIGHT || gameStatus === STATUS.RED_LIGHT

  useInterval(
    () => {
      if (gameStatus === STATUS.GREEN_LIGHT) {
        // context.current.globalCompositeOperation = 'source-over'
        // context.current.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height)
        setGameStatus(STATUS.RED_LIGHT)
      } else if (gameStatus === STATUS.RED_LIGHT) {
        setGameStatus(STATUS.GREEN_LIGHT)
      }
    },
    isPlaying ? 5000 : null
  )

  const startGame = chosenDifficulty => {
    setDistance(0)
    setDifficulty(chosenDifficulty)
    setGameStatus(STATUS.GREEN_LIGHT)
  }

  const backToBeginning = () => {
    setGameStatus(STATUS.WAIT_FOR_START)
  }

  return (
    <>
      <MotionDetector
        isHard
        onMove={setMotionRatio}
        onMotionDetected={onMotionDetected}
        pause={gameStatus === STATUS.GREEN_LIGHT}
        onPermissionChanged={setPermissionAcceped}
      />
      <div className={`relative h-screen w-screen ${backgrounds[gameStatus]} p-2 select-none`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <MotionIndicator motion={motion} motionMax={IMAGE_SCORE_THRESHOLD} /> */}
        </div>
        <div className={`relative w-full h-full text-white flex items-center justify-center`}>
          {gameStatus === STATUS.WAIT_FOR_START ? (
            <Welcome onStart={startGame} permissionAccepted={permissionAccepted} difficultyByDefault={difficulty} />
          ) : null}
          {gameStatus === STATUS.GREEN_LIGHT ? (
            <GreenRedLight motionRatio={motionRatio} label="GREEN LIGHT" hint="Press [space] or click on the screen" />
          ) : null}
          {gameStatus === STATUS.RED_LIGHT ? <GreenRedLight motionRatio={motionRatio} label="RED LIGHT" hint="Hold still or DIE" /> : null}
          {gameStatus === STATUS.GAME_OVER ? <GameOver onStart={backToBeginning} /> : null}
          {gameStatus === STATUS.VICTORY ? <Victory onStart={backToBeginning} /> : null}
        </div>
      </div>
      {gameStatus !== STATUS.WAIT_FOR_START ? <Distance distance={distance} walking={walking} /> : null}
    </>
  )
}

export default Game
