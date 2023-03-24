import logo from './logo.svg';
import './App.css';
import Tasks from './Pages/Tasks';
import Navbar from './Components/Navbar/Navbar';
import AllRoutes from './Routes/AllRoutes';


function App() {
  return (
    <div className="App">
      <Navbar />
      <AllRoutes/>
    </div>
  );
}

export default App;
