import React, { useState, useEffect } from 'react'
import DiaryHeader from './DiaryHeader'
import { Outlet } from 'react-router-dom'
import styles from './DiaryLayout.module.css'
import axios from 'axios'

const DiaryLayout = () => {
  const [diaryList, setDiaryList] = useState([])
  const [reloading, setReloading] = useState(0)

  // 리로딩 함수
  const handleReloading = () => {
    setReloading(prev => prev + 1)
  }

  // 다이어리 목록 불러오기
  useEffect(() => {
    axios.get('/api/diaries')
    .then(res => {
      console.log(res.data)
      setDiaryList(res.data)
    })
    .catch(e => {
      console.log(e)
      // alert(e.response.data)
    })
  }, [reloading])

  return (
    <div className={styles.layout}>
      <DiaryHeader diaryList={diaryList} onReload={handleReloading} />
      <main className={styles.main}>
        <Outlet context={{ diaryList, handleReloading }} />
      </main>
    </div>
  )
}

export default DiaryLayout