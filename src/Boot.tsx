/// <reference path="../typings/tsd.d.ts"/>
/// <reference path="./d.ts"/>
import 'es6-shim';
import * as React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, IndexRoute, Route, browserHistory} from 'react-router';

import {App, Activities, Github, JsFiddle} from './Main/Components';
import {activities, githubRepositories, githubGists, jsFiddles} from './Main/Reducers';
import {store, replaceReducers} from './Store';

//<Route getComponent{subContent(Component, {reducer1, reducer2})}/>
//const subContent = (Component, Reducers?) => (location, cb:(err, Component) => void) => {
//  if (Reducers) replaceReducers(Reducers);
//  cb(null, Component);
//}

function onUpdateHook(...args) {
  console.log('Boot.tsx..onUpdateHook()', args, this.state.location.key);
  console.log(this);
}

render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={onUpdateHook}>
      <Route path="/" component={App}>
        <IndexRoute component={Activities}/>
        <Route path="/github" component={Github}/>
        <Route path="/jsfiddle" component={JsFiddle}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
