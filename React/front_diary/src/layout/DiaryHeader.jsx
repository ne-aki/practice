import React, { useState } from 'react'
import styles from './DiaryHeader.module.css'
import AddDiary from '../components/AddDiary'

const DiaryHeader = ({ diaryList = [], onReload }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>My Diary</h1>
        <button
          className={styles.addButton}
          onClick={() => setIsOpen(true)}
        >+ New Diary</button>
      </div>
      <AddDiary
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        diaryList={diaryList}
        onReload={onReload}
      />
    </header>
  )
}

export default DiaryHeader