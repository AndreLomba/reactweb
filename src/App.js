import React, { useState, useEffect, Icon } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    Checkbox ,
    FormControlLabel ,
    DialogActions} from '@material-ui/core';
import './style.css';


function App() {

    const [ lista, setLista ] = useState([]); // imutabilidade
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome ] = useState('');
    const [ numero, setNumero ] = useState('');
    const [ favorito, setFavorito ] = useState('S');
    const [ checked, setChecked ] = useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        const check = checked ? "N" : "S";
        setFavorito(check);
    };
    
    const openModal = () => setOpen(true);

    const closeModal = () => setOpen(false);

    function listaNumeros(){
         api.get('/agenda').then((response) => {
            const itens = response.data;
            setLista(itens);
        });
    }

    useEffect(() => {
        listaNumeros();
    }, []);
    
    function addContato(){
        const name = nome;
        const number = numero;
        const favorite = favorito;

        api.post('/agenda', {nome:name, numero:number, favorito:favorite}).then((response) => {
            setNome('');
            setNumero('');
            setChecked(true);
            setOpen(false);
            listaNumeros();
        });
    }

    function deleteContato(id){
        api.delete(`/contato/${id}`).then((response) => {
            listaNumeros();
        });
    }
    function favoriteContato(id,fav){
        if(fav == "S"){
            fav = "N";
        } else {
            fav = "S";
        }
        api.put(`/contato/favorito/${id}`,{favorito:fav}).then((response) => {
            listaNumeros();
        });
       
    }

    return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                
                <TableHead>
                    <TableRow>
                        <TableCell>Código</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Número</TableCell>
                        <TableCell>Favorito</TableCell>
                        <TableCell>Ações</TableCell>
                    </TableRow>
                </TableHead>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.nome}</TableCell>
                        <TableCell>{itens.numero}</TableCell>
                        <TableCell>{itens.favorito}</TableCell>

                        <TableCell>
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => favoriteContato(itens.id,itens.favorito)}
                                size="small"> 
                                {itens.favorito == "S" ? "Desfavoritar" : "Favoritar"} 
                            </Button>
                            &nbsp;
                            
                            <Button 
                                onClick={() => deleteContato(itens.id)}
                                variant="outlined" 
                                size="small" 
                                color="secondary">Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px'}}>
                Adicionar
            </Button>
         </Container>
         <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Nova Tarefa</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite os dados do contato.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Nome"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="numero"
                    label="Número"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={numero}
                    onChange={e => setNumero(e.target.value)}

                />
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={checked}
                        onChange={handleChange}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                    }
                    label="Favorito"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={addContato}>
                    Salvar
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
}

export default App;
