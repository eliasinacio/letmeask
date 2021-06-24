import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './Pages/Home'; 
import { NewRoom } from './Pages/NewRoom';
import { Room } from './Pages/Room';

import { AuthContextProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter> 
    {/* Rotas -> engloba todas as rotas para gerenciá-las */}
      
      <AuthContextProvider> 
        {/* Context -> engloba os elementos que vão usar esse Context */}
        
        <Switch> 
          {/* Inoede que mais de uma rota seja acessada simultaneamente */}
          
          {/* Rotas */}
          <Route path="/" exact component={Home} /> 
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
