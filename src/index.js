import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



import App from './App';

ReactDOM.render(

            <div>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6">
                    News
                </Typography>
                <Typography variant="h6">
                    News
                </Typography>
                </Toolbar>
            </AppBar>
            </div>
            , document.getElementById('root')
        
        );