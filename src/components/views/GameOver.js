import { useTranslation } from 'react-i18next'

import Page from 'components/templates/Page'
import Message from 'components/atoms/Message'
import RestartButtons from 'components/organisms/RestartButtons'

const GameOver = () => {
  const { t } = useTranslation()

  return (
    <Page className="bg-black">
      <div className="text-center">
        <Message title={t('GameOver')}>{t('youMovedYouLost')}</Message>
        <RestartButtons className=" text-sky-900" />
      </div>
    </Page>
  )
}
export default GameOver
