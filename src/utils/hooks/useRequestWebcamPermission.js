import * as VIDEO_SIZE from 'utils/config/videoSize'
import useOnMount from 'utils/hooks/useOnMount'

const constraints = {
  audio: false,
  video: { width: VIDEO_SIZE.WIDTH, height: VIDEO_SIZE.HEIGHT }
}

export default ({ onAccepted, onRefused }) => {
  useOnMount(() => {
    navigator.mediaDevices.getUserMedia(constraints).then(onAccepted).catch(onRefused)
  })
}
