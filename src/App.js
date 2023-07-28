import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import MainLayout from "./Layouts/MainLayour";
import List from "./Pages/List";

function App() {
  return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route	to="/" element={<MainLayout/>}>
						<Route index element={<List/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
  	);
}

export default App;
