import React from 'react'
class Exit extends React.Component {
    clearLocal = () => {
        localStorage.clear()
    }
    render() {
        return (
            <div>
                {this.clearLocal()}
                {this.props.history.push("/login")}
            </div>
        )
    }
}

export default Exit