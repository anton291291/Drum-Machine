import React, { Component } from 'react';
import './App.scss';
import 'animate.css/animate.min.css'

const audioData = [
  {
    keyCode: 81,
    keybordKey: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
   keyCode: 87,
   keybordKey: 'W',
   id: 'Chord-2',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
   keyCode: 69,
   keybordKey: 'E',
   id: 'Chord-3',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
   keyCode: 65,
   keybordKey: 'A',
   id: 'Shaker',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
   keyCode: 83,
   keybordKey: 'S',
   id: 'Open-HH',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
   keyCode: 68,
   keybordKey: 'D',
   id: 'Closed-HH',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
   keyCode: 90,
   keybordKey: 'Z',
   id: 'Punchy-Kick',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
   keyCode: 88,
   keybordKey: 'X',
   id: 'Side-Stick',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
   {
   keyCode: 67,
   keybordKey: 'C',
   id: 'Snare',
   url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
 }
]

const unactiveStyle= {
  backgroundColor: 'rgb(222, 203, 8)'
}


const activeStyle= {
  backgroundColor: 'rgb(22, 179, 158)'
}


class DrumButton extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      style: unactiveStyle
    }

    this.playSound = this.playSound.bind(this)
    this.handleKeyPress= this.handleKeyPress.bind(this)
    this.changeStyle= this.changeStyle.bind(this)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress)
  }

  changeStyle() {
    this.state.style == unactiveStyle ?
    this.setState({
      style: activeStyle
    }) :
    this.setState({
      style: unactiveStyle
    })
  }

  playSound(e) {
    const sound= document.getElementById(this.props.value)
    sound.currentTime= 0
    sound.play()
    this.props.updateDisplay(this.props.id)
    this.changeStyle()
    setTimeout(() => this.changeStyle(), 200)
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound()
    }
  }

  render () {
    return (
      <>
      <button
        style={this.state.style}
        className="drum-pad animated rollIn"
        id={this.props.id}
        onClick={this.playSound}
        >
        {this.props.value}
        <audio
          src={this.props.src}
          id={this.props.value}
          className="clip"
          >
        </audio>
      </button>
      </>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: ""
    }
    this.updateDisplay= this.updateDisplay.bind(this)
  }

  updateDisplay(id) {
    this.setState({
      text:id
    });
  }

  render() {
    let drumPad= audioData.map((clip) => {
      return (
        <DrumButton
          id={clip.id}
          value={clip.keybordKey}
          src={clip.url}
          keyCode={clip.keyCode}
          updateDisplay={this.updateDisplay}
        />
      );
      }
    )
    return (
      <div id="drum-machine">
        <div id="drum-board">
          {drumPad}
        </div>
        <div id="display">{this.state.text}</div>
      </div>
    )
  };
}

export default App;
