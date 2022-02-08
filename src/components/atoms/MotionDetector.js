import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useInterval from 'utils/hooks/useInterval'
import useRequestWebcamPermission from 'utils/hooks/useRequestWebcamPermission'

import Difficulty from 'utils/types/difficulty'

import * as VIDEO_SIZE from 'utils/config/videoSize'
import { getDifficulty } from 'store'

const PIXEL_SCORE_THRESHOLD = 32
const IMAGE_SCORE_THRESHOLD = 8000
const IMAGE_SCORE_THRESHOLD_HARD = 1000

const MotionDetector = ({ onMove, onMotionDetected, pause }) => {
  const video = useRef()
  const canvas = useRef()
  const context = useRef()
  const navigate = useNavigate()

  const difficulty = useSelector(getDifficulty)

  const threshold = difficulty === Difficulty.HARD ? IMAGE_SCORE_THRESHOLD_HARD : IMAGE_SCORE_THRESHOLD

  const drawWebcam = () => {
    context.current.drawImage(video.current, 0, 0, canvas.current.width, canvas.current.height)
  }

  const drawReference = () => {
    context.current.globalCompositeOperation = 'source-over'
    drawWebcam()
  }

  const drawDifference = () => {
    context.current.globalCompositeOperation = 'difference'
    drawWebcam()
  }

  useRequestWebcamPermission({
    onAccepted: stream => {
      startCapture(stream)
    },
    onRefused: () => {
      navigate('/')
    }
  })

  const startCapture = stream => {
    video.current.srcObject = stream

    context.current = canvas.current.getContext('2d')
    drawReference()
  }

  useEffect(() => {
    if (context.current && pause) {
      drawReference()
    }
  }, [pause, context.current])

  useInterval(() => {
    if (typeof context?.current?.drawImage === 'function') {
      drawDifference()

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

      const motionRatio = imageScore / threshold

      onMove(motionRatio)

      if (imageScore >= threshold) {
        onMotionDetected()
      }

      drawReference()
    }
  }, 100)

  return (
    <>
      <video className="hidden" ref={video} autoPlay />
      <canvas ref={canvas} width={VIDEO_SIZE.WIDTH} height={VIDEO_SIZE.HEIGHT} className="hidden" />
    </>
  )
}

MotionDetector.propTypes = {
  onMove: PropTypes.func,
  onPermissionChanged: PropTypes.func,
  onMotionDetected: PropTypes.func,
  pause: PropTypes.bool
}

MotionDetector.defaultProps = {
  onMove: () => {},
  onPermissionChanged: () => {},
  onMotionDetected: () => {},
  pause: false
}

export default MotionDetector
