import { createAsyncThunk } from "@reduxjs/toolkit";

const apiBase = 'https://aviasales-test-api.kata.academy';

const fetchSearchId = createAsyncThunk('filter/fetchSearchId', async function () {
  const response = await fetch(`${apiBase}/search`);
  const result = await response.json();

  return result.searchId;
});

// const fetchTickets = createAsyncThunk('filter/fetchTickets', async function () {
//   const responseSearchId = await fetch(`${apiBase}/search`);
//   const resultSearchId = await responseSearchId.json();

//   const response = await fetch(`${apiBase}/tickets?searchId=${resultSearchId.searchId}`);
//   const result = await response.json();

//   return result.tickets;
// });

const fetchTickets = createAsyncThunk('filter/fetchTickets', async function (searchId) {
  // const responseSearchId = await fetch(`${apiBase}/search`);
  // const resultSearchId = await responseSearchId.json();
  // console.log(searchId);
  
  const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
  const result = await response.json();

  return result;
});

// const fetchTicketsResult = createAsyncThunk('filter/fetchTickets', async function (searchId) {
//   // const responseSearchId = await fetch(`${apiBase}/search`);
//   // const resultSearchId = await responseSearchId.json();

//   const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
//   const result = await response.json();

//   return result.tickets;
// });

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

export { fetchSearchId, fetchTickets, transformTicket };
