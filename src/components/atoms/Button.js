import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Button = ({ children, to, onClick, className }) => {
  const classNames = `h-10 flex items-center justify-center px-6 font-semibold rounded-md bg-white hover:bg-gray-200 ${className}`

  return to ? (
    <Link to={to} className={classNames} type="submit">
      {children}
    </Link>
  ) : (
    <button className={classNames} type="button" onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired
}

Button.defaultProps = {
  to: '',
  className: '',
  onClick: () => {},
  children: []
}

export default Button
