package com.home.pokemon_type.pokemon_type.mapper;

import com.home.pokemon_type.pokemon_type.dto.PokemonTypeDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface PokemonTypeMapper {
  List<PokemonTypeDTO> allType();
}
