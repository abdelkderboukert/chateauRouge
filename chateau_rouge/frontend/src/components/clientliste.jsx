import React,{useState, useRef, useEffect } from 'react';
import Chartsclient from './chartsclient';
import axios from 'axios';

const Clientliste = () => {
    const [showTest2, setShowTest2] = useState(false);
    const [companys, setCompany] = useState();
    const [clients, setClient] = useState();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const idRef = useRef(false);

    const handleRenderTest2 = () => {
      setShowTest2((prevShowTest2) => !prevShowTest2);
      idRef.current = !idRef.current;
      console.log(idRef);
    };

    const id = 1;

    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/api/camanies/")
        .then((res) => setCompany(res.data))
        .catch((err) => setErrors(err.response.data));
        setLoading(false);
    }, [errors]);

    useEffect(() => {
      axios
        .get("http://127.0.0.1:8000/api/clients/")
        .then((res) => {
          const filteredclient = res.data.filter(
            (client) => client.campany === id
          );
        //   console.log(filteredclient)
          setClient(filteredclient);
          setLoading(false);
        })
        .catch((err) => setErrors(err.response.data));
    }, [errors, id]);

    if (loading) {
      return <div>Loading...</div>;
    }
    
    return (
      <div>
        {!idRef.current && <Chartsclient id={0} />}
        {idRef.current && <Chartsclient id={2} />}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
          className='div-cont'
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width : "50%"
            }}
          >
            {companys &&
              companys.map((company) => (
                <div key={company.id}>
                  {company.id} {company.name} {company.place} {company.re_com}
                </div>
              ))}
          </div>
          {console.log(clients)}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width : "50%"
            }}
          >
            {companys &&
              clients &&
              clients.map((client) => (
                <div key={client.id}>
                  {client.id} {client.name} {client.prename}
                  {companys &&
                    companys
                      .filter((company) => company.id === client.campany)
                      .map((company) => (
                        <div key={company.id}>{company.name}</div>
                      ))}
                </div>
              ))}
          </div>
        </div>
        <button onClick={handleRenderTest2}>Render Test2</button>
      </div>
    );
}

export default Clientliste;
