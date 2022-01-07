import red from '@material-ui/core/colors/red';
import { createTheme } from '@material-ui/core';

const theme = createTheme({
    palette: {
        primary: {
            main: '#af55d6',
        },
        secondary: {
            main: '#fff',
        },
        error: {
            main: red.A400,
        },
        background: {
            default: '#403545'
        },
    },
});

export default theme;