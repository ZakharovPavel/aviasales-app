/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from 'react';
import styles from './App.module.scss';
import TicketList from './components/ticket-list';
import { Alert, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTickets, setSorterCheapest, setSorterFastest, setSorterOptimal } from './features/filter/filterSlice';
import Filter from './components/filter/Filter';

function App() {
  const fetchedTickets = useSelector((state) => state.filter.tickets);
  const filterStatus = useSelector((state) => state.filter.status);
  const sorter = useSelector((state) => state.filter.sorter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const content = filterStatus === 'resolved' ? <TicketList /> : null;
  const spinner = filterStatus === 'loading' ? <Spin size="large" /> : null;
  const errorMessage =
    filterStatus === 'error' ? (
      <Alert className={styles['fetch-error-message']} message="Tickets fetch error" type="error" />
    ) : null;
  const noData =
    fetchedTickets.length === 0 && filterStatus !== 'loading' && filterStatus !== 'error' ? (
      <div className={styles['no-data-text']}>Ничего не найдено</div>
    ) : null;

  return (
    <div className={styles['tickets-wrapper']}>
      <div className={styles['tickets__header']}>
        <img className={styles['logo']} src="src\assets\Logo.png" />
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
          {noData}
          {spinner}
          {content}
        </section>
      </div>
    </div>
  );
}

export default App;
