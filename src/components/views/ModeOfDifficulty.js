import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { useTranslation } from 'react-i18next'

import 'react-spring-bottom-sheet/dist/style.css'

import Page from 'components/templates/Page'
import MotionIndicator from 'components/atoms/MotionIndicator'
import MotionDetector from 'components/atoms/MotionDetector'
import Button from 'components/atoms/Button'

import Difficulty from 'utils/difficulty'
import useResponsive from 'utils/hooks/useResponsive'
import { setDifficulty, getDifficulty } from 'store'

const ModeOfDifficulty = () => {
  const dispatch = useDispatch()
  const [motionRatio, setMotionRatio] = useState(0)

  const { md } = useResponsive()
  const difficulty = useSelector(getDifficulty)

  const isHard = difficulty === Difficulty.HARD
  const [isHintOpen, openHint] = useState(false)

  const changeDifficulty = difficulty => {
    dispatch(setDifficulty(difficulty))

    if (!md && difficulty === Difficulty.HARD) {
      openHint(true)
    }
  }

  const closeHint = () => {
    openHint(false)
  }

  const { t } = useTranslation()

  return (
    <Page className={`bg-blue-500`}>
      <div className="flex flex-col items-center">
        <MotionDetector onMove={setMotionRatio} />
        <MotionIndicator motionRatio={motionRatio} />
        <div className="text-white pt-3 text-sm">{t('indicatorOfMovement')}</div>
        <div className="flex flex-row items-center py-7">
          <div
            className={`pr-2 cursor-pointer ${isHard ? 'text-gray-300' : 'text-white'}`}
            onClick={() => changeDifficulty(Difficulty.EASY)}
          >
            {t('easy')}
          </div>
          <label htmlFor="toggle" className="flex items-center cursor-pointer relative ">
            <input
              className="sr-only outline-0"
              type="checkbox"
              id="toggle"
              checked={isHard}
              onChange={event => changeDifficulty(event.target.checked ? Difficulty.HARD : Difficulty.EASY)}
            />
            <div className={`bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full ${isHard ? 'bg-blue-600 border-blue-600' : ''}`}>
              <div
                className={`absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm ${
                  isHard ? 'border-white' : ''
                }`}
                style={{ transform: isHard ? 'translateX(100%)' : '' }}
              />
            </div>
          </label>
          <div
            className={`pl-2 cursor-pointer ${isHard ? 'text-white' : 'text-gray-300'}`}
            onClick={() => changeDifficulty(Difficulty.HARD)}
          >
            {t('hard')}
          </div>
        </div>
        <Button to="/game" className="text-blue-500">
          {t('confirm')}
        </Button>
        <BottomSheet open={isHintOpen} onDismiss={closeHint}>
          <div className="p-5 text-justify text-blue-500">
            {t('ifYouAreOnSmartphone')}
            <Button className="mt-2 text-blue-500" onClick={closeHint}>
              {t('gotIt')}
            </Button>
          </div>
        </BottomSheet>
      </div>
    </Page>
  )
}

export default ModeOfDifficulty
