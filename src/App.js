import React, {useState, useEffect} from 'react';
import api from './api';

function App() {

    const [lista, setLista] = useState([]); 

    useEffect(() => {
        api.get('/agenda').then((response) => {
            const itens = response.data;
            setLista(itens);
        });
    }, []);
    return (
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
                    <td>{itens.favorito}/></td>
                </tr>
            ))}
            
        </table>
    )
}

export default App;
