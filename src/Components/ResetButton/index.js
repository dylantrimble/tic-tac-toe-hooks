import React from 'react';

// Creating a component that will represent each square on my board.
const ResetButton = (props) => {

    return (
        <>
            <button className="reset--button" onClick={props.reset}>
                Reset game!
            </button>
        </>
    )
}

export default ResetButton;