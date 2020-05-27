import React,  { useState, useEffect }  from 'react';
import './App.css';
import axios from 'axios';
import Countup from "./components/Countup";
import Blocks from "./components/Block";
import socket from "./components/Socket";



const App = () => {

  //Estado de la aplicación
 const [blockChain, setBlockChain] = useState([]);
 const [longitudCadena, setLongitudCadena] = useState(0);
 const [blockSearch, setBlockSearch] = useState("");
 const [searchResult, setSearchResult] = useState("");
 const [transactionSearch, setTransactionSearch] = useState("");




  
  useEffect( () => {
    axios.get("http://localhost:5000")
    .then((data) => {
      setBlockChain(data.data)
      setLongitudCadena(data.data.length)
    })
  }, []);

  let foundBlock;

  useEffect(() => {
    if(searchResult === "Encontrado"){
      console.log("holahola")
    }
  }, [searchResult])


 

 
  socket.on('updateChain', (data) => {
    setBlockChain(data);
  })



  const minarBloque = async () => {
    await axios.get("http://localhost:5000/minar");
  }


  const handleChange = (evt) => {
   setBlockSearch(evt.target.value);
  }



  const submit = (evt) => {
    evt.preventDefault();

    
    if(isNaN(blockSearch) && blockSearch.length > 40){
      for(let i = 0; i < blockChain.length; i++){
        if(blockSearch === blockChain[i].hash){
          setSearchResult(blockChain[i]);
          break;
        } else {
          setSearchResult("no results");
        }
      }
    } else if (isNaN(blockSearch) && blockSearch.length < 39) {
      setBlockSearch(blockSearch + " ")
      for(let i = 0; i < blockChain.length; i++){

        for(let p = 0; p < blockChain[i].transactions.length; p++){
          if(blockSearch === blockChain[i].transactions[p].transactionId){
            setTransactionSearch(blockChain[i].transactions[p])
            break;
          }
        }
      }
    } 
    else {
      let index = parseInt(blockSearch);
      if(index < blockChain.length){
        setSearchResult(blockChain[blockSearch]);
      } else {
        setSearchResult("no results")
      }

    }
    setBlockSearch("");
  }

  

  //



  return (
    <div className="App">
      <h1 className="appTitle">Bienvenido a la sala de minería de PLUS ULTRA BLOCKCHAIN</h1>
      <Countup blocks={blockChain.length} />
      <br />
      <form onSubmit={submit}>
        <input type="text" name="blockSearch" value={blockSearch} onChange={handleChange} className="inputFinder" />
        <button className="blockFinder">Buscar</button>
      </form>

      <h1 className="blockFinderTitle">BLOCK FINDER</h1>
      <div className="blockFinderContainer">
        <div className="finderViewer">
          <div>
            <h3 className="viewerTitle">BLOCK INFO</h3>
            <h3 className="noResults">{searchResult === "no results" ? "NO SE HAN ENCONTRADO RESULTADOS" : ""}</h3>    
            {searchResult.index ?  <p><span>Index:</span> {searchResult.index}</p> : "" }
            {searchResult.timestamp ? <p><span>Fecha:</span> {new Date(searchResult.timestamp).toString()}</p> : "" }
            {searchResult.hash ? <p><span>Hash:</span> {searchResult.hash}</p> : ""}
            {searchResult.previousBlockHash ? <p><span>Previous Block Hash:</span> {searchResult.previousBlockHash}</p> : ""}
          </div>
          <div>
          <h3 className="viewerTitle">TRANSACTIONS</h3>

                   {searchResult.transactions ?     <div>    {searchResult.transactions.map((trans, index2) => {
                                return <div key={index2} className="transContainer">                                  
                                    <p className="transactionNumber"><span>Transaction: </span>: {index2 + 1}</p>
                                    <p><span>Transaction ID: </span> {trans.transactionId}</p>
                                    <div className="transInfo"><p><span>Hospital: </span> {trans.hospital}</p> <p><span>Country:</span> {trans.country}</p></div>
                                    <p className="patient"><span>Patient symptoms: </span> {trans.symptoms}</p>
                                    <p className="patient"><span>Patient info: </span> {trans.patientInfo}</p>
                                    </div>
                        })} </div> : "" }

                  {transactionSearch.transactionId ? <p><span>Transaction Id: </span> {transactionSearch.transactionId}</p> : ""}
                  {transactionSearch.hospital ? <p><span>Hospital: </span> {transactionSearch.hospital}</p> : ""}
                  {transactionSearch.country ? <p><span>Country: </span> {transactionSearch.country}</p> : ""}
                  {transactionSearch.patientInfo ? <p><span>Patient info: </span> {transactionSearch.patientInfo}</p> : ""}
                  {transactionSearch.symptoms ? <p><span>Symptoms: </span> {transactionSearch.symptoms}</p> : ""}

         
          </div>                     
        </div>
      </div>

      <Blocks leonchain={blockChain} />

    </div>
  );
}

export default App;
