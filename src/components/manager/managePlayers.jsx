import {useState, useEffect} from 'react';
import { callAddPlayer, callDeletePlayer } from '../../callApi';

const ManagePlayers=({leagueId, setLeagueId, leagueData, setLeagueData}) => {
    const [newUserId, setNewUserId] = useState("");
    const [newNickname, setNewNickname] = useState("");
    const [thisLeague, setThisLeague] = useState({});
    useEffect(() => {
        function checkId(entry) {
            return entry.id === leagueId;
        }
        let foundLeague = leagueData.leagues.find(checkId);
        if (foundLeague) {
            setThisLeague(foundLeague);
        } else {
            setThisLeague({desc:"Not found!"});
        }
    },[leagueId, leagueData]);
    
    
    const handleSubmitPlayer = async(event) => {
        event.preventDefault();
        if (!isValidFormat(newUserId)) {
            alert("Please enter User Id");
            return;
        }
        if (!isValidFormat(newNickname)) {
            alert("Please enter Nickname");
            return;
        }
        if (isValidFormat(newUserId) && isValidFormat(newNickname)) {
            let newLeagueData = await callAddPlayer(newUserId, newNickname, leagueId);
            setLeagueData(newLeagueData);
            setNewUserId("");
            setNewNickname("");
        }
    }
    const handleDeletePlayer = async(id) => {
        let newLeagueData = await callDeletePlayer(id);
        setLeagueData(newLeagueData);
    }
    function isValidFormat(s) {
        let alphanumericPattern = /^[ A-Za-z0-9]+$/;
        return alphanumericPattern.test(s);
    }
    return(<div>
        <div>
            <span
                 data-bs-toggle='tooltip'
                 title='Return to main page'
                 className="material-symbols-outlined brighten"
                 onClick={() => {setLeagueId(-1);}}
                >
                home
            </span>
            <span className='brighten'>League: {thisLeague.desc}</span>
        </div>
        { leagueData.error &&
          <h2>Error Encountered: {leagueData.errorMessage}</h2>
        }
        <div>
            <div>
                <form onSubmit={handleSubmitPlayer}>
                    <h2>Add new user:</h2>
                    <label>User Id:</label>
                    <input
                        type="text"
                        value={newUserId}
                        onChange={e => { setNewUserId(e.target.value); } }
                        />
                    <label>Nickname:</label>
                    <input
                        type="text"
                        value={newNickname}
                        onChange={e => { setNewNickname(e.target.value); } }
                        />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        { leagueData && leagueData.players && leagueData.players.filter(p => p.leagueId === leagueId).length ?
            <table>
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>Nickname</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {leagueData.players.filter(p => p.leagueId === leagueId).map((player,index)=>
                        <tr key={index}>
                            <td>{player.userId}</td>
                            <td>{player.nickname}</td>
                            <td>
                                <span
                                    data-bs-toggle='tooltip'
                                    title='Delete player'
                                    onClick={()=>{handleDeletePlayer(player.id)}}
                                    className="material-symbols-outlined">
                                    delete
                                </span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        :
            <h2>No league players yet</h2>
        }
    </div>)
}

export default ManagePlayers;