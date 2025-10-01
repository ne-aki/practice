CREATE TABLE defense_type(
	TYPE_NUM INT PRIMARY KEY AUTO_INCREMENT,
	ATTACK_TYPE VARCHAR(10),
	NORMAL DOUBLE DEFAULT 1,
	FIRE DOUBLE DEFAULT 1,
	WATER DOUBLE DEFAULT 1,
	GRASS DOUBLE DEFAULT 1,
	ELECTRIC DOUBLE DEFAULT 1,
	ICE DOUBLE DEFAULT 1,
	FIGHTING DOUBLE DEFAULT 1,
	POISON DOUBLE DEFAULT 1,
	GROUND DOUBLE DEFAULT 1,
	FLYING DOUBLE DEFAULT 1,
	PSYCHIC DOUBLE DEFAULT 1,
	BUG DOUBLE DEFAULT 1,
	ROCK DOUBLE DEFAULT 1,
	GHOST DOUBLE DEFAULT 1,
	DRAGON DOUBLE DEFAULT 1,
	DARK DOUBLE DEFAULT 1,
	STEEL DOUBLE DEFAULT 1,
	FAIRY INT DEFAULT 1
);

DROP TABLE defense_type;

DELETE FROM defense_type;

SELECT * FROM defense_type;
#노말타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, ROCK
	, GHOST
	, STEEL
) VALUES (
	'NORMAL'
	, 0.5
	, 0
	, 0.5
);
#불꽃타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, WATER
	, GRASS
	, ICE
	, BUG
	, ROCK
	, DRAGON
	, STEEL
) VALUES (
	'FIRE'
	, 0.5
	, 0.5
	, 2
	, 2
	, 2
	, 0.5
	, 0.5
	, 2
);
#물타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, WATER
	, GRASS
	, GROUND
	, ROCK
	, DRAGON
) VALUES (
	'WATER'
	, 2
	, 0.5
	, 0.5
	, 2
	, 2
	, 0.5
);
#풀타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, WATER
	, GRASS
	, POISON
	, GROUND
	, FLYING
	, BUG
	, ROCK
	, DRAGON
	, STEEL
) VALUES (
	'GRASS'
	, 0.5
	, 2
	, 0.5
	, 0.5
	, 2
	, 0.5
	, 0.5
	, 2
	, 0.5
	, 0.5
);
#전기타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, WATER
	, GRASS
	, ELECTRIC
	, GROUND
	, FLYING
	, DRAGON
) VALUES (
	'ELECTRIC'
	, 2
	, 0.5
	, 0.5
	, 0
	, 2
	, 0.5
);
#얼음타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, WATER
	, GRASS
	, ICE
	, GROUND
	, FLYING
	, DRAGON
	, STEEL
) VALUES (
	'ICE'
	, 0.5
	, 0.5
	, 2
	, 0.5
	, 2
	, 2
	, 2
	, 0.5
);
#격투타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, NORMAL
	, ICE
	, POISON
	, FLYING
	, PSYCHIC
	, BUG
	, ROCK
	, GHOST
	, DARK
	, STEEL
	, FAIRY
) VALUES (
	'FIGHTING'
	, 2
	, 2
	, 0.5
	, 0.5
	, 0.5
	, 0.5
	, 2
	, 0
	, 2
	, 2
	, 0.5
);
#독타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, GRASS
	, POISON
	, GROUND
	, ROCK
	, GHOST
	, STEEL
	, FAIRY
) VALUES (
	'POISON'
	, 2
	, 0.5
	, 0.5
	, 0.5
	, 0.5
	, 0
	, 2
);
#땅타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, GRASS
	, ELECTRIC
	, POISON
	, FLYING
	, BUG
	, ROCK
	, STEEL
) VALUES (
	'GROUND'
	, 2
	, 0.5
	, 2
	, 2
	, 0
	, 0.5
	, 2
	, 2
);
#비행타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, GRASS
	, ELECTRIC
	, FIGHTING
	, BUG
	, ROCK
	, STEEL
) VALUES (
	'FLYING'
	, 2
	, 0.5
	, 2
	, 2
	, 0.5
	, 0.5
);
#에스퍼타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIGHTING
	, POISON
	, PSYCHIC
	, DARK
	, STEEL
) VALUES (
	'PSYCHIC'
	, 2
	, 2
	, 0.5
	, 0
	, 0.5
);
#벌레타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, GRASS
	, FIGHTING
	, POISON
	, FLYING
	, PSYCHIC
	, GHOST
	, DARK
	, STEEL
	, FAIRY
) VALUES (
	'BUG'
	, 0.5
	, 2
	, 0.5
	, 0.5
	, 0.5
	, 2
	, 0.5
	, 2
	, 0.5
	, 0.5
);
#바위타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, ICE
	, FIGHTING
	, GROUND
	, FLYING
	, BUG
	, STEEL
) VALUES (
	'ROCK'
	, 2
	, 2
	, 0.5
	, 0.5
	, 2
	, 2
	, 0.5
);
#고스트타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, NORMAL
	, PSYCHIC
	, GHOST
	, DARK
) VALUES (
	'GHOST'
	, 0
	, 2
	, 2
	, 0.5
);
#드래곤타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, DRAGON
	, STEEL
	, FAIRY
) VALUES (
	'DRAGON'
	, 2
	, 0.5
	, 0
);
#악타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIGHTING
	, PSYCHIC
	, GHOST
	, DARK
	, FAIRY
) VALUES (
	'DARK'
	, 0.5
	, 2
	, 2
	, 0.5
	, 0.5
);
#강철타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, WATER
	, ELECTRIC
	, ICE
	, ROCK
	, STEEL
	, FAIRY
) VALUES (
	'STEEL'
	, 0.5
	, 0.5
	, 0.5
	, 2
	, 2
	, 0.5
	, 2
);
#페어리타입 공격상성
INSERT INTO defense_type (
	ATTACK_TYPE
	, FIRE
	, FIGHTING
	, POISON
	, DRAGON
	, DARK
	, STEEL
) VALUES (
	'FAIRY'
	, 0.5
	, 2
	, 0.5
	, 2
	, 2
	, 0.5
);

SELECT * FROM defense_type;

#공격상성 조회
SELECT *
FROM defense_type
WHERE ATTACK_TYPE = 'NORMAL';
#단일타입 방어상성 조회
SELECT ATTACK_TYPE, NORMAL
FROM defense_type;
#복합타입 방어상성 조회
SELECT ATTACK_TYPE, (GHOST * DARK)
FROM defense_type;
#단일타입 방어상성의 한가지 공격상성 조회
SELECT ATTACK_TYPE, NORMAL
FROM defense_type
WHERE ATTACK_TYPE = 'NORMAL';
#복합타입 방어상성의 한가지 공격상성 조회
SELECT ATTACK_TYPE, (WATER * GROUND)
FROM defense_type
WHERE ATTACK_TYPE = 'ELECTRIC';

UPDATE defense_type
SET ATTACK_TYPE = '에스퍼'
WHERE ATTACK_TYPE = 'PSYCHIC';
	

COMMIT;