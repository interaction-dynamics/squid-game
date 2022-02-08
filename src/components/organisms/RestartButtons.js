import PropTypes from 'prop-types'
import Button from 'components/atoms/Button'

const RestartButtons = ({ className }) => (
  <>
    <Button to="/game" className={`${className} mb-5`}>
      Start Again
    </Button>
    <Button to="/" className={className}>
      Back to Start Menu
    </Button>
  </>
)

RestartButtons.propTypes = {
  className: PropTypes.string
}

RestartButtons.defaultProps = {
  className: ''
}

export default RestartButtons
