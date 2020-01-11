import React         from 'react';
import { Route,
         Switch }    from 'react-router-dom';
import Home          from '@/home/Home';

const routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  )
}

export default routes;
