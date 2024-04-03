import SearchBar from "../../../components/SearchBar/SearchBar.jsx";

import User from "../User/User.jsx";
import './Users.css';

const Users = () =>
    <div className="Users">
        <SearchBar/>

        <div className={'Users-list'}>
            <User/>
            <User/>
            <User/>
            <User/>
            <User/>
        </div>
    </div>

export default Users;
