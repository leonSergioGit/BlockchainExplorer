import React, { useState, useEffect} from 'react';
import '../App.css';

const FinderClick = (props) => {

        //Estado del componente
        const [blocks, setBlocks] = useState(props.block);
        const [finder, setFinder] = useState("");
    
        //Componente en el que añadiremos el html
        let myComponent;


   

        useEffect(() => {
            const updateState = () => {
                setBlocks(props.block)
                setFinder(props.blockIndex)
    
            }
            updateState();
        }, [props])

        if(finder != undefined){
            myComponent = blocks.leonchain.map((blck, indx) => {
                if(indx === finder && indx == 0){
                    return <div key={indx} className="finderViewer">
                                <div>
                                    <h3 className="viewerTitle">BLOCK INFO</h3>
                                    <p><span>Index:</span> {blck.index}</p>
                                    <p><span>Fecha:</span> {new Date(blck.timestamp).toString()}</p>
                                    <p><span>Nonce:</span> {blck.nonce}</p>
                                    <p><span>Hash:</span> {blck.hash}</p>
                                    <p><span>Previous Block Hash:</span> {blck.previousBlockHash}</p>
                                </div>
                                <div>
                                    <h1>GENESIS BLOCK</h1>
                                    <p>{blck.transactions[0]}</p>
                                </div>
                            </div>
                }
                else if(indx === finder && indx != 0){
                return <div key={indx} className="finderViewer">
                        <div>
                            <h3 className="viewerTitle">BLOCK INFO</h3>
                            <p><span>Index:</span> {blck.index}</p>
                            <p><span>Fecha:</span> {new Date(blck.timestamp).toString()}</p>

                            <p><span>Nonce:</span> {blck.nonce}</p>
                            <p><span>Hash:</span> {blck.hash}</p>
                        <p><span>Previous Block Hash:</span> {blck.previousBlockHash}</p>
                        </div>
                        <div>
                            <h3 className="viewerTitle">TRANSACTIONS</h3>
                            {blck.transactions.map((trans, index2) => {
                                return <div key={index2} className="transContainer">                                  
                                    <p className="transactionNumber"><span>Transaction: </span>: {index2 + 1}</p>
                                    <p><span>Transaction ID: </span> {trans.transactionId}</p>
                                    <div className="transInfo"><p><span>Hospital: </span> {trans.hospital}</p> <p><span>Country:</span> {trans.country}</p></div>
                                    <p className="patient"><span>Patient symptoms: </span> {trans.symptoms}</p>
                                    <p className="patient"><span>Patient info: </span> {trans.patientInfo}</p>
                                    </div>
                        })}
                        </div>                     
                    </div>
                }
            })
        }



    
    return (
    <div className="finderClick">
       
     {myComponent}
    </div>
    )
}

export default FinderClick;