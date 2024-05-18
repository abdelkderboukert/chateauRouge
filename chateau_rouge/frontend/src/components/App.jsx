import "../static/css/App.css";
import Homepage from "./homePage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const query = new QueryClient({});
  return (
    <QueryClientProvider client={query}>
      <Homepage />
    </QueryClientProvider>
  );
}

export default App;
