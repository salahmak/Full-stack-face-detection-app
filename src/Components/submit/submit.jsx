import React from 'react';
import './submit.css';
class Submit extends React.Component {
    enterKey(e) {
        if (e.keyCode === 13) {
            e.target.click()
        }
    }
    render() {
        const { state, content, onClick, tabIndex } = this.props



        if (state === "button") {

            return (
                <div
                    className="btn btn-light border-1 border-dark"
                    tabIndex={tabIndex}
                    id="submit-btn"
                    onClick={onClick}
                    onKeyUp={this.enterKey}
                > {content}
                </div>

            )

        } else {
            return (


                <div className="btn btn-light border-1 border-dark button-wrap">
                    <div className="loader"></div>
                    <span>Loading</span>
                </div>

            )
        }



    }
}


export default Submit;