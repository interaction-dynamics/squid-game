import PropTypes from 'prop-types'

const Page = ({ className, children }) => (
  <div className={`relative h-screen w-screen p-2 select-none flex justify-center items-center ${className}`}>{children}</div>
)

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

Page.defaultProps = {
  className: ''
}

export default Page
