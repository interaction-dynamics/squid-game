import { React, useEffect } from 'react'

import * as VIDEO_SIZE from '../config/videoSize'
import useOnMount from './useOnMount'

const constraints = {
  audio: false,
  video: { width: VIDEO_SIZE.WIDTH, height: VIDEO_SIZE.HEIGHT }
}

export default ({ onAccepted, onRefused }) => {
  useOnMount(() => {
    navigator.mediaDevices.getUserMedia(constraints).then(onAccepted).catch(onRefused)
  })
}
