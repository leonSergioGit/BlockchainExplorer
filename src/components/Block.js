import React,  { useState, useEffect }  from 'react';
import FinderClick from './FinderClick';

import '../App.css';
import Spinner from './spinner.gif';


const Block = (props) => {


    //Estado del componente
    const [blocks, setBlocks] = useState(null);
    const [finder, setFinder] = useState("");

    //Componente en el que añadiremos el html
    let myComponent;


    useEffect(() => {
        setBlocks(props)
        //console.log(blocks)
        //Pasando el parámetro props al useEffect hooks, conseguimos el efecto de que el componente se actualice
        //cada vez que props es actualizado
    }, [props])

    let finderComponent;

    const testing = (blockIndex) => {
        setFinder(blockIndex);
    }
    

    //En este punto nos encontramos con que la aplicación puede tardar unos segundos en cargar la información inicial de la API.
    //Es por eso que tenemos que hacer uso de un condicional para actuar de distinta manera en caso de que ya esté cargada la información o no
    if(blocks){
        let arr = Array.from(blocks.leonchain);   
        myComponent = arr.map((block, index) => {
            

            return <div key={index} className="blockElement" onClick={() => testing(index)}>
                        <h3>{index === 0 ? 'Genesis Block' : 'Block'}</h3>
                        <h4>{index === 0 ? '' : index}</h4>
                    </div>
            })

        return (
            <div className="blockComponent">
                <h1>BLOCK VIEWER</h1>
                <FinderClick 
                   blockIndex={finder} 
                   block={blocks}
                />
                <h1>BLOCKS</h1>
                <div className="blockContainer">
                {myComponent}
                </div>
            </div>
        )
    } else {
        return (
            <div>
               
                <img src={Spinner} />
            </div>
        )
    }

}

export default Block;
