import PropTypes from 'prop-types'

const MotionIndicator = ({ motionRatio }) => (
  <div className="relative rounded-full border-2 border-white w-16 h-16 opacity-40 flex items-center justify-center overflow-hidden">
    <div className="bg-white absolute rounded-full" style={{ width: `${100 * motionRatio}%`, height: `${100 * motionRatio}%` }}></div>
  </div>
)

MotionIndicator.propTypes = {
  motionRatio: PropTypes.number.isRequired
}

export default MotionIndicator
