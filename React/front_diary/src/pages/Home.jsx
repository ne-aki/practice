import React, { useState } from 'react'
import styles from './Home.module.css'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Pagination from '../common/Pagination'
import DiaryDetail from '../components/DiaryDetailModal'
import DiaryDetailModal from '../components/DiaryDetailModal'

const Home = () => {
  const nav = useNavigate();

  const [viewMode, setViewMode] = useState('grid') // 'grid' 또는 'list'
  const [currentPage, setCurrentPage] = useState(0) // 현재 페이지

  // Outlet context에서 diaryList 가져오기
  const { diaryList = [] } = useOutletContext()

  // 페이지당 보여줄 아이템 수
  const itemsPerPage = 6

  // 현재 페이지에 보여줄 데이터 계산
  const startIndex = currentPage * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentDiaryList = diaryList.slice(startIndex, endIndex)

  // 페이지 변경 핸들러
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage)
  }

  //모달창 보이기 여부
  const [isOpenDetail, setIsOpenDetail] = useState(false)

  return (
    <div className={styles.home}>
      <div className={styles.viewControls}>
        <button
          className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
          onClick={() => setViewMode('grid')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect x="2" y="2" width="7" height="7" rx="1"/>
            <rect x="11" y="2" width="7" height="7" rx="1"/>
            <rect x="2" y="11" width="7" height="7" rx="1"/>
            <rect x="11" y="11" width="7" height="7" rx="1"/>
          </svg>
          그리드
        </button>
        <button
          className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
          onClick={() => setViewMode('list')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect x="2" y="3" width="16" height="3" rx="1"/>
            <rect x="2" y="8.5" width="16" height="3" rx="1"/>
            <rect x="2" y="14" width="16" height="3" rx="1"/>
          </svg>
          리스트
        </button>
      </div>

      <div className={viewMode === 'grid' ? styles.diaryGrid : styles.diaryList}>
        {currentDiaryList.map((diary, i) => (
          <div
            key={i}
            className={viewMode === 'grid' ? styles.diaryCard : styles.diaryListItem}
            onClick={() => setIsOpenDetail(true)}
          >
            <div className={styles.cardHeader}>
              <span className={styles.feeling}>{diary.feeling}</span>
              <span className={styles.diaryDate}>{diary.diaryDate}</span>
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.diaryTitle}>{diary.title}</h3>
              <p className={styles.diaryContent}>{diary.content}</p>
            </div>
            <div className={styles.cardFooter}>
              <button
                className={styles.readMore}
                onClick={() => nav(`/detail/${diary.diaryNum}`)}  
              >자세히 보기</button>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalItems={diaryList.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        nextLabel={<i className="bi bi-caret-right-fill"></i>}
        previousLabel={<i className="bi bi-caret-left-fill"></i>}
        color='gray'
      />

      <DiaryDetailModal
        isOpen={isOpenDetail}
      />
    </div>
  )
}

export default Home