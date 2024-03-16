'use client';

import { useCallback, useState } from 'react';

import { Footer } from '#/components/templates/Footer';
import { Header } from '#/components/templates/Header';
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
      <Header />
      <ProfileSection isEditing={isEditing} />
      {isEditing ? (
        <InfoEditSection handleEditing={handleEditing} />
      ) : (
        <MyInfoSection handleEditing={handleEditing} />
      )}
      <Footer />
    </>
  );
}
