import { DosageList } from '../../../../DosageList';
import { CardsList } from '../../../CardsList';
import {
  BackLink,
  ButtonLink,
  Column,
  ColumnsWrap,
  Foot,
  Heading,
  Item,
  List,
  QuizWrap,
  Text,
} from '../../../../elements';
import { DiagnosisHeading, DiagnosisCard } from '../../elements';
import { schedule } from '../../../../../data/recommendations';
import { InteractionsLinkBtn } from '../../../InteractionsLinkBtn';
import { useAppDispatch } from '../../../../../app/hooks';
import { setMedsToCheck } from '../../../../../store/utilsSlice';

interface Props {
  onBack: () => void;
}

const RefluxEsophagitis = ({ onBack }: Props) => {

  const ipp = [
    {
      title: 'Рабепразол',
      dosage: '20мг 1 раз в сутки',
    },
    {
      title: 'Лансопразол',
      dosage: '60 мг 1 раз в сутки',
    },
    {
      title: 'Омепразол',
      dosage: '20 мг 1 раз в сутки',
    },
    {
      title: 'Пантопразол',
      dosage: '20 мг 1 раз в сутки',
    },
    {
      title: 'Эзомепразол',
      dosage: '40 мг 1 раз в сутки',
    },
    {
      title: 'Декслансопразол',
      dosage: '60 мг 1 раз в сутки',
    },
  ];

  const pyro = [
    {
      title: 'Итоприда гидрохлорид',
      dosage: '50 мг 3 раза в сутки',
    },
  ];

  const eso = [
    {
      title: 'Сукральфат',
      dosage:
        '0,5–1 г 4 раза в сутки или по 1 г утром и вечером; максимальная суточная доза — 8 г',
    },
    {
      title: 'Альфазокс',
      dosage:
        'по одному пакетику-саше 3 раза в день после приема пищи и перед сном',
    },
  ];

  const dispatch = useAppDispatch()
  const allMeds = () => {
    const items:string[] = []

    ipp.forEach(el => items.push(el.title))
    pyro.forEach(el => items.push(el.title))
    eso.forEach(el => items.push(el.title))

    return items
  }
  
  dispatch(setMedsToCheck(allMeds()))

  return (
    <QuizWrap>
      <ColumnsWrap>
        <Column>
          <BackLink onClick={onBack}>Назад</BackLink>

          <DiagnosisHeading>Диагноз</DiagnosisHeading>

          <DiagnosisCard>
            <div>Рефлюкс-эзофагит</div>
            Код по МКБ 21.0
          </DiagnosisCard>

          <CardsList
            hasBorder
            title="Обратить внимание"
            notifications={[
              "Обсудите риск прогрессирования болезни и развитие таких осложнений, как пищевод Барретта, стриктуры и АКП.",
              "Разъясните важность соблюдения схемы приема препаратов и модификации образа жизни. <a target='_blank' href='/cdss/pdf/lifestyle.pdf'>памятка</a> ",
            ]}
          />

          <CardsList title="Дополнительно" list={[schedule]} />
        </Column>

        <Column>
          <Heading>Назначение на 4 недели:</Heading>

          <DosageList title="ИПП:" list={ipp} />

          <DosageList
            title="Прокинетик (по показаниям):"
            cols={1}
            list={pyro}
          />

          <DosageList title="Эзофагопротекторы" cols={1} list={eso} />

          
            <Text>
              При выборе препарата из класса ИПП рекомендуется отдавать
              предпочтение оригинальному рабепразолу, т.к. у
              препарата есть:
            </Text>
        

          <List>
            <Item>Максимальный в классе ИПП потенциал кислотосупрессии</Item>
            <Item>
              Уникальный цитопротективный эффект за счет секреции слизи муцинов
            </Item>
            <Item>Минимальный риск межлекарственного взаимодействия</Item>
            <Item>Действие до 48 часов</Item>
          </List>

          <Text>
            Рекомендуется добавление <a href="https://abbottpro.ru/academy/preparation/ganaton" rel="noreferrer" target='_blank'>итоприда гидрохлорида</a> для
            устранения моторных нарушений. <a href="https://abbottpro.ru/academy/preparation/ganaton" rel="noreferrer" target='_blank'>Итоприда гидрохлорид</a>{' '}
            доказано нормализует тонус НПС, улучшает ПРНПС и антродуоденальную
            координацию, снижая количество эпизодов рефлюкса.
          </Text>

          <InteractionsLinkBtn />

          <Foot $align="flex-end">
            <ButtonLink to="/" $type="light">
              Закончить прием
            </ButtonLink>
          </Foot>
        </Column>
      </ColumnsWrap>
    </QuizWrap>
  );
};

export { RefluxEsophagitis };
