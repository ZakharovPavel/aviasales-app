/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import styles from './App.module.scss';
import TicketList from '../ticket-list';
import { getSearchId, getTickets, transformTicket } from '../../services/AviasalesService';

const initialTickets = [
  {
    price: 13400,
    carrier: 's7 Airlines',
    segments: [
      {
        // Код города (iata)
        origin: 111,
        // Код города (iata)
        destination: '333',
        // Дата и время вылета туда
        date: 'Date 1',
        // Массив кодов (iata) городов с пересадками
        stops: [],
        // Общее время перелёта в минутах
        duration: 100,
      },
      {
        // Код города (iata)
        origin: 222,
        // Код города (iata)
        destination: '444',
        // Дата и время вылета обратно
        date: 'Date 2',
        // Массив кодов (iata) городов с пересадками
        stops: [],
        // Общее время перелёта в минутах
        duration: 120,
      },
    ],
  },
  {
    price: 13400,
    carrier: 's7 Airlines',
    segments: [
      {
        // Код города (iata)
        origin: 111,
        // Код города (iata)
        destination: '333',
        // Дата и время вылета туда
        date: 'Date 1',
        // Массив кодов (iata) городов с пересадками
        stops: [],
        // Общее время перелёта в минутах
        duration: 100,
      },
      {
        // Код города (iata)
        origin: 222,
        // Код города (iata)
        destination: '444',
        // Дата и время вылета обратно
        date: 'Date 2',
        // Массив кодов (iata) городов с пересадками
        stops: [],
        // Общее время перелёта в минутах
        duration: 120,
      },
    ],
  },
  {
    price: 13400,
    carrier: 's7 Airlines',
    segments: [
      {
        // Код города (iata)
        origin: 111,
        // Код города (iata)
        destination: '333',
        // Дата и время вылета туда
        date: 'Date 1',
        // Массив кодов (iata) городов с пересадками
        stops: [],
        // Общее время перелёта в минутах
        duration: 100,
      },
      {
        // Код города (iata)
        origin: 222,
        // Код города (iata)
        destination: '444',
        // Дата и время вылета обратно
        date: 'Date 2',
        // Массив кодов (iata) городов с пересадками
        stops: [],
        // Общее время перелёта в минутах
        duration: 120,
      },
    ],
  },
];

function App() {
  // const aService = AviasalesService();

  const [tickets, setTickets] = useState([]);
  // const [searchId, setSearchId] = useState('');
  const [ticketId, setTicketId] = useState(1);

  // useEffect(() => {
  //   setTicketId((prev) => prev + 1);
  // }, [ticketId]);

  function generateKey(prefix) {
    return `${prefix}_${Math.floor(100000 + Math.random() * 900000)}`
  }

  useEffect(() => {
    // getSearchId();
    // updateTickets();
    setTickets(
      initialTickets.map((el) => transformTicket(el, generateKey(el.price)))
    );
  }, []);

  // const getSearchId = () => {
  //   aService.getSearchId().then((res) => {
  //     const result = JSON.parse(res);
  //     setSearchId(result.searchId);
  //     console.log(searchId);
  //   });
  // };

  const updateTickets = () => {
    // getTickets();

    // setTickets(() => {});
    getSearchId()
      .then((res) => getTickets(res.searchId))
      .then((ticketsData) => {
        console.log(ticketsData);
        setTicketId((prev) => prev + 1);
        // setTickets(ticketsData.tickets.map((el) => transformTicket(el, ticketId)))
        setTickets(initialTickets.map((el) => transformTicket(el, ticketId)));
      })
      .catch((err) => err);
  };

  console.log('tttt'.toUpperCase());

  return (
    <div className={styles['tickets-wrapper']}>
      <div className={styles['tickets__header']}>
        <img className={styles['logo']} src="src\assets\Logo.png" />
      </div>
      <div className={styles['tickets__main-wrapper']}>
        <aside className={styles['aside-filter']}>
          <span className={styles['aside-filter__header']}>{'Количество пересадок'.toUpperCase()}</span>
          <form className={styles['aside-filter__filters']}>
            <label className={styles['aside-filter__label']}>
              <input type="checkbox" id="all-filter" />
              Все
            </label>
            <label className={styles['aside-filter__label']}>
              <input type="checkbox" id="no-transfer-filter" />
              Без пересадок
            </label>
            <label className={styles['aside-filter__label']}>
              <input type="checkbox" id="one-transfer-filter" />1 пересадка
            </label>
            <label className={styles['aside-filter__label']}>
              <input type="checkbox" id="two-transfer-filter" />2 пересадки
            </label>
            <label className={styles['aside-filter__label']}>
              <input type="checkbox" id="three-transfer-filter" />3 пересадки
            </label>
          </form>
        </aside>
        <section className={styles['tickets-section']}>
          <div className={styles['tickets-section__most-filter']}>
            <button className={[styles['most-button'], styles['button']].join(' ')}>
              {'Самый дешевый'.toUpperCase()}
            </button>
            <button className={[styles['most-button'], styles['button']].join(' ')}>
              {'Самый быстрый'.toUpperCase()}
            </button>
            <button className={[styles['most-button'], styles['button']].join(' ')}>
              {'Оптимальный'.toUpperCase()}
            </button>
          </div>
          <TicketList tickets={tickets} />
          <button type="button" className={[styles['show-more-button'], styles['button']].join(' ')}>
            {'Показать еще 5 билетов'.toUpperCase()}
          </button>
        </section>
      </div>
    </div>
  );
}

export default App;
