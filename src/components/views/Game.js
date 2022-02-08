import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { setDistance, getDistance, isStarted } from 'store'
import Page from 'components/templates/Page'
import Message from 'components/atoms/Message'
import Distance from 'components/atoms/Distance'
import MotionIndicator from 'components/atoms/MotionIndicator'
import MotionDetector from 'components/atoms/MotionDetector'
import useEventListener from 'utils/hooks/useEventListener'
import useInterval from 'utils/hooks/useInterval'

import useOnMount from 'utils/hooks/useOnMount'

export const Status = {
  GREEN_LIGHT: 'GREEN_LIGHT',
  RED_LIGHT: 'RED_LIGHT'
}

const Game = () => {
  const started = useSelector(isStarted)
  const navigate = useNavigate()

  const distance = useSelector(getDistance)

  const dispatch = useDispatch()
  const changeDistance = newDistance => dispatch(setDistance(newDistance))

  useOnMount(() => {
    if (!started) {
      // navigate('/')
    }
    if (distance !== 0) {
      changeDistance(0)
    }
  }, [started])

  const [motionRatio, setMotionRatio] = useState(0)

  const [gameStatus, setGameStatus] = useState(Status.GREEN_LIGHT)

  const [walking, setWalk] = useState(false)

  const authorizedFails = useRef(0)

  const fail = () => {
    navigate('/game-over')
  }

  const onMotionDetected = () => {
    if (gameStatus === Status.RED_LIGHT) {
      fail()
    }
  }

  const walkingDebounceTimeout = useRef(null)

  const walk = () => {
    if (gameStatus === Status.GREEN_LIGHT) {
      const newDistance = distance + 1

      changeDistance(newDistance)
      if (newDistance === 100) {
        setWalk(false)
        navigate('/victory')
        return
      }

      setWalk(true)

      clearTimeout(walkingDebounceTimeout.current)
      walkingDebounceTimeout.current = setTimeout(() => {
        console.log('stopWalk')
        setWalk(false)
      }, 100)
    } else if (gameStatus === Status.RED_LIGHT) {
      authorizedFails.current += 1

      if (authorizedFails.current === 3) {
        fail()
      }
    }
  }

  useEventListener('keyup', event => {
    if (event.keyCode === 32) {
      walk()
    }
  })

  useEventListener('click', () => {
    walk()
  })

  useInterval(() => {
    if (gameStatus === Status.GREEN_LIGHT) {
      authorizedFails.current = 0
      setGameStatus(Status.RED_LIGHT)
    } else if (gameStatus === Status.RED_LIGHT) {
      setGameStatus(Status.GREEN_LIGHT)
    }
  }, 5000)

  const label = gameStatus === Status.GREEN_LIGHT ? 'GREEN LIGHT' : 'RED LIGHT'
  const hint = gameStatus === Status.GREEN_LIGHT ? 'Press [space] or click on the screen' : 'Hold still or DIE '

  return (
    <Page className={gameStatus === Status.GREEN_LIGHT ? `bg-green-500` : `bg-red-500`}>
      <div className="flex flex-col items-center">
        <MotionIndicator motionRatio={motionRatio} />
        <Message title={label}>{hint}</Message>
      </div>
      <MotionDetector onMove={setMotionRatio} onMotionDetected={onMotionDetected} pause={gameStatus === Status.GREEN_LIGHT} />
      <Distance distance={distance} walking={walking} />
    </Page>
  )
}

export default Game
