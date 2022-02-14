import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const availableLanguages = [
  { language: 'en', name: 'English' },
  { language: 'fr', name: 'Français' }
]

const LanguageSelector = () => {
  const { t, i18n } = useTranslation()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="border-solid border-2 border-white rounded-full px-3 py-1 text-white font-medium flex align-items">
        <lord-icon
          src="https://cdn.lordicon.com/gqzfzudq.json"
          trigger="manual"
          colors="primary:#ffffff,secondary:#ffffff"
          style={{ width: '25px', height: '25px' }}
        />
        <span className="ml-1">{t('language')}</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {availableLanguages.map(({ language, name }) => (
              <Menu.Item key={language}>
                <a
                  href="#"
                  className={classNames(
                    language === i18n.language ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => i18n.changeLanguage(language)}
                >
                  {name}
                </a>
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LanguageSelector
