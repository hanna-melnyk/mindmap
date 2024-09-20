import {Routes, Route} from 'react-router-dom';
import {MainPage} from './pages/MainPage.jsx';
import {Mindmap} from "./pages/Mindmap.jsx";

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path={"/"} element={<MainPage/>} />
        <Route path="/mindmaps/new" element={<Mindmap />} />
        <Route path="/mindmaps/:id" element={<Mindmap />} />
    </Routes>
  );
};