import { useTranslation } from 'react-i18next'

import PropTypes from 'prop-types'
import Button from 'components/atoms/Button'

const RestartButtons = ({ className }) => {
  const { t } = useTranslation()

  return (
    <>
      <Button to="/game" className={`${className} mb-5`}>
        {t('startAgain')}
      </Button>
      <Button to="/" className={className}>
        {t('backToStartMenu')}
      </Button>
    </>
  )
}

RestartButtons.propTypes = {
  className: PropTypes.string
}

RestartButtons.defaultProps = {
  className: ''
}

export default RestartButtons
