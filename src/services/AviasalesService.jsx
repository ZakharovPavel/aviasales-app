
const transformTicket = (ticket, id) => {
  const [there, back] = ticket.segments;
  return {
    price: ticket.price,
    carrier: ticket.carrier,
    thereOrigin: there.origin,
    thereDestination: there.destination,
    thereDate: there.date,
    thereStops: there.stops,
    thereDuration: there.duration,
    backOrigin: back.origin,
    backDestination: back.destination,
    backDate: back.date,
    backStops: back.stops,
    backDuration: back.duration,
    id: id,
  };
};

export { transformTicket };
