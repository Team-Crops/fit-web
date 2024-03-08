'use client';

import { useCallback, useState } from 'react';

import { InfoEditSection } from '#templates/MyPage/InfoEditSection';
import { MyInfoSection } from '#templates/MyPage/MyInfoSection';
import { ProfileSection } from '#templates/MyPage/ProfileSection';

export default function MyPage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditing = useCallback(() => {
    setIsEditing(!isEditing);
  }, [isEditing]);

  return (
    <>
      <ProfileSection isEditing={isEditing} />
      {isEditing ? (
        <InfoEditSection handleEditing={handleEditing} />
      ) : (
        <MyInfoSection handleEditing={handleEditing} />
      )}
    </>
  );
}
