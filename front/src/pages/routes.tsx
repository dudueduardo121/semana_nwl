import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import TheacherList from './TheacherList';
import TheacherForm from './TheacherForm';

function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" component={Landing} exact/>
            <Route path="/study" component={TheacherList} />
            <Route path="/give-classes" component={TheacherForm} />
        </BrowserRouter>
    );
}

export default Routes;