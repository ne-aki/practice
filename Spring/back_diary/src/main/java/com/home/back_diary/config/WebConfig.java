package com.home.back_diary.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//CORS 설정 클래스 파일
// - REACT, REACT NATIVE 에서 스프링 서버로 접근을 허용하는 설정
// - CORS 설정은 기본적으로 SPRING 프로젝트(백엔드)에서 작업을 한다.

//Configuration 어노테이션 : 객체 생성 + 해당 클래스가 설정 파일임을 인지
//WebMvcConfigurer 인터페이스 안에 addCorsMappings 메서드 존재
//addCorsMappings 메서드 안에서 cors 설정 코드 추가
@Configuration
public class WebConfig implements WebMvcConfigurer {

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**") // 접근 허용할 SPRING의 API URL
            .allowedOrigins(
                    "http://localhost:5173" //react
            ) //접근을 허용할 origin 서버
            .allowedMethods("GET", "POST", "PUT", "DELETE")
            .allowedHeaders("*") //요청 시 허용할 헤더 정보
            .allowCredentials(false); //토큰 로그인 방식 사용 시에는 true 설정
  }
}
