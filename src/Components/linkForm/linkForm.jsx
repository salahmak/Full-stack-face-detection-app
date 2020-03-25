import React from 'react';

const LinkForm = ({ inputChange, onSubmit }) => {

    return (
        <div>
            <p className="f4 tc white">
                {'Detect faces in your images using this bot :)'}
            </p>

            <div className="center">
                <input placeHolder="Paste your image link here then click go" onChange={inputChange} className="f4 pa2 w-50" type="text" />
                <button onClick={onSubmit} id="image-btn" className="w-15 br1 grow f4 ph4 pv2 dib white bg-light-purple" disabled> {'Go'} </button>
            </div>

        </div>
    )
}

export default LinkForm