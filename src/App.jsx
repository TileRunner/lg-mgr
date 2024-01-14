import './App.css';
import {useState, useEffect} from 'react';
import ManageLeagues from './components/manager/manageLeagues';
import { callGetLeagueData } from './callApi.js';

function App() {
  const [leagueData, setLeagueData] = useState({"leagues":[],"players":[],"games":[]});
  const myDivScroll = {
    overflowY: 'auto'
};

  useEffect(() => {
    async function fetchData() {
        let jdata = await callGetLeagueData();
        setLeagueData(jdata);
      }
    fetchData();
  },[]);

  return (
    <div className='app' style={myDivScroll}>
      <header>
        { leagueData.error ?
          <h1>Error Encountered: {leagueData.errorMessage}</h1>
        :
          <ManageLeagues leagueData={leagueData} setLeagueData={setLeagueData}/>
        }
      </header>
    </div>
  );
}

export default App;
