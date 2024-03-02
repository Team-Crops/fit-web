import Image from 'next/image';

import { Icons } from '#atoms/Icons';
import styled from '@emotion/styled';

const Block = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
const ProfileImage = styled(Image)`
  border-radius: 50%;
`;
const EditButton = styled.label`
  position: absolute;
  right: 0;
  bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #eeeeee;
  cursor: pointer;
`;
const ProfileInput = styled.input`
  display: none;
`;

interface ProfileBlockProps {
  size: number;
  editable?: boolean;
}
export const ProfileBlock = ({ size, editable }: ProfileBlockProps) => {
  return (
    <Block size={size}>
      <ProfileImage src="/강아지.jpeg" alt="profile" layout="fill" objectFit="cover" />

      {editable && (
        <>
          <EditButton htmlFor="profileImage">
            <Icons icon="pencil" width={32} height={32} />
          </EditButton>
          <ProfileInput type="file" id="profileImage" />
        </>
      )}
    </Block>
  );
};
