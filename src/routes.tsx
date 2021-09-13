import { BrowserRouter, Route } from 'react-router-dom'

import { AlunoList } from './pages/AlunoList';
import { AlunoForm } from './pages/AlunoForm';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={AlunoList} path='/' exact/>
      <Route component={AlunoForm} path='/form' exact/>
      <Route component={AlunoForm} path='/form/:id' exact/>
    </BrowserRouter>
  )
}