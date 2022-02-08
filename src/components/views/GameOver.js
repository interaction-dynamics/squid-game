import Page from 'components/templates/Page'
import Message from 'components/atoms/Message'
import RestartButtons from 'components/organisms/RestartButtons'

const GameOver = () => (
  <Page className="bg-black">
    <div className="text-center">
      <Message title="Game Over">You moved, you lost!</Message>
      <RestartButtons className=" text-sky-900" />
    </div>
  </Page>
)

export default GameOver
