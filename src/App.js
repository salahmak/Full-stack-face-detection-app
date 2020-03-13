import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import LinkForm from './Components/linkForm/linkForm.jsx'
import Navigation from './Components/navigation/navigation.jsx'
import SignIn from './Components/signin/signin.jsx'
import SignUp from './Components/signup/signup.jsx'
import Rank from './Components/rank/rank.jsx'
import Particles from 'react-particles-js'
import ImageBox from './Components/imageBox/imageBox.jsx'
const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '2b4d0077c2604e8da9b723bd8922658d'
});

const params = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }

}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signup',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }


  loadUser = (user) => {
    this.setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }




  calcFaceLocation = (data) => {
    console.log(data)
    const faceData = data.outputs[0].data.regions
    const boxes = faceData.map((e, i) => {
      return faceData[i].region_info.bounding_box;
    })
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height)

    return boxes.map((e, i) => {
      return {
        top: boxes[i].top_row * height,
        left: boxes[i].left_col * width,
        right: width - (boxes[i].right_col * width),
        bottom: height - (boxes[i].bottom_row * height)
      }


    })


  }

  displayFaceBox = (box) => {
    this.setState({ box: box })
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value })
  }

  onSubmit = (e) => {
    console.log('clicked');
    this.setState({ imageUrl: this.state.input })
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch("https://abalone-darkened-celsius.glitch.me/image", {
            method: 'put',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
        }


        this.displayFaceBox(this.calcFaceLocation(response))
      })
      .catch(err => console.log(err))
  }


  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })

  }


  render() {
    return (
      <>
        <Particles className="particles" params={params} />



        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />

        {this.state.route === 'home'
          ? <>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <LinkForm inputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <ImageBox box={this.state.box} imageSrc={this.state.imageUrl} />
          </>

          : (
            this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )

        }



      </>
    );
  }
}

export default App;