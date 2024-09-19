import {Routes, Route} from 'react-router-dom';
import {MainPage} from './pages/MainPage.jsx';

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path={"/"} element={<MainPage/>} />
    </Routes>
  );
};