import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard/Dashboard"
import LayoutPage from "./pages/components/Layout"
import User from "./pages/User/User"
import Category from "./pages/Category/Category"
import Content from "./pages/Content/Content"
import Error404 from "./pages/components/Error404/Error404"
import Signin from "./pages/Authentication/Signin/Signin"
import Signup from "./pages/Authentication/Signup/Signup"
import ForgotPassword from "./pages/Authentication/ForgotPassword/ForgotPassword"
import ChangePassword from "./pages/Authentication/ChangePassword/ChangePassword"
import Feedback from "./pages/Feedback/Feedback"
import WebInformation from "./pages/WebInformation/WebInformation"
import ContentPending from "./pages/Content/ContentPending/ContentPending"


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutPage />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/categories" element={<Category />} />
                    <Route path="/content-approved" element={<Content />} />
                    <Route path="/content-pending" element={<ContentPending />} />
                    <Route path="/feedback" element={<Feedback />} />
                    <Route path="/web-info" element={<WebInformation />} />
                    <Route path="*" element={<Error404 />} />
                </Route>
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/forgot-password-verify" element={<ChangePassword />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App