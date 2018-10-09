import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter as Router, Switch} from 'react-router-dom';
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';
import BookAddPage from './pages/BookAdd';
import BookListPage from './pages/BookList';
import BookEditPage from './pages/BookEdit';
import LoginPage from './pages/Login';
import HomeLayout from './layouts/HomeLayout';
ReactDOM.render((
   <Router>  
   <div>
    <HomeLayout>
      <Switch>  
        <Route exact path="/" component={HomePage}/>
        <Route path="/user/add" component={UserAddPage}/>
        <Route path="/user/list" component={UserListPage}/>
        <Route path="/user/edit/:id" component={UserEditPage}/>
        <Route path="/book/add" component={BookAddPage}/>
        <Route path="/book/list" component={BookListPage}/>
        <Route path="/book/edit/:id" component={BookEditPage}/>
        <Route path="/login" component={LoginPage}/>
      </Switch> 
    </HomeLayout>  
            
    </div>
  </Router>  
), document.getElementById('app'));