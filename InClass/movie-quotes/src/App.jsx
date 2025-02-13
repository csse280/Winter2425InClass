import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import MovieQuotesListPage from "./MovieQuotesListPage";
import MovieQuoteDetailPage from "./MovieQuoteDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieQuotesListPage />} />
        <Route path="/quote/:id" element={<MovieQuoteDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
