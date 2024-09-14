import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onPlayerNameChange }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEdeting, setIsEditing] = useState(false);

    function hanldeEditClick() {
        setIsEditing((editing) => !editing);

        if (isEdeting) {
            onPlayerNameChange(symbol, playerName);
        }
    }

    function handleChange(event) {
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if (isEdeting) {
        editablePlayerName = (
            <input type='text' required value={playerName} onChange={handleChange} />
        );
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={hanldeEditClick}>{!isEdeting ? "Edit" : "Save"}</button>
        </li>
    )
}
