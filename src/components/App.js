import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/ViewLogin';
import ResetCss from '../contexts/resetCss';
import GlobaStyle from '../contexts/globaStyle';

function App() {
  return (
    <>
      <ResetCss />
      <GlobaStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
