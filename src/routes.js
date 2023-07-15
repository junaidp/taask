import { Navigate, useRoutes } from 'react-router-dom';
import Layout from './Layout';
import UpcomingItems from "./pages/UpcomingItems";
import Portfolio from "./pages/Portfolio";
import Project from "./pages/Projects";
import Resources from "./pages/Resources";
import Reporting from "./pages/Reporting";
import Customer from "./pages/Customer";
import CustomerTasks from "./pages/CustomerTasks";
import Snapshots from "./pages/Snapshots";
import Integrations from "./pages/Integrations";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import CustomerDetail from './pages/CustomerDetail';
// layouts
// ----------------------------------------------------------------------
function AuthGuard({ children }) {
  // Check if the user has a valid token or authentication state
  const isAuthenticated = checkAuthentication(); // Implement your own authentication logic here

  // Redirect the user to the login page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Render the protected routes if authenticated
  return children;
}
function checkAuthentication(){
  const token = localStorage.getItem('token');
  return token?true:false;
}
export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <AuthGuard><Layout /></AuthGuard>,
      children: [
        { element: <Navigate to="/upcoming-tasks" />, index: true },
        { path: 'upcoming-tasks', element: <UpcomingItems /> },
        { path: 'customer', element: <Customer /> },
        { path: 'portfolio', element: <Portfolio /> },
        { path: 'customer/:cusId', element: <CustomerDetail /> },
        { path: 'customerTasks', element: <CustomerTasks /> },
        { path: 'project', element: <Project /> },
        { path: 'resources', element: <Resources /> },
        { path: 'snapshots', element: <Snapshots /> },
        { path: 'integrations', element: <Integrations /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      element: <Layout />,
      children: [
        { element: <Navigate to="/upcoming-tasks" />, index: true },
        // { path: '404', element: <Page404 /> },
        // { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
