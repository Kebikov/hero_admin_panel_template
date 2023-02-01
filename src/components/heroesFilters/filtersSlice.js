import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    activeFilter: 'all'
}

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request('http://localhost:3001/filters');
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersChoiсe: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchFilters.pending, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(fetchFilters.fulfilled, (state, action) => {
            state.filters = action.payload;
            state.heroesLoadingStatus = 'idle';
        })
        .addCase(fetchFilters.rejected, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addDefaultCase(() => {});
    }
});

const {reducer, actions} = filtersSlice;

export default reducer;

export const {filtersChoiсe} = actions;