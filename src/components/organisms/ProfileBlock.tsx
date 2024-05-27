import { ChangeEvent, ChangeEventHandler, InputHTMLAttributes, useCallback, useState } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';

import { useMeQuery } from '#/hooks/use-user';
import { useTempAuthStore } from '#/stores/tempAuth';
import { getStorageUrl } from '#/utilities';
import { Icons } from '#atoms/Icons';
import { Loading } from '../atoms';

const Block = styled.div<{ size: number }>`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;
const ProfileImage = styled(Image)`
  border-radius: 50%;
`;
const EditButton = styled.label`
  cursor: pointer;

  position: absolute;
  right: 0;
  bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;

  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
`;
const ProfileInput = styled.input`
  display: none;
`;

interface ProfileBlockProps {
  size: number;
  editable?: boolean;
}
export const ProfileBlock = ({ size, editable }: ProfileBlockProps) => {
  const [imageBase64, setImageBase64] = useState<string | ArrayBuffer | null>(null);

  const setTempImage = useTempAuthStore((state) => state.setTempProfileImage);

  const { data: me } = useMeQuery();

  const handleTempImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files === null) return;
      const file = e.target.files[0];
      if (file) {
        setTempImage(file);
        const reader = new FileReader();
        reader.onload = () => {
          setImageBase64(reader.result);
        };
        reader.readAsDataURL(file);
      }
    },
    [setTempImage]
  );

  if (!me) return <Loading />;
  return (
    <Block size={size}>
      {editable && imageBase64 ? (
        <ProfileImage
          src={imageBase64.toString()}
          alt="profile"
          width={size}
          height={size}
          style={{
            objectFit: 'cover',
          }}
        />
      ) : me.profileImageUrl ? (
        <ProfileImage
          src={getStorageUrl(me.profileImageUrl)}
          alt="profile"
          width={size}
          height={size}
          style={{
            objectFit: 'cover',
          }}
        />
      ) : (
        <Icons icon="account" width={size} height={size} style={{ zIndex: '10' }} />
      )}

      {editable && (
        <>
          <EditButton htmlFor="profileImage">
            <Icons icon="pencil" width={32} height={32} />
          </EditButton>
          <ProfileInput
            onChange={handleTempImageChange}
            type="file"
            id="profileImage"
            accept=".jpg, .jpeg, .png"
          />
        </>
      )}
    </Block>
  );
};
