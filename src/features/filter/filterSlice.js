/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { fetchSearchId, fetchTickets } from '../../services/AviasalesService';

const filtersIterator = (stateData, filterName) => {
  stateData.filters[filterName] = !stateData.filters[filterName];
  Object.entries(stateData.filters).forEach(([key, value]) => {
    if (!value && stateData.filters.allFilter) stateData.filters.allFilter = false;
  });
  if (
    !stateData.filters.allFilter &&
    stateData.filters.noTransferFilter &&
    stateData.filters.oneTransferFilter &&
    stateData.filters.twoTransferFilter &&
    stateData.filters.threeTransferFilter
  ) {
    stateData.filters.allFilter = true;
  }
};

const filterTickets = (stateData, filterData) => {
  return stateData.ticketsOrigin.filter((ticket) => {
    // Фильтрация по максимальному значению поля Пересадки в одну сторону, либо обратно
    const stopsThere = ticket.segments[0].stops.length;
    const stopsBack = ticket.segments[1].stops.length;
    const maxStops = Math.max(stopsThere, stopsBack)
    return filterData.some((filter) => Number(filter) === maxStops);
    // Альтернативная фильтрация по сумме пересадок туда и обратно
    // const stopsSum = ticket.segments[0].stops.length + ticket.segments[1].stops.length;
    // return filterData.some((filter) => Number(filter) === stopsSum);
    //
  });
};

const setFilterValues = (stateData, filter, value) => {
  if (stateData.filters[filter] && !stateData.filterValues.includes(value)) {
    stateData.filterValues.push(value);
  }
  if (!stateData.filters[filter] && stateData.filterValues.includes(value)) {
    stateData.filterValues = stateData.filterValues.filter((item) => item !== value);
  }

  if (stateData.filterValues.includes(value)) {
    stateData.filterValues.push(value);
  } else {
    stateData.filterValues = stateData.filterValues.filter((item) => item !== value);
  }
};

const sorterChecker = (stateData) => {
  switch (stateData.sorter) {
    case 'cheapest':
      stateData.tickets.sort((a, b) => a.price - b.price);
      break;

    case 'fastest':
      stateData.tickets.sort(
        (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
      );
      break;

    case 'optimal':
      stateData.tickets.sort(
        (a, b) =>
          a.segments[0].duration +
          a.segments[1].duration -
          (b.segments[0].duration + b.segments[1].duration) -
          (a.price - b.price)
      );
      break;

    default:
      break;
  }
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    value: 'all',
    filterValues: ['0', '1', '2', '3'],
    filters: {
      allFilter: true,
      noTransferFilter: true,
      oneTransferFilter: true,
      twoTransferFilter: true,
      threeTransferFilter: true,
    },
    ticketsOrigin: [],
    ticketsBuff: [],
    tickets: [],
    ticketsSortedCheapest: [],
    ticketsSortedFastest: [],
    ticketsSortedOptimal: [],
    sorter: null,
    searchId: null,
    status: null,
    error: null,
    errorMessage: '',
    stop: false,
    listLength: 5,
    shownTickets: [],
  },
  reducers: {
    checkFilteredTickets: (state) => {
      state.tickets = filterTickets(state, state.filterValues);
      state.ticketsBuff = state.tickets;
      sorterChecker(state);
    },
    checkSortedTickets: (state) => {
      sorterChecker(state);
    },
    setShownTickets: (state) => {
      state.shownTickets = state.tickets.slice(0, state.listLength);
    },
    setFilterAll: (state) => {
      state.value = 'all';
      const newValue = !state.filters.allFilter;
      state.filters = {
        allFilter: newValue,
        noTransferFilter: newValue,
        oneTransferFilter: newValue,
        twoTransferFilter: newValue,
        threeTransferFilter: newValue,
      };

      if (state.filters.allFilter) {
        state.filterValues = ['0', '1', '2', '3'];
      } else {
        state.filterValues = [];
      }

      state.tickets = filterTickets(state, state.filterValues);
      state.ticketsBuff = state.tickets;
      sorterChecker(state);
    },
    setFilterNoTransfer: (state) => {
      filtersIterator(state, 'noTransferFilter');
      setFilterValues(state, 'noTransferFilter', '0');

      state.tickets = filterTickets(state, state.filterValues);
      state.ticketsBuff = state.tickets;
      sorterChecker(state);
    },
    setFilterOneTransfer: (state) => {
      filtersIterator(state, 'oneTransferFilter');
      setFilterValues(state, 'oneTransferFilter', '1');

      state.tickets = filterTickets(state, state.filterValues);
      state.ticketsBuff = state.tickets;
      sorterChecker(state);
    },
    setFilterTwoTransfer: (state) => {
      filtersIterator(state, 'twoTransferFilter');
      setFilterValues(state, 'twoTransferFilter', '2');

      state.tickets = filterTickets(state, state.filterValues);
      state.ticketsBuff = state.tickets;
      sorterChecker(state);
    },
    setFilterThreeTransfer: (state) => {
      filtersIterator(state, 'threeTransferFilter');
      setFilterValues(state, 'threeTransferFilter', '3');

      state.tickets = filterTickets(state, state.filterValues);
      state.ticketsBuff = state.tickets;
      sorterChecker(state);
    },
    increaseShownList: (state) => {
      state.listLength += 5;
    },
    setSorterCheapest: (state) => {
      if (state.sorter === 'cheapest') {
        state.sorter = null;
        state.tickets = state.ticketsBuff;
      } else {
        state.sorter = 'cheapest';
        state.tickets.sort((a, b) => a.price - b.price);
      }
    },
    setSorterFastest: (state) => {
      if (state.sorter === 'fastest') {
        state.sorter = null;
        state.tickets = state.ticketsBuff;
      } else {
        state.sorter = 'fastest';
        state.tickets.sort(
          (a, b) => a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration)
        );
      }
    },
    setSorterOptimal: (state) => {
      if (state.sorter === 'optimal') {
        state.sorter = null;
        state.tickets = state.ticketsBuff;
      } else {
        state.sorter = 'optimal';
        state.tickets.sort(
          (a, b) =>
            a.segments[0].duration +
            a.segments[1].duration -
            (b.segments[0].duration + b.segments[1].duration) -
            (a.price - b.price)
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.errorMessage = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.stop = action.payload.stop;
        if (Array.isArray(action.payload.tickets)) {
          state.ticketsOrigin = [...state.ticketsOrigin, ...action.payload.tickets];
          state.ticketsBuff = [...state.ticketsBuff, ...action.payload.tickets];
          state.tickets = [...state.tickets, ...action.payload.tickets];
        }
        // изменение списка билетов по актуальности фильтров и сортировки
        state.tickets = filterTickets(state, state.filterValues);
        state.ticketsBuff = state.tickets;
        sorterChecker(state);

        if (action.payload.stop) {
          state.status = 'resolved';
        }
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.errorMessage = action.payload;
      });
  },
});

export const {
  checkFilteredTickets,
  checkSortedTickets,
  setShownTickets,
  setFilterAll,
  setFilterNoTransfer,
  setFilterOneTransfer,
  setFilterTwoTransfer,
  setFilterThreeTransfer,
  increaseShownList,
  setSorterCheapest,
  setSorterFastest,
  setSorterOptimal,
} = filterSlice.actions;

export default filterSlice.reducer;
