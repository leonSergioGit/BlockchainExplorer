import io from "socket.io-client";
let socket = io("http://localhost:5000");
export default socket;


//Si creas una conexión con io websockets directamente en el componente principal,
//se creará una nueva conexión cada vez que un nuevo elemento del estado sea "renderizado"
//El modo más simple para evitar eso es crear un componente propio para socket y exportarlo