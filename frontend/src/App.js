import './App.css';
import Home from "./pages/Home";
import EditorPage from './pages/EditorPage';
import {BrowserRouter, Routes , Route} from 'react-router-dom'
function App() {
  return (
    <>
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
