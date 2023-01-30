import { useSelector, useDispatch } from "react-redux";
import { heroesFilter } from '../../actions';

const HeroesFilters = () => {

    const dispatch = useDispatch();

    const buttonOption = useSelector(state => state.filters.filters);
    const currentActiveFilter = useSelector(state => state.filters.activeFilter);

    const buttonFilters = buttonOption.map((item, i) => {
        return <button className={currentActiveFilter === item.value ? item.class + ' active' : item.class} key={i} onClick={() => choiceFilters(item.value)} >{item.name}</button>
    });
    
    const choiceFilters = (choice) => {
        dispatch(heroesFilter(choice));
    } 

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button className={currentActiveFilter === 'all' ? "btn btn-outline-dark active" : "btn btn-outline-dark"} onClick={() => choiceFilters('all')} >Все</button>
                    {buttonFilters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;