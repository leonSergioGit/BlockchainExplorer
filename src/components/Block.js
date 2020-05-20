import React,  { useState, useEffect }  from 'react';
import '../App.css';
import Spinner from './spinner.gif';


const Block = (props) => {


    //Estado del componente
    const [blocks, setBlocks] = useState(null);

    //Componente en el que añadiremos el html
    let myComponent;


    useEffect(() => {
        setBlocks(props)
        //console.log(blocks)
        //Pasando el parámetro props al useEffect hooks, conseguimos el efecto de que el componente se actualice
        //cada vez que props es actualizado
    }, [props])


    


    //En este punto nos encontramos con que la aplicación puede tardar unos segundos en cargar la información inicial de la API.
    //Es por eso que tenemos que hacer uso de un condicional para actuar de distinta manera en caso de que ya esté cargada la información o no
    if(blocks){
        console.log(blocks)
        let arr = Array.from(blocks.leonchain);   
        myComponent = arr.map((block, index) => {
            return <div key={index} className="blockElement">
                   <p>Index: {block.index}</p>
                   <p>Fecha: {block.timestamp}</p>
                   {block.transactions.map((trans, index2) => {
                       return <p key={index2}>{ trans.recipient} </p>
                   })}
                   <p>Nonce: {block.nonce}</p>
                   <p>Hash: {block.hash}</p>
                   <p>Previous Block Hash: {block.previousBlockHash}</p>
            </div>})

        return (
            <div className="blockComponent">
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
