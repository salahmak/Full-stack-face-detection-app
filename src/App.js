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



const params = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }

}

const initialState = {
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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }


  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
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

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://nameless-shelf-05479.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://nameless-shelf-05479.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calcFaceLocation(response))
      })
      .catch(err => console.log(err));
  }



  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }


  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <>
        <Particles className="particles" params={params} />



        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />

        {route === 'home'
          ? <>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <LinkForm inputChange={this.onInputChange} onSubmit={this.onSubmit} />
            <ImageBox box={box} imageSrc={imageUrl} />
          </>

          : (
            route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              : <SignUp loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )

        }



      </>
    );
  }
}

export default App;