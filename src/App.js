/** @format */

import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import IndexPage from "./components/IndexPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<IndexPage></IndexPage>}></Route>
				<Route path="/login" element={<Login></Login>}></Route>
				<Route path="/register" element={<Register></Register>}></Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
