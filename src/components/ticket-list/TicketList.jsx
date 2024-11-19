/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Ticket from '../ticket/Ticket';
import styles from './TicketList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { transformTicket } from '../../services/AviasalesService';
import { increaseShownList } from '../../features/filter/filterSlice';

function generateKey(prefix) {
  return `${prefix}_${Math.floor(100000 + Math.random() * 900000)}`;
}

function TicketList() {
  const fetchedTickets = useSelector((state) => state.filter.tickets);
  const ticketListLength = useSelector((state) => state.filter.listLength);
  const dispatch = useDispatch();

  const ticketsData = fetchedTickets.slice(0, ticketListLength).map((ticket) => {
    const newTicket = transformTicket(ticket, generateKey(ticket.price));
    const { id } = newTicket;

    return <Ticket key={id} {...newTicket} />;
  });

  const handleShowMoreTickets = () => {
    dispatch(increaseShownList());
  };

  const showMoreButton = fetchedTickets.length > 5 && (
    <button
      type="button"
      onClick={handleShowMoreTickets}
      className={[styles['show-more-button'], styles['button']].join(' ')}
    >
      {'Показать еще 5 билетов'.toUpperCase()}
    </button>
  );

  return (
    <>
      <ul className={styles['tickets-section__list']}>{ticketsData}</ul>
      {showMoreButton}
    </>
  );
}

export default TicketList;
