import React,{useRef,useEffect, useState} from 'react'
import Client from "../components/Client"
import Editor from '../components/Editor'
import { initSocket } from '../socket'
import ACTIONS from '../Actions'
import { useLocation , useNavigate ,Navigate , useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
const EditorPage = (props) => {
 const socketRef = useRef(null);
 const codeRef = useRef(null);
  const [clients , setClients] = useState([])
 const location = useLocation();
 const {roomId} = useParams();
 console.log(roomId);
 const reactNavigator = useNavigate();
 useEffect(() => {
  const init = async () =>{
    socketRef.current = await initSocket();
    socketRef.current.on('connect_error' , (err)=>handleErrors(err));
    socketRef.current.on('connect_failed' , (err)=>handleErrors(err));
    function handleErrors(e){
      console.log('socket error',e);
      toast.error('Socket connection failed , try again later.');
      reactNavigator('/');
    }
    socketRef.current.emit(ACTIONS.JOIN , {
      roomId,
      username: location.state?.username,
    });
    socketRef.current.on(ACTIONS.JOINED , ({clients , username , socketId})=>{
      if(username!==location.state?.username)
      {
        toast.success(`${username} joined the room.`);
        // console.log(`${username} joined the room.`);
      }
        setClients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE , {
         code : codeRef.current ,
          socketId 
        });

    })
    //listening for disconnected
    socketRef.current.on(ACTIONS.DISCONNECTED , ({socketId , username})=>{
      toast.success(`${username} left the room.`);
      setClients((prev)=>{
        return prev.filter(client=>{
          if(client.socketId !==socketId)
          {
            return true;
          }
        })
      })
    })
  }
  init();
  return () =>{
    socketRef.current.disconnect();
    socketRef.current.off(ACTIONS.JOINED);
    socketRef.current.off(ACTIONS.DISCONNECTED);
  }
  
 }, [])
  const copyRoomId = async ()=>{
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success('Room ID copied');
    } catch (error) {
      toast.error('Room ID not copied');
    }
  }
  const leaveRoom =()=>{
    reactNavigator('/');
  }
  if(!location.state){
    return <Navigate to="/"></Navigate>
  }
  return (
    <div className='mainWrap'>
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img src="/code-sync.png" alt="logo"  className='logoImage'/>
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {
              clients.map((client)=>{
                return (
                <Client username = {client.username} key={client.socketId}></Client>
                )
              })
            }
          </div>
          </div>
          <button className='btn copyBtn' onClick={copyRoomId}> Copy ROOMID</button>
            <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
      </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomId ={roomId} onCodeChange={(code)=>{codeRef.current = code}}></Editor>
      </div>
    </div>
  )
}

export default EditorPage
