import { Combobox } from '../Form/Combobox/Combobox';
import { PopularList } from '../PopularList/PopularList';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectSelectedSymptoms,
  addSelected,
  removeSelected,
  clearSelected,
  selectSymptomsDB,
} from '../../features/symptoms/symptomsSlice';
import { Option } from '../../../types/interfaces';
import { SelectedList } from '../SelectedList/SelectedList';

interface Props {
  onNext: () => void;
}

const SymptomsBlock = ({onNext}: Props) => {
  const selectedSymptoms = useAppSelector(selectSelectedSymptoms);
  const db = useAppSelector(selectSymptomsDB);

  const dispatch = useAppDispatch();

  const handleSymptomSelect = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(addSelected(dbItem));
  };

  const handleSymptomRemove = (item: Option) => {
    const dbItem = db.find((symptom) => symptom.title === item.value);

    if (!dbItem) return;

    dispatch(removeSelected(dbItem));
  }

  return (
    <div className="quiz-block">
      <div className="quiz-block__wrap quiz-block__wrap--columns">
        <div className="quiz-block__column">
          <button className="quiz-block__back">Назад</button>

          <div className="quiz-block__head">
            <div className="quiz-block__title">жалобы пациента</div>
          </div>

          <div className="quiz-block__text">
            Добавьте все симпомы, которые беспокоят пациента
          </div>

          <Combobox
            list={db.map((el) => {
              return {
                value: el.title,
                label: el.title,
              };
            })}
            onSelect={handleSymptomSelect}
          />

          <div className="quiz-block__foot">
            <PopularList onSelect={handleSymptomSelect} list={db.filter(el => el.showOnFront).map(el => {
              return {
                label: el.title,
                value: el.title,
              }
            })} />
          </div>
        </div>

        <div className="quiz-block__column">
          <div className="quiz-block__head">
            <div className="quiz-block__title">Добавленные симптомы</div>
 
            {Boolean(selectedSymptoms.length) && (
              <button
                className="quiz-block__clear"
                onClick={() => dispatch(clearSelected())}
              >
                Сбросить все
              </button>
            )}
          </div>

          <SelectedList onRemove={handleSymptomRemove} list={selectedSymptoms.map(el => {
              return {
                label: el.title,
                value: el.title,
              }
            })} />

          

          <div className="quiz-block__foot">
            {Boolean(selectedSymptoms.length) && (
              <button className="quiz-block__btn" onClick={onNext}>
                Продолжить
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { SymptomsBlock };