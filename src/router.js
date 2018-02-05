import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';
import ArtistMain from './components/artists/ArtistMain';

/*
  IMPORTANTE:
  No generar una funcion que ayude a hacer el código siguiente
  mas corto, es decir un helper y ayudar a que el código sea
  mas legible, esto NO se debe hacer porque Webpack lee el codigo
  de forma estatica linea por linea buscando System.import's y
  no puede usar concatenacion o interpolacion (plantillas de cadenas)
  para hacer uso del code splitting, dejarlo asi.

  Tambien recomienda usarlo solo en caso de que tengamos muchas rutas,
  y obviamente en caso de que esas rutas no sean consultadas frecuentemente
  y que por lo tanto no se requeiran siempre con cada ingreso a la aplicación.

  Otro detalle, dejar solamente en el import la principal o los componentes
  mas utilizados, como el login por ejemplo o la pagina inicial.
*/
const componentRoutes = {
  component: Home,
  path: '/',
  indexRoute: { component: ArtistMain },
  childRoutes:[
    {
      path: 'artists/new',
      getComponent(location, cb){
        System.import('./components/artists/ArtistCreate')
        .then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id',
      getComponent(location, cb){
        System.import('./components/artists/ArtistDetail')
        .then(module => cb(null, module.default));
      }
    },
    {
      path: 'artists/:id/edit',
      getComponent(location, cb){
        System.import('./components/artists/ArtistEdit')
        .then(module => cb(null, module.default));
      }
    }
  ]
};

const Routes = () => {
  return (
    <Router history={hashHistory} routes={componentRoutes}/>
  );
};

export default Routes;
