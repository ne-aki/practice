import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './PokemonTypeDetail.module.css'

const PokemonTypeDetail = () => {
  const [pokeType, setPokeType] = useState([]);
  const [type1, setType1] = useState('');
  const [type2, setType2] = useState('');
  const navigate = useNavigate();

  const typeList = ['노말', '불꽃', '물', '풀', '전기', '얼음', '격투', '독', '땅', '비행', '에스퍼', '벌레', '바위', '고스트', '드래곤', '악', '강철', '페어리'];

  useEffect(() => {
    axios.get('/api/poke-types')
    .then(res => {
      setPokeType(res.data);
    })
    .catch(e => console.log(e));
  }, []);

  // 타입 상성을 심볼로 변환하는 함수
  const getEffectivenessSymbol = (value) => {
    if (value === 4) {
      return <span className={styles.effective4}>●●</span>; // 4배
    } else if (value === 2) {
      return <span className={styles.effective}>●</span>; // 2배
    } else if (value === 0.5) {
      return <span className={styles.notEffective}>▲</span>; // 0.5배
    } else if (value === 0.25) {
      return <span className={styles.notEffective25}>▲▲</span>; // 0.25배
    } else if (value === 0) {
      return <span className={styles.noEffect}>×</span>; // 0배
    }
    return null; // 보통 (1배)는 빈칸
  };

  // 두 타입의 곱셈 결과 계산
  const calculateCombinedEffectiveness = () => {
    if (!type1 || !type2 || pokeType.length === 0) return [];

    const results = [];
    const defenseKey1 = getTypeKey(type1);
    const defenseKey2 = type2 === '없음' ? null : getTypeKey(type2);

    // 각 공격 타입별로 방어 상성 계산
    typeList.forEach(attackType => {
      const attackData = pokeType.find(t => t.attackType === attackType);

      if (attackData) {
        // type1, type2가 방어 타입이므로 해당 열의 값을 가져옴
        const value1 = attackData[defenseKey1] !== undefined ? attackData[defenseKey1] : 1;
        const value2 = defenseKey2 ? (attackData[defenseKey2] !== undefined ? attackData[defenseKey2] : 1) : 1;
        const combined = value1 * value2;

        results.push({
          attackType,
          value1,
          value2,
          combined
        });
      }
    });

    return results;
  };

  // 타입명을 영어 키로 변환
  const getTypeKey = (typeName) => {
    const typeMap = {
      '없음': 'none',
      '노말': 'normal',
      '불꽃': 'fire',
      '물': 'water',
      '풀': 'grass',
      '전기': 'electric',
      '얼음': 'ice',
      '격투': 'fighting',
      '독': 'poison',
      '땅': 'ground',
      '비행': 'flying',
      '에스퍼': 'psychic',
      '벌레': 'bug',
      '바위': 'rock',
      '고스트': 'ghost',
      '드래곤': 'dragon',
      '악': 'dark',
      '강철': 'steel',
      '페어리': 'fairy'
    };
    return typeMap[typeName];
  };

  const results = calculateCombinedEffectiveness();

  return (
    <div className={styles.container}>
      <div className={styles.button_container}>
        <button
          className={styles.back_button}
          onClick={() => navigate('/')}
        >
          전체 상성표 보기
        </button>
      </div>

      <div className={styles.select_container}>
        <div className={styles.select_box}>
          <label>타입 1:</label>
          <select value={type1} onChange={(e) => setType1(e.target.value)}>
            <option value="">선택하세요</option>
            {typeList.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className={styles.select_box}>
          <label>타입 2:</label>
          <select value={type2} onChange={(e) => setType2(e.target.value)}>
            <option value="">선택하세요</option>
            <option value="없음">없음</option>
            {typeList.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {type1 && type2 && (
        <table className={styles.result_table}>
          <thead>
            <tr>
              <th>공격 타입</th>
              <th>{type1}</th>
              <th>{type2}</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td className={styles.attack_type}>{result.attackType}</td>
                <td>{getEffectivenessSymbol(result.value1)}</td>
                <td>{getEffectivenessSymbol(result.value2)}</td>
                <td className={styles.combined}>{getEffectivenessSymbol(result.combined)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default PokemonTypeDetail