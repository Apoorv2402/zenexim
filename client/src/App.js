import { useEffect, useState } from 'react';
import './App.css';
import FormComponent from './Components/Form';
import TableComponent from './Components/TableComponent';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(async()=>{
    await axios.get('http://localhost:5000/api/product/all')
    .then(res => setProducts(res.data))
  },[])
  return (
    <div className="App">
      <FormComponent products={products}/>
    </div>
  );
}

export default App;
