import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/login";
import PrivateRoute from "./private-route";
import NotFound from "../components/not-found";
import WorkList from "../components/work-list";
import RecruitmentForm from "../components/recruitement-form";
import RecruitmentForm2 from "../components/recruitement-form2";

const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route exact path='/' element={<WorkList />} />
            <Route exact path='/forms/:mode' element={<RecruitmentForm />} />
            <Route exact path='/form2/:mode' element={<RecruitmentForm2 />} />
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
