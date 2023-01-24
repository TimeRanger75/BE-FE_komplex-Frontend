import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



interface State{
  CDrives:CDrive[];
}

interface CDrive{
  id: number
  nev: string;
  meret: number;
  ar: number;
}

interface CDRiveResponse{
  CDrives:CDrive[];
}



class App extends Component<{}, State>{
  constructor(props:{}){
    super(props)

    this.state={
      CDrives:[],
    }
  }

  async loadCDrives(){
    let response= await fetch('http://localhost:3000/api/tarhely');
    let data=await response.json() as CDRiveResponse;
    this.setState({
      CDrives:data.CDrives
    });
  }

  componentDidMount(){
      this.loadCDrives();
  }

  render(){
     return <div>
      <h1>Felhő tárhelyek</h1>
      <ul>
        {
          this.state.CDrives.map(CDrive=><li><h2>{CDrive.nev}<ul><li>Méret: {CDrive.meret}GB</li><li>Ár: {CDrive.ar}Ft/hó</li></ul></h2></li> )
        }
      </ul>
      
     </div>
  }
  
}

export default App;
