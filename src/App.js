import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Components/views/MainPage/MainPage';
import Top from './Components/views/Top/Top';
import PostPage from './Components/views/PostPage/PostPage';
import UpdatePostPage from './Components/views/UpdatePostPage/UpdatePostPage';
import InsertPostPage from './Components/views/InsertPostPage/InsertPostPage';
import NotFound from './Components/Error/NotFound';
import SearchPage from './Components/views/SearchPage/SearchPage';

const App = () => {
  return (
    <BrowserRouter>
      <Top />
      <div>
        <Switch>
          <Route path="/post/:id" component={PostPage} />
          <Route path="/update/:id" component={UpdatePostPage} />
          <Route path="/insert" component={InsertPostPage} />
          <Route path="/search" component={SearchPage} />
          <Route exact path="/" component={MainPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
