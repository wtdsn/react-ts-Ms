import Router from './Router/index'
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App" style={
      {
        width: '100vw',
        height: '100vh'
      }
    }>
      <HashRouter>
        <Router />
      </HashRouter>
    </div >
  );
}

export default App;
