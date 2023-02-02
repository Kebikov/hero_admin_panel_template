import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
);

export const heroesAdd = createAsyncThunk('heroes/heroesAdd',
    (body) => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes", "POST", body);
    }
);

export const heroesDelete = createAsyncThunk('heroes/heroesDelete',
    async (id) => {
        const {request} = useHttp();
        await request(`http://localhost:3001/heroes/${id}`, "DELETE");
        return  id;
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            //* fetchHeroes 
            .addCase(fetchHeroes.pending, state => {
                state.heroesLoadingStatus = 'loading'
            })
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected, state => {
                state.heroesLoadingStatus = 'error';
            })
            //* heroesAdd 
            .addCase(heroesAdd.fulfilled, (state, action) => {
                state.heroes = action.payload;
            })
            //* heroesDelete 
            .addCase(heroesDelete.fulfilled, (state, action) => {
                state.heroes = state.heroes.filter(item => item.id !== action.payload);
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export default reducer;
export const {} = actions;
