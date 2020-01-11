import React             from 'react';
import ReactDOM          from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import routes            from './routes';

const App = ({routes}) => (
  <BrowserRouter>
    <div className="Main">
      {routes()}
    </div>
  </BrowserRouter>
)

ReactDOM.render(<App routes={routes} />, document.getElementById('app'));
