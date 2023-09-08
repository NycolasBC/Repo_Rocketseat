import { ThemeProvider } from "styled-components";
import { TransactionsProvider } from "./Contexts/TransactionsContext";
import { Transactions } from "./Pages/Transactions";
import { GlobalStyle } from "./Styles/global";
import { defaultTheme } from "./Styles/Themes/default";


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />

      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>

    </ThemeProvider>
  )
}
