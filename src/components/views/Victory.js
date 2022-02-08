import Page from 'components/templates/Page'
import Message from 'components/atoms/Message'
import RestartButtons from 'components/organisms/RestartButtons'

const Victory = () => (
  <Page className="bg-green-500">
    <div className="text-center">
      <Message title="VICTORY" />
      <RestartButtons className=" text-green-500" />
    </div>
  </Page>
)

export default Victory
