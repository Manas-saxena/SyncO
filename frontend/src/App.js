import './App.css';
import {Toaster} from "react-hot-toast";
import Home from "./pages/Home";
import EditorPage from './pages/EditorPage';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
function App() {
  return (
    <>
    <div>
      <Toaster position='top-right'
        toastOptions={{
          success:{
            theme:{
              primary:'#4a2d88',
            }
          }
        }}
      />
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} ></Route>
        <Route path="/editor/:roomId" element={<EditorPage></EditorPage>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
