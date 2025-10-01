package com.home.back_diary.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DiaryDTO {
  private int diaryNum;
  
  @JsonFormat(pattern = "yyyy-MM-dd")
  private LocalDate diaryDate;
  
  private String feeling;
  private String title;
  private String content;
}
