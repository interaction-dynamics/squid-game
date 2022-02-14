import GithubIcon from 'components/atoms/GithubIcon'
import LanguageSelector from 'components/atoms/LanguageSelector'
const Header = () => (
  <header className="fixed top-5 right-7 flex items-center">
    <LanguageSelector />
    <span className="w-5" />
    <GithubIcon />
  </header>
)

export default Header
