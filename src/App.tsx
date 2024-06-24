import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import axios from 'axios';

axios.defaults.baseURL = 'http://184.73.145.4:8085';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Accept'] = 'application/json';

function App() {
  return (
    <Router>
      <div className='mx-auto p-4 max-w-[800px]'>
        <Routes>
          <Route path='/inventory' Component={Inventory} />
          <Route path='/products' Component={Products} />
          <Route path='*' element={<Navigate to='/inventory' />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
