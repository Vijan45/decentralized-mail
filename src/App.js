import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Paper, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SendMessage from './components/SendMessage';
import Inbox from './components/Inbox';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
    typography: {
        h6: {
            fontWeight: 600,
        },
    },
});

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            Decentralized Mail System
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <Grid container spacing={3} style={{ marginTop: '20px' }}>
                        <Grid item xs={12} sm={6}>
                            <Paper style={{ padding: '20px' }}>
                                <SendMessage />
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper style={{ padding: '20px' }}>
                                <Inbox />
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
};

export default App;
