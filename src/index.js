import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Routes from './router';
import '../style/materialize.css';
import '../style/react-range.css';
import '../style/style.css';

const App = () => {
  const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App);

if (module.hot) {
  console.log('client: index.js =>  hot reloading active for React');
  module.hot.accept(App, () => {
    render(App)
  })
}
