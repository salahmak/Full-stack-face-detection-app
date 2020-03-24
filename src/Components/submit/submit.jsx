import React from 'react';

class Submit extends React.Component {
    render() {
        const { state, content, onClick } = this.props

        if (state === "button") {
            return (
                <div
                    className="btn btn-light border-1 border-dark"
                    onClick={onClick}
                > {content}
                </div>
            )
        } else {
            return (


                <div className="btn btn-light border-1 border-dark">
                    <i className="mdi mdi-loading mdi-spin" aria-hidden="true"></i> Loading
                </div>

            )
        }

    }
}


export default Submit;