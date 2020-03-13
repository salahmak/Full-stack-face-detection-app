import React, { Component } from 'react';


class Rank extends Component {

    render() {
        const { name, entries } = this.props
        return (
            <div className="pa2">
                <p className="tc f4 white">
                    Hi {name} Your entries are: {entries} !
                </p>
            </div>
        );
    }
}

export default Rank;