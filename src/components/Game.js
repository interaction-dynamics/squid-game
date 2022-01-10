import React, { useEffect, useRef, useState } from 'react'

import Welcome from './Welcome'
import GameOver from './GameOver'
import Victory from './Victory'
import Distance from './Distance'
import GreenRedLight from './GreenRedLight'
import useInterval from '../utils/useInterval'
import useEventListener from '../utils/useEventListener'
import useLocalStorage from '../utils/useLocalStorage'

const width = 640
const height = 480

const PIXEL_SCORE_THRESHOLD = 32
const IMAGE_SCORE_THRESHOLD = 4000
const IMAGE_SCORE_THRESHOLD_HARD = 1000

const Status = {
  WAIT_FOR_START: 'WAIT_FOR_START',
  GREEN_LIGHT: 'GREEN_LIGHT',
  RED_LIGHT: 'RED_LIGHT',
  VICTORY: 'VICTORY',
  GAME_OVER: 'GAME_OVER'
}

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

  const [gameStatus, setGameStatus] = useState(Status.WAIT_FOR_START)

  const [distance, setDistance] = useState(0)
  const [motion, setMotion] = useState('')
  const [permissionAccepted, setPermissionAcceped] = useState(false)

  const [isHard, setHard] = useLocalStorage('difficulty', false)

  const threshold = isHard ? IMAGE_SCORE_THRESHOLD_HARD : IMAGE_SCORE_THRESHOLD

  const context = useRef()

  const success = stream => {
    video.current.srcObject = stream

    context.current = canvas.current.getContext('2d')

    startCapture()
    setPermissionAcceped(true)
  }

  const error = error => {
    console.log(error)
    setPermissionAcceped(false)
  }

  useInterval(() => {
    if (typeof context?.current?.drawImage === 'function') {
      context.current.globalCompositeOperation = 'difference'

      context.current.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height)

      const imageData = context.current.getImageData(0, 0, canvas.current.width, canvas.current.height)

      let imageScore = 0

      const rgb = imageData.data

      for (let i = 0; i < rgb.length; i += 4) {
        const r = rgb[i] / 3
        const g = rgb[i + 1] / 3
        const b = rgb[i + 2] / 3
        const pixelScore = r + g + b

        if (pixelScore >= PIXEL_SCORE_THRESHOLD) {
          imageScore++
        }
      }

      setMotion(imageScore)

      if (imageScore >= threshold && gameStatus === Status.RED_LIGHT) {
        setGameStatus(Status.GAME_OVER)
      }

      context.current.globalCompositeOperation = 'source-over'
      context.current.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height)
    }
  }, 100)

  const [walking, setWalk] = useState(false)

  const walkingDebounceTimeout = useRef(null)

  const walk = () => {
    if (gameStatus === Status.GREEN_LIGHT) {
      const newDistance = distance + 1

      setDistance(newDistance)
      if (newDistance === 100) {
        setGameStatus(Status.VICTORY)
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

  const startCapture = () => {
    context.current.globalCompositeOperation = 'source-over'

    context.current.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height)
  }

  useInterval(
    () => {
      if (gameStatus === Status.GREEN_LIGHT) {
        context.current.globalCompositeOperation = 'source-over'
        context.current.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height)
        setGameStatus(Status.RED_LIGHT)
      } else if (gameStatus === Status.RED_LIGHT) {
        setGameStatus(Status.GREEN_LIGHT)
      }
    },
    gameStatus === Status.GREEN_LIGHT || gameStatus === Status.RED_LIGHT ? 5000 : null
  )

  const startGame = shouldBeHard => {
    setDistance(0)
    console.log('setHard')
    setHard(shouldBeHard)
    setGameStatus(Status.GREEN_LIGHT)
  }

  useEffect(() => {
    var constraints = {
      audio: false,
      video: { width, height }
    }
    navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error)
  }, [])

  const backToBeginning = () => {
    setGameStatus(Status.WAIT_FOR_START)
  }

  return (
    <>
      <video className="hidden" ref={video} autoPlay />
      <canvas ref={canvas} width={width} height={height} className="hidden" />
      <div className={`relative h-screen w-screen ${backgrounds[gameStatus]} p-2 select-none`}>
        <div className="absolute inset-0 flex items-center justify-center">
          {/* <MotionIndicator motion={motion} motionMax={IMAGE_SCORE_THRESHOLD} /> */}
        </div>
        <div className={`relative w-full h-full text-white flex items-center justify-center`}>
          {gameStatus === Status.WAIT_FOR_START ? (
            <Welcome onStart={startGame} permissionAccepted={permissionAccepted} isHardByDefault={isHard} />
          ) : null}
          {gameStatus === Status.GREEN_LIGHT ? <GreenRedLight motion={motion} motionMax={threshold} label="GREEN LIGHT" /> : null}
          {gameStatus === Status.RED_LIGHT ? <GreenRedLight motion={motion} motionMax={threshold} label="RED LIGHT" /> : null}
          {gameStatus === Status.GAME_OVER ? <GameOver onStart={backToBeginning} /> : null}
          {gameStatus === Status.VICTORY ? <Victory onStart={backToBeginning} /> : null}
        </div>
      </div>
      {gameStatus !== Status.WAIT_FOR_START ? <Distance distance={distance} walking={walking} /> : null}

      {/* <div className="fixed top-0 left-0 text-white p-2">{distance}</div> */}
    </>
  )
}

export default Game
