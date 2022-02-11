import { useState } from 'react'

import Page from 'components/templates/Page'
import Footer from 'components/atoms/Footer'
import GithubRibbon from 'components/atoms/GithubRibbon'

import Logo from 'components/atoms/Logo'
import Button from 'components/atoms/Button'
import useRequestWebcamPermission from 'utils/hooks/useRequestWebcamPermission'

const PermissionRequired = () => (
  <div className="text-lg p-8 text-amber-200">
    This game requires the access to your webcam.
    <br />
    Please authorize the webcam.
  </div>
)

export const Welcome = () => {
  const [permissionAccepted, setPermissionAccepted] = useState(false)

  useRequestWebcamPermission({
    onPermissionsChanged: setPermissionAccepted
  })

  return (
    <Page className={`bg-blue-500`}>
      <div className="flex flex-col items-center text-center">
        <Logo />
        <h1 className="text-5xl text-white">Squid Game</h1>
        <div className="text-xl text-gray-300 p-5 py-7">
          <p className="p-0 m-0 pb-5">
            Run by pressing [space] or clicking on the page
            <br /> during the Green light and win.
          </p>
          <p className="p-0 m-0">Hold still during the Red light or die.</p>
        </div>
        {permissionAccepted ? (
          <Button to="/difficulty" className="text-blue-500">
            Start
          </Button>
        ) : (
          <PermissionRequired />
        )}
      </div>
      <GithubRibbon />
      <Footer />
    </Page>
  )
}

export default Welcome
