import * as VIDEO_SIZE from 'utils/videoSize'
import useOnMount from 'utils/hooks/useOnMount'

const constraints = {
  audio: false,
  video: { width: VIDEO_SIZE.WIDTH, height: VIDEO_SIZE.HEIGHT }
}

export default ({ onAccepted = () => {}, onRefused = () => {}, onPermissionsChanged = () => {} }) => {
  useOnMount(() => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
        onPermissionsChanged(true)
        onAccepted(stream)
      })
      .catch(() => {
        onPermissionsChanged(false)
        onRefused()
      })
  })
}
