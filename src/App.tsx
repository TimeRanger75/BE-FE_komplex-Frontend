import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



interface State{
  CDrives:CDrive[];
  regName:string;
  regSize:number;
  regPrice:number;
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
      regName:'',
      regSize:0,
      regPrice:0
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


  registerHandler=async()=>{
    const{regName, regSize,regPrice}=this.state;
    if(0>regSize || 0>regPrice){
      
    }

    const data={
      nev:regName,
      meret:regSize,
      ar:regPrice
    };

    let response=await fetch('http://localhost:3000/api/tarhely',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    });

    this.setState({
      regName:'',
      regSize:0,
      regPrice:0
    })
    await this.loadCDrives();
  };

  render(){
    const{regName, regSize,regPrice}=this.state;

     return <div>
          <div style={{marginBottom:10}}>
            <h1>Új tárhely hozzáadása</h1>
            Tárhely neve: <br /> <input type="text" value={regName} onChange={e=>this.setState({regName:e.currentTarget.value})} required/> <br />
            Mérete: <br /> <input type="number" value={regSize} onChange={e=>this.setState({regSize:parseInt(e.currentTarget.value)})} required/> <br />
            Ára: <br /> <input type="number" value={regPrice} onChange={e=>this.setState({regPrice:parseInt(e.currentTarget.value)})} required/> <br />
            <button onClick={this.registerHandler} className="btn btn-primary" style={{marginBottom:10, marginTop:10}}>Felvesz</button>
          </div>
      <h1>Felhő tárhelyek</h1>
      <div className='container'>
        <div className='row'>
        {
          this.state.CDrives.map(CDrive=><div className='col-12 col-sm-4'><h2>{CDrive.nev}<ul><li>Méret: {CDrive.meret}GB</li><li>Ár: {CDrive.ar}Ft/hó</li></ul></h2></div> )
        }
      </div>
      </div>
     </div>
  }
  
}

export default App;
