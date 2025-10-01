import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PokemonType.module.css'

const PokemonType = () => {
  const [pokeType, setPokeType] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/poke-types')
    .then(res => {
      // console.log(res.data);
      setPokeType(res.data);
    })
    .catch(e => console.log(e));
  }, []);

  // 타입 상성을 심볼로 변환하는 함수
  const getEffectivenessSymbol = (value) => {
    if (value === 2) {
      return <span className={styles.effective}>●</span>; // 효과가 좋다 (2배)
    } else if (value === 0.5) {
      return <span className={styles.notEffective}>▲</span>; // 효과가 별로다 (0.5배)
    } else if (value === 0) {
      return <span className={styles.noEffect}>×</span>; // 효과가 없다 (0배)
    }
    return null; // 보통 (1배)는 빈칸
  };

  return (
    <div>
      <div className={styles.button_container}>
        <button
          className={styles.detail_button}
          onClick={() => navigate('/detail')}
        >
          타입별상성 확인하기
        </button>
      </div>
      <table className={styles.type_table}>
        <colgroup>
          <col width={'*'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
          <col width={'5%'} />
        </colgroup>
        <thead>
          <tr>
            <td>공격\방어</td>
            <td>노말</td>
            <td>불꽃</td>
            <td>물</td>
            <td>풀</td>
            <td>전기</td>
            <td>얼음</td>
            <td>격투</td>
            <td>독</td>
            <td>땅</td>
            <td>비행</td>
            <td>에스퍼</td>
            <td>벌레</td>
            <td>바위</td>
            <td>고스트</td>
            <td>드래곤</td>
            <td>악</td>
            <td>강철</td>
            <td>페어리</td>
          </tr>
        </thead>
        <tbody>
          {
            pokeType.map((e, i) => {
              return(
                <tr key={i}>
                  <td className={styles.type_name}>{e.attackType}</td>
                  <td>{getEffectivenessSymbol(e.normal)}</td>
                  <td>{getEffectivenessSymbol(e.fire)}</td>
                  <td>{getEffectivenessSymbol(e.water)}</td>
                  <td>{getEffectivenessSymbol(e.grass)}</td>
                  <td>{getEffectivenessSymbol(e.electric)}</td>
                  <td>{getEffectivenessSymbol(e.ice)}</td>
                  <td>{getEffectivenessSymbol(e.fighting)}</td>
                  <td>{getEffectivenessSymbol(e.poison)}</td>
                  <td>{getEffectivenessSymbol(e.ground)}</td>
                  <td>{getEffectivenessSymbol(e.flying)}</td>
                  <td>{getEffectivenessSymbol(e.psychic)}</td>
                  <td>{getEffectivenessSymbol(e.bug)}</td>
                  <td>{getEffectivenessSymbol(e.rock)}</td>
                  <td>{getEffectivenessSymbol(e.ghost)}</td>
                  <td>{getEffectivenessSymbol(e.dragon)}</td>
                  <td>{getEffectivenessSymbol(e.dark)}</td>
                  <td>{getEffectivenessSymbol(e.steel)}</td>
                  <td>{getEffectivenessSymbol(e.fairy)}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default PokemonType