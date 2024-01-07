import {useState} from 'react';
import * as c from '../../constants';

const AddLeague=({submitData, cancelOperation}) => {
    const [newDesc, setNewDesc] = useState("");
    const [newStartDate, setNewStartDate] = useState("");
    const [newEndDate, setNewEndDate] = useState("");
    const [newGamesPerOpp, setNewGamesPerOpp] = useState(3); // Default number of games per pair of opponents
    function handleSubmit(event) {
        event.preventDefault();
        if (isDataAcceptable()) {
            submitData(newDesc, newStartDate, newEndDate, c.ST_REG, newGamesPerOpp);
        }
    }
    function isDataAcceptable() {
        return newDesc.length > 0 && isValidFormat(newDesc) &&
         newStartDate.length > 0 && isValidDateFormat(newStartDate) &&
         newEndDate.length > 0 && isValidDateFormat(newEndDate);
    }
    function isValidFormat(s) {
        let alphanumericPattern = /^[ A-Za-z0-9]+$/;
        return alphanumericPattern.test(s);
    }
    function isValidDateFormat(s) {
        let datePattern = /^[- A-Za-z0-9]+$/;
        return datePattern.test(s);
    }
    return(<form onSubmit={handleSubmit}>
        <h1>Enter a new league:</h1>
        <div>
            <label>Start Date:</label>
            <input
                type="text"
                value={newStartDate}
                onChange={e => { setNewStartDate(e.target.value); } }
                />
        </div>
        <div>
            <label column sm={5}>End Date:</label>
            <input
                type="text"
                value={newEndDate}
                onChange={e => { setNewEndDate(e.target.value); } }
                />
        </div>
        <div>
            <label>Description:</label>
            <input
                type="text"
                value={newDesc}
                onChange={e => { setNewDesc(e.target.value); } }
                />
        </div>
        <div>
            <label>Games per pair:</label>
            <input
                type='number'
                value={newGamesPerOpp}
                onChange={e => {setNewGamesPerOpp(e.target.value);}}
                />
        </div>
        <div>
            <button
                type='button'
                onClick={cancelOperation}
                >
                    Cancel
            </button>
            <button
                variant='primary'
                type='submit'
                >
                    Submit
            </button>
        </div>
    </form>);
}

export default AddLeague;