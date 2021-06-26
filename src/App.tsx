import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './Pages/Home'; 
import { NewRoom } from './Pages/NewRoom';
import { Room } from './Pages/Room';
import { AdminRoom } from './Pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext';
import { NotFoundPage } from './Pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>                                      {/* Rotas -> engloba todas as rotas para gerenciá-las */}
      <AuthContextProvider>                              {/* Context -> engloba os elementos que vão usar esse Context */}        
        <Switch>                                         {/* Inoede que mais de uma rota seja acessada simultaneamente */}
          <Route path="/" exact component={Home} />                 {/* Rotas */}
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/notfound" component={NotFoundPage} />
          
          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
