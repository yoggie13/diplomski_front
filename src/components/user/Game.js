import React from 'react';
import { Radio } from '@material-ui/core';

export default function Game({ gameState, checkedStrategyState, handleCheck, handleInput, answer }) {
    console.log(checkedStrategyState)
    return (
        <div>
            {
                gameState.game.type === 1 || gameState.game.type === 3
                    ? <div id="radioButtons">
                        {
                            gameState.game.strategies.map((strategy) =>
                                <>
                                    <label key={`${strategy.strategyID}`} htmlFor={`${strategy.strategyID}`} onClick={e => handleCheck(`${strategy.strategyID}`)}>
                                        <Radio
                                            id={`${strategy.strategyID}`}
                                            name="Strategy"
                                            value={`${strategy.strategyID}`}
                                            checked={checkedStrategyState === `${strategy.strategyID}`}
                                            onChange={e => handleCheck(e.target.id)}
                                            required={true}
                                        />
                                        {`${strategy.strategyName}`}
                                    </label>
                                </>
                            )
                        }
                    </div>
                    : <>
                        <label htmlFor="numberInput">Unesite broj</label>
                        <input type="number" id="numberInput" value={checkedStrategyState} onChange={handleInput} min={gameState.game.minValue} max={gameState.game.maxValue} />
                    </>
            }
        </div>);
}
