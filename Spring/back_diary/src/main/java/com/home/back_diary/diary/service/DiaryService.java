package com.home.back_diary.diary.service;

import com.home.back_diary.diary.dto.DiaryDTO;
import com.home.back_diary.diary.mapper.DiaryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DiaryService {
  private final DiaryMapper diaryMapper;

  //새 다이어리 추가
  public void addNewDiary(DiaryDTO diaryDTO) {
    diaryMapper.addNewDiary(diaryDTO);
  }
  //다이어리 목록 조회
  public List<DiaryDTO> getDiaryList() {
    return diaryMapper.getDiaryList();
  }
  //하나의 다이어리 조회
  public DiaryDTO getDiaryDetail(int diaryNum) {
    return diaryMapper.getDiaryDetail(diaryNum);
  }
}
