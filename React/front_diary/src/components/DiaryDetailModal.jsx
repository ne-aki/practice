import React, { useEffect } from 'react'
import Modal from '../common/Modal'
import axios from 'axios'

const DiaryDetailModal = ( {isOpen} ) => {
  useEffect(() => {
    axios.get(`/api/diaries`)
  }, [])
  return (
    <Modal
      isOpen={isOpen}
    >DiaryDetail</Modal>
  )
}

export default DiaryDetailModal