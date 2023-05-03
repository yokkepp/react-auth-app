import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Mypage from "./components/Mypage";
function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path={"/register/"} element={<Register />} />
					<Route path={"/login/"} element={<Login />} />
					<Route path={"/"} element={<Mypage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
