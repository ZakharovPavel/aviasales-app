// const initialTickets = [
//   {
//     price: 13400,
//     carrier: 's7 Airlines',
//     segments: [
//       {
//         // Код города (iata)
//         origin: 111,
//         // Код города (iata)
//         destination: '333',
//         // Дата и время вылета туда
//         date: 'Date 1',
//         // Массив кодов (iata) городов с пересадками
//         stops: [],
//         // Общее время перелёта в минутах
//         duration: 100,
//       },
//       {
//         // Код города (iata)
//         origin: 222,
//         // Код города (iata)
//         destination: '444',
//         // Дата и время вылета обратно
//         date: 'Date 2',
//         // Массив кодов (iata) городов с пересадками
//         stops: [],
//         // Общее время перелёта в минутах
//         duration: 120,
//       },
//     ],
//   },
//   {
//     price: 13400,
//     carrier: 's7 Airlines',
//     segments: [
//       {
//         // Код города (iata)
//         origin: 111,
//         // Код города (iata)
//         destination: '333',
//         // Дата и время вылета туда
//         date: 'Date 1',
//         // Массив кодов (iata) городов с пересадками
//         stops: [],
//         // Общее время перелёта в минутах
//         duration: 100,
//       },
//       {
//         // Код города (iata)
//         origin: 222,
//         // Код города (iata)
//         destination: '444',
//         // Дата и время вылета обратно
//         date: 'Date 2',
//         // Массив кодов (iata) городов с пересадками
//         stops: [],
//         // Общее время перелёта в минутах
//         duration: 120,
//       },
//     ],
//   },
//   {
//     price: 13400,
//     carrier: 's7 Airlines',
//     segments: [
//       {
//         // Код города (iata)
//         origin: 111,
//         // Код города (iata)
//         destination: '333',
//         // Дата и время вылета туда
//         date: 'Date 1',
//         // Массив кодов (iata) городов с пересадками
//         stops: [],
//         // Общее время перелёта в минутах
//         duration: 100,
//       },
//       {
//         // Код города (iata)
//         origin: 222,
//         // Код города (iata)
//         destination: '444',
//         // Дата и время вылета обратно
//         date: 'Date 2',
//         // Массив кодов (iata) городов с пересадками
//         stops: [],
//         // Общее время перелёта в минутах
//         duration: 120,
//       },
//     ],
//   },
// ];

const apiBase = 'https://aviasales-test-api.kata.academy';

const getSearchId = async () => {
  const url = `${apiBase}/search`;

  const response = await fetch(url);
  const result = await response.json();
  console.log(result);
  
  return result;
};

const getTickets = async (searchId) => {
  // const searchIdResponse = await getSearchId();
  // const searchId = await searchIdResponse.json().searchId
  
  // const idRes = await fetch(`${apiBase}/search`);
  // const searchId = await idRes.json();
  // console.log(searchId);

  const url = `${apiBase}/tickets?searchId=${searchId}`;

  const response = await fetch(url);
  const result = await response.json();

  if (!result.stop) {
    throw new Error(`Could not fetch ${url}, received ${result.status}`);
  }
  console.log(result);

  return result;
};

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

export { getSearchId, getTickets, transformTicket };

// function AviasalesService() {
//   const apiBase = 'https://front-test.dev.aviasales.ru';

//   const getSearchId = async () => {
//     const url = `${apiBase}/search`;

//     const response = await fetch(url);
//     const result = await response.json();
//     return result;
//   };

//   async function getTickets() {
//     const searchId = await getSearchId();
//     console.log(searchId);

//     const url = `${apiBase}/tickets?searchId=${searchId}`;

//     const response = await fetch(url);
//     const result = await response.json();

//     if (!result.stop) {
//       throw new Error(`Could not fetch ${url}, received ${result.status}`);
//     }
//     console.log(result);

//     return result;
//   }

//   // const getTickets = async (searchId) => {
//   //   const url = `${apiBase}/tickets?searchId=${searchId}`;

//   //   const response = await fetch(url);
//   //   const result = await response.json();

//   //   if (!result.stop) {
//   //     throw new Error(`Could not fetch ${url}, received ${result.status}`)
//   //   }

//   //   return result;
//   // };

//   const transformTicket = (ticket) => {
//     const [there, back] = ticket.segments;
//     return {
//       price: ticket.price,
//       carrier: ticket.carrier,
//       thereOrigin: there.origin,
//       thereDestination: there.destination,
//       thereDate: there.date,
//       thereStops: there.stops,
//       thereDuration: there.duration,
//       backOrigin: back.origin,
//       backDestination: back.destination,
//       backDate: back.date,
//       backStops: back.stops,
//       backDuration: back.duration,
//     };
//   };
// }

// export default AviasalesService;
