import "./App.css";
import Collaborator from "./components/dashboard/collaborator/Collaborator";
import Router from "./Router/Router";
import { Provider } from 'react-redux'
import Store from "../src/store/Store"

function App() {
  return (
    <Provider store={Store}>
    <div className="App">
      <Router />
      {/* <Collaborator/> */}
    </div>
    </Provider>
  );
}

export default App;
