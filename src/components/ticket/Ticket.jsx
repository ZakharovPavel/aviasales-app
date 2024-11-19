/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
import { add, format } from 'date-fns';
import styles from './Ticket.module.scss';

// console.log(styles);

function Ticket({
  price = 0,
  carrier = '',
  thereOrigin = '',
  thereDestination = '',
  thereDate = '',
  thereStops = [],
  thereDuration = 0,
  backOrigin = '',
  backDestination = '',
  backDate = '',
  backStops = [],
  backDuration = 0,
}) {
  const formatPrice = (cost) => {
    let numStr = cost.toString();
    if (numStr.length < 4) {
      return numStr;
    } else if (numStr.length === 4) {
      return numStr.slice(0, 1) + ' ' + numStr.slice(1);
    } else if (numStr.length === 5) {
      return numStr.slice(0, 2) + ' ' + numStr.slice(2);
    } else if (numStr.length > 5) {
      return numStr.slice(0, 3) + ' ' + numStr.slice(3);
    }
  };

  const formatDate = (date, duration) => {
    const startDate = new Date(date);
    const endDate = add(new Date(date), {
      hours: Math.floor(duration / 60),
      minutes: duration % 60,
    });

    const formattedStartDate = format(startDate, 'HH:mm');
    const formattedEndDate = format(endDate, 'HH:mm');
    return `${formattedStartDate} - ${formattedEndDate}`;
  };

  const formatDuration = (time) => {
    const hours = Math.floor(time / 60);
    const min = time % 60;
    const result = `${hours}ч ${min}м`;
    return result;
  };

  const formatStops = (stops = []) => {
    let text;
    if (stops.length === 0) {
      text = 'пересадок';
    } else if (stops.length === 1) {
      text = 'пересадка';
    } else if (stops.length > 1) {
      text = 'пересадки';
    }
    return `${stops.length} ${text}`;
  };

  return (
    <li className={styles['ticket-card']}>
      <div className={styles['ticket-card__header']}>
        <span className={styles['ticket-card__price']}>{`${formatPrice(price)} P`}</span>
        <img
          className={styles['ticket-card__logo']}
          src={`https://images.daisycon.io/airline/?width=300&height=150&color=ffffff&iata=${carrier}`}
        />
      </div>
      <div className={styles['ticket-card__content']}>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>{`${thereOrigin} - ${thereDestination}`}</span>
          <span className={styles['ticket-card__data-text']}>{formatDate(thereDate, thereDuration)}</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>в пути</span>
          <span className={styles['ticket-card__data-text']}>{formatDuration(thereDuration)}</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>{formatStops(thereStops)}</span>
          <span className={styles['ticket-card__data-text']}>{thereStops.join(', ')}</span>
        </div>
      </div>
      <div className={styles['ticket-card__content']}>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>{`${backOrigin} - ${backDestination}`}</span>
          <span className={styles['ticket-card__data-text']}>{formatDate(backDate, backDuration)}</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>в пути</span>
          <span className={styles['ticket-card__data-text']}>{formatDuration(backDuration)}</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>{formatStops(backStops)}</span>
          <span className={styles['ticket-card__data-text']}>{backStops.join(', ')}</span>
        </div>
      </div>
    </li>
  );
}

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  thereOrigin: PropTypes.string.isRequired,
  thereDestination: PropTypes.string.isRequired,
  thereDate: PropTypes.string.isRequired,
  thereStops: PropTypes.arrayOf(PropTypes.string).isRequired,
  thereDuration: PropTypes.number.isRequired,
  backOrigin: PropTypes.string.isRequired,
  backDestination: PropTypes.string.isRequired,
  backDate: PropTypes.string.isRequired,
  backStops: PropTypes.arrayOf(PropTypes.string).isRequired,
  backDuration: PropTypes.number.isRequired,
};

export default Ticket;
