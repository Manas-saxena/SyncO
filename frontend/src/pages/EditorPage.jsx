import React,{useState} from 'react'
import Client from "../components/Client"
import Editor from '../components/Editor'
const EditorPage = () => {
  const [clients , setClients] = useState([{socketId:1 , username : "MAnas S"},{socketId:2 , username : "john saxena"}])
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
          <button className='btn copyBtn'> Copy ROOMID</button>
            <button className='btn leaveBtn'>Leave</button>
      </div>
      <div className="editorWrap">
        <Editor></Editor>
      </div>
    </div>
  )
}

export default EditorPage
