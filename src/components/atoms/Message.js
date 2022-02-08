import PropTypes from 'prop-types'

const Message = ({ title, children }) => (
  <div className="p-5 text-center text-white">
    <div className="text-2xl pb-5 uppercase">{title}</div>
    <div className="text-lg">{children}</div>
  </div>
)

Message.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
}

Message.defaultProps = {
  title: '',
  children: []
}

export default Message
