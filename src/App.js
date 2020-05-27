import React, {useState, useEffect} from 'react';
import api from './api';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


function App() {

    const [lista, setLista] = useState([]); 
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        api.get('/agenda').then((response) => {
            const itens = response.data;
            setLista(itens);
            setLoading(false);
        });
    }, []);
    
    return (
        <>
            { loading ? <span>Carregando dados</span> : <div></div>}
            <table border="1">
                <tr>
                    <th>id</th>
                    <th>Nome</th>
                    <th>Número</th>
                    <th>Favorito</th>

                </tr>
                {lista.map(itens => (
                    <tr key={itens.id}>
                        <td>{itens.id}</td>
                        <td>{itens.nome}</td>
                        <td>{itens.numero}</td>
                        <td>{itens.favorito}</td>
                    </tr>
                ))}
                
            </table>
            <Button variant="contained" color="primary">
                Adicionar
            </Button>
        </>
    )
}

export default App;
