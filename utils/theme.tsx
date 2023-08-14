import { createTheme } from '@mui/material/styles'
import type {} from '@mui/x-data-grid/themeAugmentation'



let theme = createTheme({
  palette: {
    primary: {
      main: '#125893',
      light: '#e5f6ff',
    },
    common: {
      body: '#f4f5f7',
    },
    text:{
      secondary: '#7E7E7E',
      dark: 'rgb(0 0 0 / 60%)'
    },
  }
})


theme = createTheme({
  palette: {
    ...theme.palette
  },
  shadows: theme.shadows,
  typography: {
    fontFamily: 'var(--font-family)',
    h1: {
      fontSize: 21,
      fontWeight: 700,
      textTransform:'capitalize',
      color: theme.palette.text.primary,
      marginBottom: theme.spacing(3)
    },
    h2: {
      fontSize: 16,
      fontWeight: 600,
      color: theme.palette.text.primary,
      textTransform:'capitalize'
    },
    body1: {
      fontSize: 14,
      fontWeight: 500,
      color: theme.palette.text.secondary
    },
    body2: {
      fontSize: 14,
      color: theme.palette.text.secondary
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiStack: {
      defaultProps: {
        direction: 'row'
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 5
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: theme.spacing(3)
        }
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip:{
          fontSize:12,
          fontWeight:400
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          'span': {
            color:'inherit'
          }
        }
      }
    },
    MuiTypography: {
      variants: [
        {
          props: {variant: 'body3'},
          style: {
            fontSize: 13,
            color: theme.palette.text.disabled
          }
        }
      ]
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: 'unset'
        },
        contained: {
          fontWeight:400
        }
      }
    },
    MuiButtonBase:{
      styleOverrides: {
        root: {
          '&': {textTransform:'capitalize'}
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        inputProps: {
          autoComplete: 'new-password',
          required: false
        }
      },
      styleOverrides: {
        root:{
          'label.Mui-disabled, label.Mui-disabled *': {
            color: theme.palette.text.disabled
          }
        }
      }
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        openOnFocus: true, 
        autoHighlight: true,
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height:5,
          borderRadius:'10px 10px 0 0',
          bottom:-2
        }
      }
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '.MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader, .MuiDataGrid-cell, .MuiDataGrid-columnHeader:hover, .MuiDataGrid-cell:hover': {outline:'unset !important'}
        },
        columnHeaderTitle:{
          color: theme.palette.text.dark,
          fontWeight: 600
        },
        iconButtonContainer: {
          marginLeft: theme.spacing(1)
        }
      }
    }
  }
})


theme.shadows[4] = '0 2px 5px rgb(0 0 0 / 7%)'
theme.shadows[5] = '4px 4px 8px rgba(0, 0, 0, 0.09)'



declare module '@mui/material/styles' {
  interface CommonColors {
    body: React.CSSProperties['color']
  }
  interface TypeText{
    dark: React.CSSProperties['color']
  }
}


declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}


export default theme