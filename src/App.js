import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {Provider} from "react-redux";
import {store} from "./redux";

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
            </Routes>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
