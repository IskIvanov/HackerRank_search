import React, { Fragment, useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import axios from "axios";
import "./style.scss";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [query,setQuery] = useState('redux');
  const [url, setUrl] = useState('http://hn.algolia.com/api/v1/search?query=redux');
  const [isloading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);

      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return (
      <Fragment>
        <div className="App">
            <h2 className="m-3">Article Search</h2>

            <div className="row justify-content-md-center">
                <input
                    type="text"
                    className="form-control col-5 mr-3"
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                />
              <Button variant="contained" color="primary" 
                                    onClick={ ()=>{
                                      setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`) }}>
                Търси
              </Button>
              
              {isError && <div>Something went wrong ...</div>}

            </div>

           <div className="row hackerRank">
             { isloading ?(
                <div class="spinner-border text-primary mAuto" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
             ):(
                <ul>
                  {data.hits.map(item => (
                      <li key={item.objectID}>
                        <a href={item.url}>{item.title}</a>
                      </li>
                  ))}
                </ul>
                )}
            </div>
        </div>
    </Fragment>
  );
}
 export default App;
