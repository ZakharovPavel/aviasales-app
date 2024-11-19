/* eslint-disable react/react-in-jsx-scope */
import { useDispatch, useSelector } from 'react-redux';
import styles from './Filter.module.scss';
import {
  setFilterAll,
  setFilterNoTransfer,
  setFilterOneTransfer,
  setFilterThreeTransfer,
  setFilterTwoTransfer,
} from '../../features/filter/filterSlice';

const Filter = () => {
  const filters = useSelector((state) => state.filter.filters);
  const dispatch = useDispatch();

  const handleAllChange = () => {
    dispatch(setFilterAll());
  };
  const handleCheckboxChange = (e) => {
    const { name } = e.target;

    if (name === 'noTransferFilter') {
      dispatch(setFilterNoTransfer());
    }
    if (name === 'oneTransferFilter') {
      dispatch(setFilterOneTransfer());
    }
    if (name === 'twoTransferFilter') {
      dispatch(setFilterTwoTransfer());
    }
    if (name === 'threeTransferFilter') {
      dispatch(setFilterThreeTransfer());
    }
  };

  return (
    <aside className={styles['aside-filter']}>
      <span className={styles['aside-filter__header']}>{'Количество пересадок'.toUpperCase()}</span>
      <fieldset className={styles['aside-filter__filters']}>
        <label className={styles['aside-filter__label']}>
          <input type="checkbox" name="allFilter" checked={filters.allFilter} onChange={handleAllChange} />
          Все
        </label>
        <label className={styles['aside-filter__label']}>
          <input
            type="checkbox"
            name="noTransferFilter"
            checked={filters.noTransferFilter}
            onChange={handleCheckboxChange}
          />
          Без пересадок
        </label>
        <label className={styles['aside-filter__label']}>
          <input
            type="checkbox"
            name="oneTransferFilter"
            checked={filters.oneTransferFilter}
            onChange={handleCheckboxChange}
          />
          1 пересадка
        </label>
        <label className={styles['aside-filter__label']}>
          <input
            type="checkbox"
            name="twoTransferFilter"
            checked={filters.twoTransferFilter}
            onChange={handleCheckboxChange}
          />
          2 пересадки
        </label>
        <label className={styles['aside-filter__label']}>
          <input
            type="checkbox"
            name="threeTransferFilter"
            checked={filters.threeTransferFilter}
            onChange={handleCheckboxChange}
          />
          3 пересадки
        </label>
      </fieldset>
    </aside>
  );
};

export default Filter;
