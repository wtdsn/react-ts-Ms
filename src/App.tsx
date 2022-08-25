import Router from './Router/index'
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Router />
      </HashRouter>
    </div>
  );
}

export default App;
