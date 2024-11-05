/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import Ticket from '../ticket/Ticket';
import styles from './TicketList.module.scss';

// console.log(styles);

function TicketList({ tickets = [] }) {
  const ticketsData = tickets.map((ticket) => {
    const { id, price, carrier } = ticket;
    console.log(id);

    return <Ticket key={id} price={price} carrier={carrier} />;
  });

  return <ul className={styles['tickets-section__list']}>{ticketsData}</ul>;
}

TicketList.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TicketList;
