import React, { useEffect } from 'react'

export default callback => {
  useEffect(() => {
    callback()
  }, [])
}
