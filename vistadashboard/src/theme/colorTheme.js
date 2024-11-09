import { createTheme } from "@mui/material";
import { blue } from "@mui/material/colors";

export const colorTheme = createTheme({
    palette:{
        primary:{
            main: '#0000cc'
        },
        secondary:{
            main:'#000033'
        },
        error:{
            main:blue[400]
        }
    }
})