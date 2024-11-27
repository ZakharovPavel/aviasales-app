/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import styles from './App.module.scss';
import TicketList from './components/ticket-list';
import { Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { checkFilteredTickets, checkSortedTickets, setSorterCheapest, setSorterFastest, setSorterOptimal } from './features/filter/filterSlice';
import Filter from './components/filter/Filter';
import logoImg from './assets/Logo.png';
import { fetchSearchId, fetchTickets } from './services/AviasalesService';

function App() {
  const dispatch = useDispatch();
  const searchId = useSelector((state) => state.filter.searchId);
  const fetchedTickets = useSelector((state) => state.filter.tickets);
  const filterStatus = useSelector((state) => state.filter.status);
  const sorter = useSelector((state) => state.filter.sorter);
  const stopFetching = useSelector((state) => state.filter.stop);
  const filterValues = useSelector((state) => state.filter.filters)

  useEffect(() => {
    dispatch(fetchSearchId());
  }, []);

  useEffect(() => {
    if (searchId && !stopFetching) {
      dispatch(fetchTickets(searchId));
    }
  }, [dispatch, stopFetching, searchId, fetchedTickets]);

  // изменено для появления списка до окончания загрузки всех билетов
  // const content = filterStatus === 'resolved' ? <TicketList /> : null;
  const spinner = filterStatus === 'loading' ? <Spin size="large" /> : null;
  const errorMessage =
    filterStatus === 'error' ? (
      <Alert className={styles['fetch-error-message']} message="Tickets fetch error" type="error" />
    ) : null;

  const isAllFiltersOff = Object.values(filterValues).every((value) => value === false);

  const noData =
    (fetchedTickets.length === 0 && filterStatus !== 'loading' && filterStatus !== 'error') || isAllFiltersOff ? (
      <div className={styles['no-data-text']}>Рейсов, подходящих под заданные фильтры, не найдено</div>
    ) : null;

  return (
    <div className={styles['tickets-wrapper']}>
      <div className={styles['tickets__header']}>
        <img className={styles['logo']} src={logoImg} />
      </div>
      <div className={styles['aside-filter--sm']}>
        <Filter />
      </div>
      <div className={styles['tickets__main-wrapper']}>
        <div className={styles['aside-filter--lg']}>
          <Filter />
        </div>
        <section className={styles['tickets-section']}>
          <div className={styles['tickets-section__most-filter']}>
            <button
              onClick={() => dispatch(setSorterCheapest())}
              className={[styles['most-button'], styles['button'], sorter === 'cheapest' ? styles['active'] : ''].join(
                ' '
              )}
            >
              {'Самый дешевый'.toUpperCase()}
            </button>
            <button
              onClick={() => dispatch(setSorterFastest())}
              className={[styles['most-button'], styles['button'], sorter === 'fastest' ? styles['active'] : ''].join(
                ' '
              )}
            >
              {'Самый быстрый'.toUpperCase()}
            </button>
            <button
              onClick={() => dispatch(setSorterOptimal())}
              className={[styles['most-button'], styles['button'], sorter === 'optimal' ? styles['active'] : ''].join(
                ' '
              )}
            >
              {'Оптимальный'.toUpperCase()}
            </button>
          </div>
          {errorMessage}
          {spinner}
          {/* {content} */}
          <TicketList />
          {noData}
        </section>
      </div>
    </div>
  );
}

export default App;
