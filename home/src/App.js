import React from 'react'
import Axios from 'axios'
Axios.defaults.headers.common["token"] = localStorage.getItem("token");
class App extends React.Component {
	render() {
		return (
			<div>
				{ this.props.children }
			</div>
		)
	}
}
export default App