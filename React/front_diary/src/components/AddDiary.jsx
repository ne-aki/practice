import React, { useState, useRef, useEffect } from 'react'
import styles from './AddDiary.module.css'
import Modal from '../common/Modal'
import axios from 'axios'

const AddDiary = ({isOpen, onClose, diaryList = [], onReload}) => {
  const dateInputRef = useRef(null)

  // 오늘 날짜를 'YYYY-MM-DD' 형식으로 가져오는 함수
  const getTodayDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0') // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    feeling: '😊',
    diaryDate: getTodayDate()
  })

  // 날짜 중복 확인 함수
  const checkDuplicateDate = (date) => {
    return diaryList.some(diary => diary.diaryDate === date)
  }

  // 날짜가 변경될 때마다 유효성 검사
  useEffect(() => {
    if (dateInputRef.current) {
      const isDuplicate = checkDuplicateDate(formData.diaryDate)
      if (isDuplicate) {
        dateInputRef.current.setCustomValidity('이미 해당 날짜에는 다이어리가 등록되었습니다')
      } else {
        dateInputRef.current.setCustomValidity('')
      }
    }
  }, [formData.diaryDate, diaryList])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // 폼 유효성 검사 (중복 날짜 확인 포함)
    if (!e.target.checkValidity()) {
      return
    }

    // 다이어리 저장 로직 호출
    addNewDiary()
  }

  const feelingOptions = ['😊', '🤗', '😌', '😢', '😡', '🤔', '😴', '🥳']

  //저장버튼을 누르면 다이어리가 새로 등록됨
  const addNewDiary = () => {
    axios.post('/api/diaries', formData)
    .then(res => {
      alert('등록되었습니다.')

      // 폼 초기화 및 모달 닫기
      setFormData({
        title: '',
        content: '',
        feeling: '😊',
        diaryDate: getTodayDate()
      })

      // 목록 리로드
      if (onReload) {
        onReload()
      }

      onClose()
    })
    .catch(e => {
      console.log(e)
      alert(e.response.data)
    })
  }

  //console.log(formData);
  

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="새 다이어리 작성"
      size="720px"
    >
      <form onSubmit={handleSubmit} className={styles.diaryForm}>
        <div className={styles.formGroup}>
          <label htmlFor="diaryDate">날짜</label>
          <input
            ref={dateInputRef}
            type="date"
            id="diaryDate"
            name="diaryDate"
            value={formData.diaryDate}
            onChange={handleInputChange}
            className={styles.dateInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="feeling">오늘의 기분</label>
          <div className={styles.feelingSelector}>
            {feelingOptions.map((feeling) => (
              <button
                key={feeling}
                type="button"
                className={`${styles.feelingButton} ${formData.feeling === feeling ? styles.selected : ''}`}
                onClick={() => setFormData(prev => ({ ...prev, feeling }))}
              >
                {feeling}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="다이어리 제목을 입력하세요"
            className={styles.textInput}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="오늘 하루는 어땠나요?"
            rows="10"
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
          <button
            type="submit"
            className={styles.submitButton}
          >
            저장
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddDiary