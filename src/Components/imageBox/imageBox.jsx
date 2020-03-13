import React from 'react';
import './imagebox.css'
const ImageBox = ({ box, imageSrc }) => {


    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputImage" className="tc center" width="800px" height="auto" src={imageSrc} alt='' />


                {
                    box.map((e, i) => {
                        return (
                            <div key={i} style={{ top: box[i].top, left: box[i].left, right: box[i].right, bottom: box[i].bottom }} className="face-box"></div>
                        )
                    })
                }


            </div>

        </div>
    );

}

export default ImageBox;