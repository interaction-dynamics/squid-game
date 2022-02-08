import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Button = ({ children, to, className }) => (
  <Link
    to={to}
    className={`h-10 flex items-center justify-center px-6 font-semibold rounded-md bg-white hover:bg-gray-200 ${className}`}
    type="submit"
  >
    {children}
  </Link>
)

Button.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

Button.defaultProps = {
  to: '',
  className: '',
  children: []
}

export default Button
