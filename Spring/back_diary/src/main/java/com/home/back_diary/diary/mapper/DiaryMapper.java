package com.home.back_diary.diary.mapper;

import com.home.back_diary.diary.dto.DiaryDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DiaryMapper {
  //다이어리 추가
  void addNewDiary(DiaryDTO diaryDTO);
  //다이어리 목록 조회
  List<DiaryDTO> getDiaryList();
  //하나의 다이어리 조회
  DiaryDTO getDiaryDetail(int diaryNum);
}
