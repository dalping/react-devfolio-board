import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './Components/views/MainPage/MainPage';
import PostPage from './Components/views/PostPage/PostPage';
import UpdatePostPage from './Components/views/UpdatePostPage/UpdatePostPage';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={PostPage} />
          <Route exact path="/post/:id" component={PostPage} />
          <Route exact path="/post/update/:id" component={UpdatePostPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
