package com.home.pokemon_type.pokemon_type.service;

import com.home.pokemon_type.pokemon_type.dto.PokemonTypeDTO;
import com.home.pokemon_type.pokemon_type.mapper.PokemonTypeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PokemonTypeService {
  private final PokemonTypeMapper pokemonTypeMapper;

  public List<PokemonTypeDTO> allType() {
    return pokemonTypeMapper.allType();
  }
}
