import { useRef, useEffect, useCallback } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
//* redux 
import { heroesAdd } from '../heroesList/heroesSlice';
import { fetchFilters } from '../heroesFilters/filtersSlice';


const HeroesAddForm = () => {
    useEffect(() => {
        getFilters();
    },[]);

    const {request} = useHttp();

    const getFilters = useCallback(() => {
        dispatch(fetchFilters());
    }, [request]);

    const options = useSelector(state => state.filters.filters);
    const formRef = useRef(null);
    const dispatch = useDispatch();

    const handleHeroesPost = () => {
        const form = formRef.current;
        const name = form.name.value;
        const text = form.text.value;
        const element = form.element.value;
        const id = uuidv4();

        const json = JSON.stringify({id,name,text,element});
        dispatch(heroesAdd(json));
    }

    const itemsOption = options.map((item,i) => {
        return <option value={item.value} key={i} >{item.name}</option>
    });

    return (
        <form className="border p-4 shadow-lg rounded" ref={formRef} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {itemsOption}
                    {/* <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option> */}
                </select>
            </div>

            <button type="submit" className="btn btn-primary" onClick={handleHeroesPost}>Создать</button>
        </form>
    )
}

export default HeroesAddForm;