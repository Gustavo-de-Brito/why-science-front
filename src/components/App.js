import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/ViewLogin';
import SignUp from './SignUp/ViewSignUp';
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
          <Route path='/sign-up' element={ <SignUp /> } />
          <Route path='/last-questions' element={ <LastQuestions /> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
