import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        console.log('request',);
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesDelete: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload);
        },
        heroesAdd: (state, action) => {
            state.heroes = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {
                console.log('error',);
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {heroesDelete, heroesAdd} = actions;
