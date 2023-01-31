import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchHeroes } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

//= HeroesList 
const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);

    const heroesMemo = createSelector(
        (state) => state.filters.activeFilter,
        (state) => state.heroes.heroes,

        (activeFilter, heroes) => {
            if(activeFilter === 'all') {
                return heroes;
            }else{
                return heroes.filter(item => item.element === activeFilter);
            }
        }
    );

    const heroesCurrent = useSelector(heroesMemo);

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if(Array.isArray(arr)) {
            if (arr.length === 0) {
                return <h5 className="text-center mt-5">Героев пока нет</h5>
            }
            return arr.map(({id, ...props}) => {
                return <HeroesListItem key={id} dataId={id} {...props}/>
            })
        }else{
            return [];
        }
    }

    const elements = renderHeroesList(heroesCurrent);
    //* return 
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;