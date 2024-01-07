import {useState} from 'react';

const FixGame=({game, submitUpdatedGame, cancelUpdateGame}) => {
    const [newPlayer1Score, setNewPlayer1Score] = useState(game.player1Score);
    const [newPlayer2Score, setNewPlayer2Score] = useState(game.player2Score);
    
    function handleSubmit(event) {
        event.preventDefault();
        if (isDataAcceptable()) {
            let updatedGame = game;
            updatedGame.player1Score = newPlayer1Score;
            updatedGame.player2Score = newPlayer2Score;
            submitUpdatedGame(updatedGame);
            setNewPlayer1Score(0);
            setNewPlayer2Score(0);
        }
    }
    function isDataAcceptable() {
        if (!isValidNumberFormat(newPlayer1Score)) {
            alert('Enter a valid player 1 score, please.');
            return false;
        }
        if (!isValidNumberFormat(newPlayer2Score)) {
            alert('Enter a valid player 2 score, please.');
            return false;
        }
        return true;
    }
    function isValidNumberFormat(s) {
        let numericPattern = /^[0-9]+$/;
        return numericPattern.test(s);
    }
    return(<div>
        <form onSubmit={handleSubmit}>
            <label>Fix game result:</label>
            <div>
                <div>
                    <label>{game.player1Nickname}:</label>
                </div>
                <div>
                    <input
                        type="text"
                        value={newPlayer1Score}
                        onChange={e => { setNewPlayer1Score(e.target.value); } }
                        />
                </div>
            </div>
            <div>
                <div>
                    <label>{game.player2Nickname}:</label>
                </div>
                <div>
                    <input
                        type="text"
                        value={newPlayer2Score}
                        onChange={e => { setNewPlayer2Score(e.target.value); } }
                        />
                </div>
            </div>
            <div>
                <button
                    type='submit'
                    >
                    Submit
                </button>
                <button onClick={cancelUpdateGame}>Cancel</button>
            </div>
        </form>
    </div>);
}

export default FixGame;