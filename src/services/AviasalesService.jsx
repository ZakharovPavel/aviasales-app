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

// const fetchTickets = createAsyncThunk('filter/fetchTickets', async function (searchId) {
//   // const responseSearchId = await fetch(`${apiBase}/search`);
//   // const resultSearchId = await responseSearchId.json();
//   // console.log(searchId);
//   // const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
//   // const result = await response.json();
  
//   // return result;
//   try {
//     const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
//     if (!response.ok) {
//       throw new Error('no fetch');
//     }
//     const result = await response.json();

//     return result;
//   } catch (error) {
//     if (error.message === 'no fetch' || error.status === 500) {
//       fetchTickets(searchId);
//     }
//   }
// });

// const fetchTickets = createAsyncThunk('filter/fetchTickets', async (searchId, { rejectWithValue }) => {
//   try {
//     const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
//     if (!response.ok) {
//       throw new Error('no fetchhhhhhhhhhhhhhhhhhhhhhhh');
//     }
//     const result = await response.json();

//     return result;
//   } catch (error) {
//     if (error.message === 'no fetchhhhhhhhhhhhhhhhhhhhhhhh' || error.status === 500) {
//       fetchTickets(searchId);
//     }
//     return rejectWithValue(error.response.data);
//   }
// });

// const fetchTickets = createAsyncThunk('filter/fetchTickets', async (searchId, { rejectWithValue }) => {
//   try {
//     const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
//     if (!response.ok) {
//       throw new Error('нет запроса');
//     }
//     const result = await response.json();

//     return result;
//   } catch (error) {
//     if (error.message === 'нет запроса' || error.status === 500) {
//       return fetchTickets(searchId);
//     }
//     console.log('fetch tickets catch');
//     return rejectWithValue(error.response.data);
//   }
// });

const fetchTicketsThunk = async (searchId, rejectWithValue) => {
  try {
    const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
    if (!response.ok) {
      throw new Error('нет запроса');
    }
    const result = await response.json();

    return result;
  } catch (error) {
    if (error.message === 'нет запроса' || error.status === 500) {
      return fetchTickets(searchId);
    }
    console.log('fetch tickets catch');
    return rejectWithValue(error);
  }
}

const fetchTickets = createAsyncThunk('filter/fetchTickets', async (id, { rejectWithValue }) => {
  return fetchTicketsThunk(id, rejectWithValue);
});

// const fetchTickets = createAsyncThunk(
//   'filter/fetchTickets',
//   async (searchId, { rejectWithValue }) => {
//     const maxRetries = 10;
//     let attempts = 0;

//     const makeRequest = async () => {
//       attempts++;
//       try {
//         const response = await fetch(`${apiBase}/tickets?searchId=${searchId}`);
//         const result = await response.json();
//         return result;
//       } catch (error) {
//         if (attempts < maxRetries && error.response.status === 500) {
//           // Повторная попытка через 2 секунды
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           return makeRequest(); // Повторный запрос
//         }
//         return rejectWithValue(error.response.data); // Обработка ошибки
//       }
//     };

//     return makeRequest();
//   }
// );

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
