import React from 'react';
import './form.css';

const LinkForm = ({ inputChange, onSubmit }) => {

    return (
        <div>
            <p className="f4 tc white">
                {'Detect faces in your images using this bot :)'}
            </p>

            <div className="center">
                <input placeHolder="Paste your image link here then click Go" onChange={inputChange} className="link-form f6 pa2" type="text" />
                <button onClick={onSubmit} id="image-btn" className="w-15 br1 grow f4 ph4 pv2 dib white bg-light-purple"> {'Go'} </button>
            </div>

        </div>
    )
}

export default LinkForm
