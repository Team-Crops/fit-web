import { ChangeEventHandler, useCallback, useState } from 'react';

import styled from '@emotion/styled';

import { Txt } from '#/components/atoms';
import { useTempAuthStore } from '#/stores/tempAuth';
import { LinkType } from '#/types/link';
import { IconName, Icons } from '#atoms/Icons';
import { PortfolioFileBlock } from '#atoms/MyPage/PortfolioFileBlock';
import { PortfolioTicket } from '#atoms/MyPage/PortfolioTicket';
import { Select } from '#atoms/Select';

const RegisterPortfolioContainer = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 27px;
`;
const PortfolioRightBlock = styled.div`
  width: calc(100% - 110px);
`;
const Register = styled.div`
  display: flex;
  gap: 8px;
`;
const InputBlock = styled.div`
  position: relative;
  width: calc(100% - 100px);
`;
const PortfolioUrlInput = styled.input`
  width: 100%;
  height: 32px;
  padding: 11px 35px 10px 10px;

  font-family: SpoqaHanSansNeo, sans-serif;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: -0.6px;

  border: 1px solid #bdbdbd;
  border-radius: 5px;

  ::placeholder {
    color: #9e9e9e;
  }
`;
const UploadButton = styled.div`
  cursor: pointer;

  position: absolute;
  top: 50%;
  right: 9px;
  transform: translateY(-50%);

  display: flex;
`;
const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  margin-top: 20px;
`;
const FlexBlock = styled.div`
  display: flex;
  gap: 9px;
  align-items: center;
`;

interface PlatformProps {
  icon: IconName;
  text: string;
  value: string;
}
const SelectPlatform: PlatformProps[] = [
  { icon: 'link', text: 'Link', value: 'LINK' },
  { icon: 'facebook', text: 'Facebook', value: 'FACEBOOK' },
  { icon: 'github', text: 'Github', value: 'GITHUB' },
  { icon: 'velog', text: 'Velog', value: 'VELOG' },
  { icon: 'linkedin', text: 'Linkedin', value: 'LINKEDIN' },
  { icon: 'instagram', text: 'Instagram', value: 'INSTAGRAM' },
  { icon: 'tistory', text: 'Tistory', value: 'TISTORY' },
];

export const RegisterPortfolioBlock = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<LinkType>('LINK');
  const [portfolioUrl, setPortfolioUrl] = useState<string>('');
  const tempUser = useTempAuthStore((state) => state.tempUser);
  const setTempUser = useTempAuthStore((state) => state.setTempUser);

  const handlePlatformChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setSelectedPlatform(e.target.value as LinkType);
  }, []);
  const uploadLinkList = useCallback(() => {
    if (tempUser === null) return;
    if (!portfolioUrl) return alert('URL을 입력해주세요.');
    if ((tempUser.linkList?.length ?? 0) >= 4)
      return alert('포트폴리오는 최대 4개까지 등록 가능합니다.');
    setTempUser({
      ...tempUser,
      linkList: [
        ...(tempUser.linkList ?? []),
        { linkType: selectedPlatform, linkUrl: portfolioUrl },
      ],
    });
    setPortfolioUrl('');
  }, [portfolioUrl, selectedPlatform, setTempUser, tempUser]);

  return (
    <RegisterPortfolioContainer>
      <PortfolioFileBlock isEdit />
      <PortfolioRightBlock>
        <Register>
          <Select width="92px" value={selectedPlatform} onChange={handlePlatformChange}>
            {SelectPlatform.map((platform) => (
              <Select.Option value={platform.value} key={platform.text}>
                <FlexBlock>
                  <Icons icon={platform.icon} width={11} height={11} color="#FF706C" />
                  <Txt size="typo6" weight="regular" color="#9E9E9E">
                    {platform.text}
                  </Txt>
                </FlexBlock>
              </Select.Option>
            ))}
          </Select>
          <InputBlock>
            <PortfolioUrlInput
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.nativeEvent.isComposing) return;
                e.key === 'Enter' && uploadLinkList();
              }}
              placeholder="URL 주소를 입력하세요"
            />
            <UploadButton onClick={uploadLinkList}>
              <Icons icon="upload" width={21} height={21} />
            </UploadButton>
          </InputBlock>
        </Register>
        <PortfolioList>
          {tempUser?.linkList?.map((link, index) => (
            <PortfolioTicket
              key={index}
              icon={link.linkType.toLowerCase() as IconName}
              text={link.linkUrl}
              editMode
            />
          ))}
        </PortfolioList>
      </PortfolioRightBlock>
    </RegisterPortfolioContainer>
  );
};
