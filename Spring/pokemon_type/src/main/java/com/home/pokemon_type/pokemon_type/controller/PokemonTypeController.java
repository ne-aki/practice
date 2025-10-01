package com.home.pokemon_type.pokemon_type.controller;

import com.home.pokemon_type.pokemon_type.dto.PokemonTypeDTO;
import com.home.pokemon_type.pokemon_type.service.PokemonTypeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/poke-types")
@Slf4j
public class PokemonTypeController {
  private final PokemonTypeService pokemonTypeService;

  @GetMapping("")
  public List<PokemonTypeDTO> allType() {
    return pokemonTypeService.allType();
  }
}
