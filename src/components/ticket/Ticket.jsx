/* eslint-disable react/react-in-jsx-scope */
import styles from './Ticket.module.scss';

// console.log(styles);

function Ticket() {
  return (
    <li className={styles['ticket-card']}>
      <div className={styles['ticket-card__header']}>
        <span className={styles['ticket-card__price']}>13 400 р</span>
        <img className={styles['ticket-card__logo']} src="src\assets\s7logo.png" />
      </div>
      <div className={styles['ticket-card__content']}>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>mow-hkt</span>
          <span className={styles['ticket-card__data-text']}>10:45 - 8:00</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>в пути</span>
          <span className={styles['ticket-card__data-text']}>21ч 15м</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>2 пересадки</span>
          <span className={styles['ticket-card__data-text']}>hkg, jnb</span>
        </div>
      </div>
      <div className={styles['ticket-card__content']}>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>mow-hkt</span>
          <span className={styles['ticket-card__data-text']}>11:20 - 00:50</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>в пути</span>
          <span className={styles['ticket-card__data-text']}>13ч 30м</span>
        </div>
        <div className={styles['ticket-card__data-container']}>
          <span className={styles['ticket-card__data-header']}>1 пересадка</span>
          <span className={styles['ticket-card__data-text']}>hkg, jnb</span>
        </div>
      </div>
    </li>
  );
}

export default Ticket;
