export default function Log({ turns }) {
    let playersTunLog = turns;

    return <ol id="log">
        {playersTunLog.map((playerTurn) => (
            <li key={`${playerTurn.square.row}${playerTurn.square.col}`}>
                {`Player ${playerTurn.player} selected ${playerTurn.square.row}, ${playerTurn.square.col}`}
            </li>
        ))}
    </ol >
}
