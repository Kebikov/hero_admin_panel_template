const initialState = {
    heroes: [], 
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_DELETE': {
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload)
            }
        }
        case 'HEROES_ADDED_POST': {
            return {
                ...state,
                heroes: state.heroes
            }
        }
        case 'HEROES_FILTER': {
            return {
                ...state,
                activeFilter: action.payload
            }
        }
        default: return state
    }
}

export default reducer;

