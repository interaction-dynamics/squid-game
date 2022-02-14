import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-x-0 bottom-0 text-white p-1 text-sm text-center">
      <a href="https://interaction-dynamics.io/" className="custor-pointer hover:underline">
        {t('madeWithLove')}
      </a>
    </div>
  )
}

export default Footer
