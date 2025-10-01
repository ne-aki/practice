import React from 'react'
import styles from './DiaryDetail.module.css'
import { useParams } from 'react-router-dom'

const DiaryDetail = () => {
  const {diaryNum} = useParams();
  console.log(diaryNum);

  return (
    <div>DiaryDetail</div>
  )
}

export default DiaryDetail