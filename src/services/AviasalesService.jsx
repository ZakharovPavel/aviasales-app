import { createAsyncThunk } from "@reduxjs/toolkit";

const apiBase = 'https://aviasales-test-api.kata.academy';

const fetchSearchId = createAsyncThunk('filter/fetchSearchId', async function () {
  const response = await fetch(`${apiBase}/search`);
  const result = await response.json();

  return result.searchId;
});

const fetchTicketsForThunk = async (searchId, rejectWithValue) => {
  try {
    const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
    if (!response.ok) {
      throw new Error('Нет запроса');
    }
    const result = await response.json();

    return result;
  } catch (error) {
    if (error.status === 500 || error.message === 'Нет запроса') {
      return fetchTicketsForThunk(searchId);
    }
    return rejectWithValue(error);
  }
}

const fetchTickets = createAsyncThunk('filter/fetchTickets', async (id, { rejectWithValue }) => {
  return fetchTicketsForThunk(id, rejectWithValue);
});

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
