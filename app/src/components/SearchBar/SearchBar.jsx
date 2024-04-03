import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="searchbar">
            <input type="text" placeholder={'Search'}/>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
        </div>
    );
}

export default SearchBar;
