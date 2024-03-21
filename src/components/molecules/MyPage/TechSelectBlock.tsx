import { useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#atoms/Text';
import { PositionBadge } from './PositionBadge';

const TechContainer = styled.div`
  width: 449px;
  min-height: 178px;
  margin: 28px 0 0 8px;
  padding: 7px 20px;

  border: 1px solid #e0e0e0;
  border-radius: 11px;
`;
const TechType = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;

  span {
    cursor: pointer;
    padding: 11px 5px;
  }
`;
const TechListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 14px;
  padding: 20px 0 0;
`;

type Position = '기획자' | '디자이너' | '서버 개발자' | '웹 프론트 개발자' | '앱 개발자';
const PositionList: Position[] = [
  '기획자',
  '디자이너',
  '서버 개발자',
  '웹 프론트 개발자',
  '앱 개발자',
];
const TechList = {
  기획자: ['GA', 'Tablue'],
  디자이너: ['Figma', 'Photoshop', 'illustrator', 'Adobe xd', 'zeplin'],
  '서버 개발자': ['spring', 'node', 'nest', 'go', 'express', 'django', 'flask'],
  '웹 프론트 개발자': [
    'React',
    'Vue.js',
    'Angular',
    'Svelte',
    'Solid JS',
    'Qwik',
    'Next.js',
    'Remix',
    'Universal',
    'Nuxt.js',
    'Svelte Kit',
  ],
  '앱 개발자': [
    'UIKit',
    'SwiftUI',
    'Kotlin',
    'Java',
    'Jetpack',
    'Coroutine',
    'Flutter',
    'React-Native',
  ],
};

export const TechSelectBlock = () => {
  const [selectedType, setSelectedType] = useState<Position>('기획자');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const handleType = useCallback(
    (type: Position) => () => {
      setSelectedType(type);
    },
    []
  );
  const handleTech = useCallback(
    (tech: string) => () => {
      setSelectedTech((prev) => {
        if (prev.includes(tech)) {
          return prev.filter((t) => t !== tech);
        } else {
          return [...prev, tech];
        }
      });
    },
    []
  );

  return (
    <TechContainer>
      <TechType>
        {PositionList.map((position) => (
          <Txt
            key={position}
            size="typo6"
            weight={selectedType === position ? 'bold' : 'regular'}
            color={selectedType === position ? '#FF706C' : '#9E9E9E'}
            onClick={handleType(position)}
          >
            {position}
          </Txt>
        ))}
      </TechType>
      <TechListBlock>
        {TechList[selectedType].map((tech) => (
          <PositionBadge
            key={tech}
            position={tech}
            selected={selectedTech.includes(tech)}
            onClick={handleTech(tech)}
          />
        ))}
      </TechListBlock>
    </TechContainer>
  );
};
