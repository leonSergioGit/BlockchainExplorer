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

                if(indx === finder){
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
                                return <p key={index2}>{trans.country} </p>
                        })}
                        </div>
                        
                    </div>
                }
            })

            console.log(myComponent)
        }



    
    return (
    <div className="finderClick">
       
     {myComponent}
    </div>
    )
}

export default FinderClick;