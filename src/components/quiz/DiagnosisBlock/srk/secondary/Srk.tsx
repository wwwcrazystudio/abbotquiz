import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  Item,
  List,
  Notice,
  QuizWrap,
  Text,
} from '../../../../elements';
import { DiagnosisCard, DiagnosisHeading } from '../../elements';
import { DosageList } from '../../../../DosageList';
import {
  DosageItem,
  RecommendationCardType,
} from '../../../../../types/interfaces';

import tube from '../../../../../assets/img/tube.png';
import kidney from '../../../../../assets/img/kidney.png';
import stomach from '../../../../../assets/img/stomach.png';
import egds from '../../../../../assets/img/egds.png';
import schedule from '../../../../../assets/img/schedule.png';
import { setMedsToCheck } from '../../../../../store/utilsSlice';
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { selectSrkExaminations } from '../../../../../store/srk/examinationsSlice';
import { useMemo } from 'react';

interface Props {
  onBack: () => void;
}

interface DosageListType {
  title: string;
  level?: string;
  items: DosageItem[];
}

const Srk = ({ onBack }: Props) => {
  const dispatch = useAppDispatch();

  const questions = useAppSelector(selectSrkExaminations);

  const bsfkAnswer = useMemo(
    () => questions.find((el) => el.group === 'bsfk')?.value?.value,
    [questions]
  );

  const diagnosis = useMemo(() => {
    switch (bsfkAnswer) {
      case 1:
        return {
          title: 'СРК с запором',
          code: 'Код по МКБ-10: K58.2',
        };
      case 2:
        return {
          title: 'СРК с диареей',
          code: 'Код по МКБ-10: K58.1',
        };
      case 3:
        return {
          title: 'СРК смешанного типа',
          code: 'Код по МКБ-10: K58.3',
        };
      case 4:
        return {
          title: 'Неклассифицируемый СРК',
          code: 'Код по МКБ-10: K58.8',
        };
      default:
        break;
    }
  }, [bsfkAnswer]);

  const recommendations = [
    {
      title: 'Лабораторные диагностические исследования:',
      list: [
        'Общий (клинический) анализ крови',
        'Биохимический анализ крови',
        'Анализ кала на скрытую кровь',
      ],
      icon: tube,
    },
    {
      title:
        'Проведение гистологического исследования образцов ткани толстой кишки для исключения диагноза “Микроскопический колит”',
      icon: kidney,
    },
  ] as RecommendationCardType[];

  const usefulMaterials = [
    {
      title: 'Памятки по подготовке к исследованиям:',
      icon: stomach,
      expandable: true,
      unlist: true,
      list: [
        'ЭГДС <a href="/cdss/pdf/egds.pdf">Скачать</a>',
        'Манометрия высокого разрешения <a href="/cdss/pdf/manometry.pdf">Скачать</a>',
        'Рентгеноскопия <a href="/cdss/pdf/rentgen.pdf">Скачать</a>',
      ],
    },
    {
      title: 'Памятки по питанию и модификации образа жизни:',
      icon: egds,
      expandable: true,
      unlist: true,
      list: [
        'Дневник наблюдения <a href="">Скачать</a>',
        'Рекомендации по изменению образа жизни и пищевого поведения <a href="/cdss/pdf/lifestyle.pdf">Скачать</a>',
      ],
    },
  ];

  const additional = [
    {
      title:
        'Контрольный прием через 3 месяца для оценки эффективности проводимого лечения',
      icon: schedule,
    },
  ];

  const allDosage = useMemo(() => {
    const list: DosageListType[] = [];

    list.push({
      title: 'Спазмолитики',
      level: 'A1',
      items: [
        {
          title: 'Мебеверин',
          dosage: '200 мг 2 раза в день',
        },
        {
          title: 'Гиосцина бутилбромид',
          dosage: `Внутрь: 10-20 мг 3-5 раз в день <br> Ректально: 10-20 мг 3-5 раз в день <br />
          Ректально: 10-20 мг 3-5 раз в день`,
        },
        {
          title: 'Пинаверия бромид',
          dosage: '50-100 мг 2-3 раза в день',
        },
      ],
    });

    list.push({
      title: 'Другие препараты:',
      items: [
        {
          title: 'Тримебутин',
          level: 'В2',
          dosage: '100-200 мг 3 раза в сутки',
        },
        {
          title: 'STW 5',
          level: 'C5',
          dosage: '20 капель 3 раза в день',
        },
      ],
    });

    if (diagnosis?.title !== 'СРК с диареей') {
      list.push({
        title: 'Слабительные средства:',
        items: [
          {
            title: 'Лактулоза',
            dosage: '15-40 мл сиропа в сутки',
            level: 'С5',
          },
          {
            title: 'Полиэтиленгликоль',
            level: 'С5',
            dosage: '10-20 г в сутки',
          },
          {
            title: 'Лактитол',
            level: 'С5',
            dosage: '10-20 г в сутки',
          },
          {
            title: 'Оболочка семян подорожника овального',
            dosage: '10 г в сутки',
            level: 'A2',
          },
          {
            title: 'Бисакодил',
            level: 'A2',
            dosage: '5-15 мг 1 раз в сутки',
          },
        ],
      });
    }

    if (diagnosis?.title !== 'СРК с запором') {
      list.push({
        title: 'Противодиарейные средства:',
        items: [
          {
            title: 'Лоперамид',
            level: 'B3',
            dosage:
              'Начальная доза 4 мг, далее по 2 мг по потребности. Максимальная суточная дозировка - 12 мг',
          },
          {
            title: 'Смектит диоктаэдрический',
            dosage: '3 г до 3 раз в день',
            level: 'B2',
          },
          {
            title: 'Рифаксимин',
            dosage: '200-400 мг каждые 8-12 часов',
            level: 'A1',
          },
        ],
      });
    }

    return list;
  }, [bsfkAnswer]);

  const allMeds = () => {
    const items: string[] = [];

    allDosage.forEach((el) => {
      el.items.forEach((el) => items.push(el.title));
    });

    return items;
  };

  dispatch(setMedsToCheck(allMeds()));

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Вероятный диагноз</DiagnosisHeading>

          <DiagnosisCard style={{gap: 0}}>
            <div style={{color: 'var(--accent)'}}>{diagnosis?.title}</div>
            {diagnosis?.code}
          </DiagnosisCard>

          <DiagnosisHeading>Рекомендации</DiagnosisHeading>

          <CardsList hasBorder list={recommendations} />

          <CardsList
            hasBorder
            list={usefulMaterials}
            title="Полезные материалы"
          />

          <CardsList title="Дополнительно" list={additional} />
        </Column>

        <Column>
          <DiagnosisHeading>Медикаментозная терапия</DiagnosisHeading>

          {allDosage.map((el) => (
            <DosageList
              key={el.title}
              level={el.level}
              title={el.title}
              list={el.items}
            />
          ))}

          {diagnosis?.title !== 'СРК с запором' && (
            <>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                Пробиотики, содержащие различные штаммы лакто- и бифидобактерий:
              </div>
              <div style={{ color: 'var(--accent)', marginBottom: 12 }}>
                Уровень рекомендаций А2
              </div>
              <List>
                <Item>
                  Должны содержать не менее миллиарда (10^9) бактериальных
                  клеток в капсуле
                </Item>
                <Item>
                  В виде капсул, покрытых кишечнорастворимой оболочкой, или в
                  виде микрокапсулированных пробиотических препаратов
                </Item>
              </List>
            </>
          )}

          <Notice style={{ marginBottom: 12 }}>
            В клинических рекомендациях по лечению СРК также приведены
            гомеопатические препараты.
            <a href="/" target="_blank">
              Подробнее
            </a>
          </Notice>

          <Text>
            В рамках терапии абдоминального болевого синдрома важно подобрать
            препарат, который будет эффективно купировать боль и нормализовывать
            моторику кишечника. Обоснованным выбором можно считать оригинальный{' '}
            <a href="/" target="_blank">
              мебеверин
            </a>
            , который за счет устранения широкого спектра симптомов (боль,
            вздутие, нарушения стула), координирует работу гладкомышечных клеток
            и восстанавливает моторику кишечника. Также, учитывая его метаболизм
            без участия цитохромов печени, мебеверин может беспрепятственно
            назначаться с большинством препаратов. Длительность приема препарата
            не ограничена, что свидетельствует о высоком профиле его
            безопасности.
          </Text>

          <InteractionsLinkBtn />

          <Foot $align="flex-end">
            <ButtonLink to="/">
              Закончить прием
            </ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { Srk };
