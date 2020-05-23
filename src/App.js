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




  
  useEffect( () => {
    axios.get("http://localhost:5000")
    .then((data) => {
      setBlockChain(data.data)
      setLongitudCadena(data.data.length)
    })
  }, []);





 
  socket.on('updateChain', (data) => {
    setBlockChain(data);
  })



  const minarBloque = async () => {
    await axios.get("http://localhost:5000/minar");
  }


  const handleChange = (evt) => {
   setBlockSearch(evt.target.value);
   console.log(blockSearch)
  }



  const submit = (evt) => {
    evt.preventDefault();
    
    if(isNaN(parseInt(blockSearch))){
      for(let i = 0; i < blockChain.length; i++){
        if(blockSearch === blockChain[i].hash){
          setSearchResult(blockChain[i].timestamp);
          break;
        } else {
          setSearchResult("No se ha encontrado el bloque");
        }
      }
    } else {
      let index = parseInt(blockSearch);
      if(index < blockChain.length){
        setSearchResult(blockChain[blockSearch].timestamp);
      } else {
        setSearchResult("No se ha encontrado tal bloque")
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

      <h1 class="blockFinderTitle">BLOCK FINDER</h1>
      <div class="blockFinderContainer">
        <h1>{searchResult}</h1>
      </div>

      <Blocks leonchain={blockChain} />

    </div>
  );
}

export default App;
