import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/ViewLogin';
import ResetCss from '../contexts/resetCss';
import GlobaStyle from '../contexts/globaStyle';
import LastQuestions from './LastQuestions/ViewLastQuestions';

function App() {
  return (
    <>
      <ResetCss />
      <GlobaStyle />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route paht='/last-questions' element={ <LastQuestions /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
