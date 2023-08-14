import { Plus_Jakarta_Sans } from 'next/font/google'
import { useTheme } from '@mui/material'
import { CssVariablesProps } from './CssVariables.interface'
const font = Plus_Jakarta_Sans({ subsets: ['latin'] })



export default function CssVariables(props: CssVariablesProps) {
  const theme = useTheme()
  
  return <>
    <style jsx global>
      {`
        :root{
          --palette-primary-main: ${theme.palette.primary.main};
          --palette-primary-dark: ${theme.palette.primary.dark};
          --palette-primary-light: ${theme.palette.primary.light};

          --palette-secondary-main: ${theme.palette.secondary.main};
          --palette-secondary-dark: ${theme.palette.secondary.dark};
          --palette-secondary-light: ${theme.palette.secondary.light};

          --palette-text-primary: ${theme.palette.text.primary};
          --palette-text-secondary: ${theme.palette.text.secondary};
          --palette-text-disabled: ${theme.palette.text.disabled};

          --font-family: ${font.style.fontFamily};
          --border-radius: ${theme.shape.borderRadius}px;
        }
      `}
    </style>
  </>
}
