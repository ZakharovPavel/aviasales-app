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
        <input
          className={styles['custom-checkbox']}
          id='checkbox-all-filter'
          type="checkbox"
          name="allFilter"
          checked={filters.allFilter}
          onChange={handleAllChange}
        />
        <label htmlFor='checkbox-all-filter' className={styles['aside-filter__label']}>Все</label>
        <input
          className={styles['custom-checkbox']}
          id='checkbox-no-filter'
          type="checkbox"
          name="noTransferFilter"
          checked={filters.noTransferFilter}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='checkbox-no-filter' className={styles['aside-filter__label']}>Без пересадок</label>
        <input
          className={styles['custom-checkbox']}
          id='checkbox-one-filter'
          type="checkbox"
          name="oneTransferFilter"
          checked={filters.oneTransferFilter}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='checkbox-one-filter' className={styles['aside-filter__label']}>1 пересадка</label>
        <input
          className={styles['custom-checkbox']}
          id='checkbox-two-filter'
          type="checkbox"
          name="twoTransferFilter"
          checked={filters.twoTransferFilter}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='checkbox-two-filter' className={styles['aside-filter__label']}>2 пересадки</label>
        <input
          className={styles['custom-checkbox']}
          id='checkbox-three-filter'
          type="checkbox"
          name="threeTransferFilter"
          checked={filters.threeTransferFilter}
          onChange={handleCheckboxChange}
        />
        <label htmlFor='checkbox-three-filter' className={styles['aside-filter__label']}>3 пересадки</label>
        {/* <label className={styles['aside-filter__label']}>
          <input className={styles['custom-checkbox']} type="checkbox" name="allFilter" checked={filters.allFilter} onChange={handleAllChange} />
          Все
        </label>
        <label className={styles['aside-filter__label']}>
          <input className={styles['custom-checkbox']}
            type="checkbox"
            name="noTransferFilter"
            checked={filters.noTransferFilter}
            onChange={handleCheckboxChange}
          />
          Без пересадок
        </label>
        <label className={styles['aside-filter__label']}>
          <input className={styles['custom-checkbox']}
            type="checkbox"
            name="oneTransferFilter"
            checked={filters.oneTransferFilter}
            onChange={handleCheckboxChange}
          />
          1 пересадка
        </label>
        <label className={styles['aside-filter__label']}>
          <input className={styles['custom-checkbox']}
            type="checkbox"
            name="twoTransferFilter"
            checked={filters.twoTransferFilter}
            onChange={handleCheckboxChange}
          />
          2 пересадки
        </label>
        <label className={styles['aside-filter__label']}>
          <input className={styles['custom-checkbox']}
            type="checkbox"
            name="threeTransferFilter"
            checked={filters.threeTransferFilter}
            onChange={handleCheckboxChange}
          />
          3 пересадки
        </label> */}
      </fieldset>
    </aside>
  );
};

export default Filter;
