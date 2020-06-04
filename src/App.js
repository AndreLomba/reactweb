import React, { useState, useEffect } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {

    const [ lista, setLista ] = useState([]); // imutabilidade
    const [ open, setOpen ] = useState(false);

    const openModal = () => setOpen(true);

    // function closeModal() { setOpen(false); }
    const closeModal = () => setOpen(false);

    useEffect(() => {
        api.get('/agenda').then((response) => {
            const itens = response.data;
            setLista(itens);
        });
    }, []);
    
    return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.nome}</TableCell>
                        <TableCell>{itens.numero}</TableCell>

                        <TableCell>
                            <input type="checkbox" checked={itens.favorito == "S" ? true : false}/>
                        </TableCell>
                        <TableCell>
                            <Button variant="outlined" size="small" color="secondary">Apagar</Button>
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
                    id="name"
                    label="Nome"
                    type="email"
                    fullWidth
                    // value={tarefa}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Número"
                    type="email"
                    fullWidth
                    // value={tarefa}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary">
                    Salvar
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
}

export default App;
