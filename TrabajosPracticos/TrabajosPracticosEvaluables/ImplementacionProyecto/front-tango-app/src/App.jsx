import './App.css';
import NavBar from './components/NavBar';
import Pedido from './components/Pedido';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"

function App() {
  return (
    <div className="App">
    <NavBar />
    <Pedido />
  </div>
  );
}

export default App;
