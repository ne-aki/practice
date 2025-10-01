package com.home.back_diary.diary.controller;

import com.home.back_diary.diary.dto.DiaryDTO;
import com.home.back_diary.diary.service.DiaryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/diaries")
public class DiaryController {
  private final DiaryService diaryService;

  //다이어리 추가 api
  @PostMapping("")
  public ResponseEntity<?> addNewDiary(@RequestBody DiaryDTO diaryDTO) {
    log.info(diaryDTO.toString());
    try {
      diaryService.addNewDiary(diaryDTO);
      return ResponseEntity
              .status(HttpStatus.CREATED)
              .build();
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("다이어리가 등록되지 않았습니다.");
    }
  }
  //다이어리 목록조회 api
  @GetMapping("")
  public ResponseEntity<?> getDiaryList() {
    try {
      List<DiaryDTO> diaryList = diaryService.getDiaryList();
      return ResponseEntity
              .status(HttpStatus.OK)
              .body(diaryList);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("다이어리를 불러오지 못했습니다.");
    }
  }
  //하나의 다이어리 조회 api
  @GetMapping("/{diaryNum}")
  public ResponseEntity<?> getDiaryDetail(@PathVariable("diaryNum") int diaryNum) {
    try {
      DiaryDTO diaryDTO = diaryService.getDiaryDetail(diaryNum);
      return ResponseEntity
              .status(HttpStatus.OK)
              .body(diaryDTO);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("다이어리를 불러오지 못했습니다.");
    }
  }
}
