// DanInput.jsx
// An enhanced input box, that sends its content back to the calling object. It can also handle completing actions when the
// enter key is pressed.

import React from "react";

export function DanInput(props) {
    // Handles all things needed for a generic input box
    // prop values:
    //    default - Optional. What value this field should start with
    //    placeholder - Optional. What value to place in the input box before the user adds content. This is an HTML trick
    //    onUpdate - Required. What function to call when the content of the input box changes. This will be called with
    //          parameters (fieldName, value)
    //    fieldName - Optional. Name of this input box, for the parent component. If not set, onUpdate will be called
    //          with an undefined first parameter. Use this to stack multiple input boxes in the same base component
    //    onEnter - Optional. What function to call when the user presses enter. Does not send any content here

    const [name, setName] = React.useState(props.default === undefined ? "" : props.default);
    function watchChange(e) {
        // Internal function to update the internal React field whenever the user types in the box
        setName(e.target.value);
        props.onUpdate(props.fieldName, e.target.value);
    }

    function watchKey(e) {
        // Internal function to check if the user presses enter
        if (e.keyCode === 13) {
            if (props.onEnter !== undefined) {
                props.onEnter();
            }
            setName('')
        }
    }

    function watchBlur(e) {
        // Internal function to check if the user has clicked away from the box.
        if (props.onBlur !== undefined) {
            props.onBlur();
        }
    }
    
    return (
        <input
            value={name}
            className="DanInput"
            onChange={e => watchChange(e)}
            onKeyDown={r => watchKey(r)}
            placeholder={props.placeholder === undefined ? "" : props.placeholder}
            onBlur={s => watchBlur(s)}
        />
    );
}
