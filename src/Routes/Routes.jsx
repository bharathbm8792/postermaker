import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
// import MainPage from '../components/MainPage/DashBoard.jsx'
// import CreatePoster from '../components/CreatePoster/PosterInputs.jsx';
// import PosterGenerator from "../components/PosterGenerator/PosterGenerator.jsx";

const MainPage = lazy(() => import('../components/MainPage/DashBoard.jsx'));
const CreatePoster = lazy(() => import('../components/CreatePoster/PosterInputs.jsx'));
const PosterGenerator = lazy(() => import('../components/PosterGenerator/PosterGenerator.jsx'));

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} >
                <Route path="/createposter" element={<CreatePoster />} />
                <Route path="/generateposter" element={<PosterGenerator />} />
                {/* <Route path="/login" element={<Login />} />
            <Route path="/user/*" element={<PrivateRoutes />}>
                to add private routes after login
                <Route path="*" element={<NotFound />} />
            </Route> */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

function NotFound() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    }, [navigate]);

    return null;
}

export default AppRoutes