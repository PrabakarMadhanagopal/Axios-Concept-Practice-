import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplayComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPost, setLoadingPost] = useState(false);
  const [error, setError] = useState(null);
  const [name,setname] = useState(""); 
  const [trigger, settrigger] = useState(false);  

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1') 
      .then((response) => {
        setData([response.data]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [trigger]); 


  const PostMethod = () => {
    setLoadingPost(true);  
    axios.post('https://671f2a561dfc429919842765.mockapi.io/training/v1/status',{title:name})
    .then( (res)=> {
        setData([...data,res.data])
        console.log(res.data);
        setLoading(false);
    })
    .then(settrigger(!trigger))
    .finally(() => {
        setLoadingPost(false); 
        settrigger(!trigger);  
    })
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>     
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.title}</li> 
        ))}
      </ul>
      <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setname(e.target.value)} />
      <button onClick={PostMethod} disabled={loadingPost}> {loadingPost ? 'Submitting...' : 'Submit'} </button>
    </div>
  );
  
  
};

export default DataDisplayComponent;