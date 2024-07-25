import styled from '@emotion/styled';

import { Backdrop, Button, Icons, Textarea, Txt } from '#/components/atoms';
import { type ReportUserMutationArg } from '#/hooks/use-projects';
import { ReportType } from '#/types';

const REPORT_TYPE_KEY = 'reportType';
const DESCRIPTION_KEY = 'description';

interface ReportPopupProps {
  onClose: () => void;
  onReport: (args: Omit<ReportUserMutationArg, 'targetUserId'>) => Promise<void>;
}

export const ReportPopup = ({ onClose, onReport }: ReportPopupProps) => {
  return (
    <Backdrop onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Txt size="typo3" weight="bold">
          신고하기 <Icons icon="emojiPoliceCarLight" size={20} />
        </Txt>
        <Form
          action={async (formdata) => {
            const reportType = formdata.get(REPORT_TYPE_KEY)?.toString();
            const description = formdata.get(DESCRIPTION_KEY)?.toString();
            if (!reportType || !description) {
              return;
            }
            await onReport({ reportType: reportType as ReportType, description });
            onClose();
          }}
        >
          <RadioSet>
            <input type="radio" name={REPORT_TYPE_KEY} value={ReportType.ESCAPE} />
            <label htmlFor="">탈주</label>
            <input type="radio" name={REPORT_TYPE_KEY} value={ReportType.DIVE} />
            <label htmlFor="">잠수</label>
            <input type="radio" name={REPORT_TYPE_KEY} value={ReportType.ETC} />
            <label htmlFor="">기타</label>
          </RadioSet>
          <StyledTextarea name={DESCRIPTION_KEY} />
          <div />
          <ButtonContainer>
            <Button
              variant={'angular'}
              height="50"
              color="secondary"
              type="button"
              onClick={() => onClose()}
            >
              취소
            </Button>
            <Button variant={'angular'} height="50" color="primary" type="submit">
              신고
            </Button>
          </ButtonContainer>
        </Form>
      </Container>
    </Backdrop>
  );
};

const Container = styled.div`
  padding: 50px 40px 30px;
  background-color: #fff;
  border-radius: 8px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RadioSet = styled.fieldset`
  display: grid;
  grid-template-columns: 16px auto;
  gap: 20px 10px;

  margin-top: 30px;
  padding: 0;

  border: none;
`;

const StyledTextarea = styled(Textarea)`
  resize: vertical;

  width: 325px;
  height: 165px;
  padding: 10px;

  border: 1px solid #e0e0e0;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;
