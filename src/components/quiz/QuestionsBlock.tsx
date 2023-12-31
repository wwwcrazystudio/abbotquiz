import { Examination, Option } from '../../types/interfaces';
import { RadioLabel } from '../form/RadioLabel';
import { Checkbox } from '../form/Checkbox';
import { BackLink, Button, Foot, Heading, QuizWrap } from '../elements';
import styled from 'styled-components';
import { RadioList } from '../form/RadioList';

interface Props {
  title: string;
  questions: Examination['questions'];
  children?: JSX.Element | JSX.Element[];
  cols?: number
  onChange?: (val: Option, id: string) => void;
  onBack?: () => void;
  onNext?: () => void;
}

const QuestionHeading = styled.div`
  font-size: 20px;
  margin-bottom: 12px;
  font-weight: 700;

  ul {
    margin-top: 4px;
  }

  span {
    color: var(--accent);
    font-weight: 700;
  }

  @media (max-width: 991px) {
    font-size: 16px;
    margin-bottom: 20px;
  }
`;

const QuestionsList = styled.div<{$cols?: number}>`
  display: grid;
  grid-template-columns: ${props => props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr'};
  gap: 32px;
  margin-bottom: 40px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    margin-bottom: 0;
    gap: 16px;
  }
`;

const QuestionWarning = styled.div`
  font-size: 20px;
  line-height: 25px;
  padding-left: 28px;
  color: #d50032;
  position: relative;
  margin-top: 20px;

  @media (max-width: 991px) {
    font-size: 16px;
    margin-top: 12px;
    line-height: 125%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%0A%3Csvg width='20' height='21' viewBox='0 0 20 21' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='system icon'%3E%3Cpath id='Vector' d='M10.0026 18.8346C14.6051 18.8346 18.3359 15.1038 18.3359 10.5013C18.3359 5.8988 14.6051 2.16797 10.0026 2.16797C5.4001 2.16797 1.66927 5.8988 1.66927 10.5013C1.66927 15.1038 5.4001 18.8346 10.0026 18.8346ZM10.8359 9.66797V14.668H9.16927V9.66797H10.8359ZM10.8359 6.33464V8.0013H9.16927V6.33464H10.8359Z' fill='%23D50032'/%3E%3C/g%3E%3C/svg%3E%0A");
  }
`;

const RadioListWrap = styled.div<{ $cols?: number }>`
  display: grid;
  gap: 18px;
  grid-template-columns: ${(props) => `repeat(${props.$cols}, 1fr)`};
  align-items: stretch;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const RadioLabelsWrap = styled.div<{ $cols: number }>`
  display: grid;
  gap: 12px;
  grid-template-columns: ${(props) => `repeat(${props.$cols}, 1fr)`};
  align-items: stretch;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const CheckboxList = styled.div<{$cols?: number}>`
  display: grid;
  gap: 10px 8px;
  grid-template-columns: ${props => props.$cols ? `repeat(${props.$cols}, 1fr)` : '1fr 1fr'};
  align-items: start;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const NextBtn = styled(Button)`
  margin-top: 32px;

  @media (max-width: 991px) {
    margin-top: 0;
  }
`;

const QuestionsBlock = ({
  title,
  questions,
  children,
  cols,
  onBack,
  onChange,
  onNext,
}: Props) => {
  const isBtnActive = () => {
    return questions!.filter(el => !el.optional).every((el) => typeof el.value?.value !== 'undefined');
  };

  const calcCols = (count: number) => {
    if (count >= 6) {
      return 1;
    }

    if (count >= 4) {
      return 2;
    }

    return 4;
  };

  const checkCondition = (condition?: { question: string, value: string | number}) => {
    if (!condition) return true

    const conditionQuestion = questions?.find((el) => el.id === condition.question)

    return conditionQuestion?.value?.value === condition.value;
  };

  const handleCheckboxChange = (val: Option, id: string) => {
    const question = questions?.find((el) => el.id === id);

    if (!question) return;

    if (!question.value) {
      onChange &&
        onChange(
          {
            label: val.label,
            value: JSON.stringify([val]),
          },
          id
        );
      return;
    }

    let value = JSON.parse(question.value.value as string) as Option[];

    if (value.some((el) => el.value === val.value)) {
      value = value.filter((el) => el.value !== val.value);
    } else {
      value.push(val);
    }

    onChange &&
      onChange(
        {
          label: val.label,
          value: JSON.stringify(value),
        },
        id
      );
  };

  return (
    <QuizWrap>
      <BackLink onClick={onBack}>Назад</BackLink>

      <Heading>{title}</Heading>

      <QuestionsList $cols={cols}>
        {questions?.map((question) => (
          <div key={question.id}>
            {checkCondition(question.condition) && (           
              <div>
                {question.type === 'radio' && (
                  <>
                    <QuestionHeading
                      dangerouslySetInnerHTML={{ __html: question.title }}
                    />
                    <RadioLabelsWrap
                      $cols={question.cols || calcCols(question.options?.length || 3)}
                    >
                      {question?.options?.map((option) => (
                        <RadioLabel
                          key={option.label + question.id}
                          name={question.title}
                          checked={option.value === question.value?.value}
                          value={option.value}
                          label={option.label}
                          onChange={() =>
                            onChange && onChange(option, question.id)
                          }
                        />
                      ))}
                    </RadioLabelsWrap>
                  </>
                )}

                {question.type === 'checkbox' && (
                  <>
                    <QuestionHeading
                      dangerouslySetInnerHTML={{ __html: question.title }}
                    />
                    <CheckboxList $cols={question.cols}>
                      {question?.options?.map((option) => (
                        <Checkbox
                          key={option.label}
                          label={option.label}
                          value={option.label}
                          checked={JSON.parse(
                            (question.value?.value as string) || '[]'
                          ).some((el: Option) => el.value === option.value)}
                          onChange={() =>
                            handleCheckboxChange(option, question.id)
                          }
                        />
                      ))}
                    </CheckboxList>
                  </>
                )}

                {question.type === 'radioList' && (
                  <RadioListWrap $cols={question.cols}>
                    {question?.options?.map((option) => (
                      <RadioList
                        key={option.label + question.id}
                        name={question.title}
                        checked={option.value === question.value?.value}
                        value={option.value}
                        cols={option.cols}
                        pill={question.pill}
                        title={option.title}
                        label={option.label}
                        onChange={() =>
                          onChange && onChange(option, question.id)
                        }
                      />
                    ))}
                  </RadioListWrap>
                )}

                {question.warning &&
                  question.warning.condition === question.value?.value && (
                    <QuestionWarning>{question.warning.text}</QuestionWarning>
                  )}
              </div>
            )}
          </div>
        ))}
      </QuestionsList>

      {children}

      <Foot $align="flex-end">
        {isBtnActive() && <NextBtn onClick={onNext}>Продолжить</NextBtn>}
      </Foot>
    </QuizWrap>
  );
};

export { QuestionsBlock };
