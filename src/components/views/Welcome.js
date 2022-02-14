import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Page from 'components/templates/Page'
import Footer from 'components/atoms/Footer'
// import GithubRibbon from 'components/atoms/GithubRibbon'
import Header from 'components/molecules/Header'

import Logo from 'components/atoms/Logo'
import Button from 'components/atoms/Button'
import useRequestWebcamPermission from 'utils/hooks/useRequestWebcamPermission'

const PermissionRequired = () => {
  const { t } = useTranslation()

  return (
    <div className="text-lg p-8 text-amber-200">
      {t('requireWebcam')}
      <br />
      {t('authorizeWebcam')}
    </div>
  )
}

export const Welcome = () => {
  const [permissionAccepted, setPermissionAccepted] = useState(false)

  const { t } = useTranslation()

  useRequestWebcamPermission({
    onPermissionsChanged: setPermissionAccepted
  })

  return (
    <Page className={`bg-blue-500`}>
      <div className="flex flex-col items-center text-center">
        <Logo />
        <h1 className="text-5xl text-white">{t('SquidGame')}</h1>
        <div className="text-xl text-gray-300 p-5 py-7">
          <p className="p-0 m-0 pb-5">
            {t('runByPressing')}
            <br /> {t('duringGreenRedLight')}
          </p>
          <p className="p-0 m-0">{t('holdStill')}</p>
        </div>
        {permissionAccepted ? (
          <Button to="/difficulty" className="text-blue-500">
            {t('start')}
          </Button>
        ) : (
          <PermissionRequired />
        )}
      </div>
      <Header />
      {/* <GithubRibbon /> */}
      <Footer />
    </Page>
  )
}

export default Welcome
