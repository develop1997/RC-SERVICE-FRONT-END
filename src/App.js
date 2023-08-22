/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import IndexPage from "./components/IndexPage";
import { AdminAddResource } from "./components/pages/admin/AdminAddResource";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<IndexPage></IndexPage>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/register" element={<Register></Register>}></Route>
				<Route
					path="/add/:resource"
					element={<AdminAddResource></AdminAddResource>}></Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
