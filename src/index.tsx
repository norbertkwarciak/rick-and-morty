import React             from 'react';
import ReactDOM          from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { StoreProvider } from './store';
import routes            from './routes';

const App: JSX.Element = ({routes}) => (
  <BrowserRouter>
    <div className="Main">
      {routes()}
    </div>
  </BrowserRouter>
)

ReactDOM.render(
  <StoreProvider>
    <App routes={routes} />
  </StoreProvider>,
  document.getElementById('app')
);
