import React,  { useState, useEffect }  from 'react';
import CountUp from 'react-countup';
import '../App.css';


const Countup = (props) => {

    let numberOfBlocks = props.blocks;
    let numberOfTransactions = props.blocks * 10 - 9;


    return (
        <div className="counter">
            <div className="counterContainer">
                <h1 className="titleRealizado">Bloques minados</h1>
                <CountUp
                    className="countup"  
                    start={0}
                    end={numberOfBlocks}
                    duration={2.5}
                    separator=","
                />
            </div>

            <div className="counterContainer">
                <h1 className="titleRealizado">Transacciones realizadas</h1>
            <CountUp
                className="countup"  
                start={0}
                end={numberOfTransactions}
                duration={2.5}
                separator=","
            />
            </div>

        </div>
    )
}


export default Countup;
