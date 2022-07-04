import React , {useState} from 'react'
import {v4 as uuidv4} from "uuid";
import {useNavigate} from "react-router-dom"
import  { toast } from 'react-hot-toast';
const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [userName , setUserName] = useState("");
 const reactNavigator = useNavigate();
  const createNewRoom =  (e) =>{
    e.preventDefault();
    const id = uuidv4();
   setRoomId(id);
    toast.success("created a new room");
  }

  const inputChange = (e) =>{
    if(e.target.name === "roomId")
    { 
      setRoomId(e.target.value);
    }else if(e.target.name === "userName"){
      setUserName(e.target.value);
    }
  }
  
  return (
    <div className='homePageWrapper'>
        <div className="formWrapper">
          <img className='formPageLogo' src="/code-sync.png" alt="logo" />
          <h4 className="mainLabel">Paste invitation ROOM ID</h4>
          <div className="inputGroup">
            <input type="text" name="roomId" onChange={inputChange} value={roomId} placeholder='Room ID' className="inputBox" />
            <input type="text" placeholder='USERNAME' value={userName}  onChange={inputChange} name="userName" className="inputBox" />
            <button className='btn joinBtn' onClick={()=>{reactNavigator(`/editor/${roomId}` ,{
              state:{
                username:userName
              }
            })}}>Join</button>
            <span className='createInfo'>
              If you don't have an invite then create {'\u00A0'} 
              <a onClick={createNewRoom} href="*" className='createNewBtn'>new room</a>
            </span>
          </div>
        </div>
        <footer>
          <h4>Built with 💛 by  {'\u00A0'} <a href="https://github.com/Manas-saxena/SyncO">Manas Saxena</a> </h4>
        </footer>
    </div>
  )
}

export default Home;