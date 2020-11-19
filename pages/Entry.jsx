import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

//This function is gonna allow us to add a new location, then it will be possible to know the weather in such location
function Entry({ onUpdate }) {
    const handleBlur = ev => onUpdate(ev.target.value);

    //Setting "Enter" as the key to confirm the input
    const handleKeyDown = ev => {
        if (ev.key === "Enter") {
            onUpdate(ev.target.value);
        }
    };

    return <TextField autoFocus label="Enter location" onBlur={handleBlur} onKeyDown={handleKeyDown} />;
}

Entry.propTypes = {
    onUpdate: PropTypes.func.isRequired,
};

export default Entry;
