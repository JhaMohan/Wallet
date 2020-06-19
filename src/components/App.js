import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import Web3 from 'web3';
import DaiTokenMock from '../abis/DaiTokenMock.json'

class App extends Component {
 
 async componentWillMount(){
    await this.loadWeb3();
    await this.loadBlockcchainData();
  }

  async loadWeb3() {

    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  
  }

  async loadBlockcchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({account: accounts[0]})
    console.log(this.state.account)
    const networkId = await web3.eth.getId();
    console.log(networkId)
    const daiTokenAddress = DaiTokenMock.networks[networkId].address

    const daiTokenContract = await web3.eth.Contract(DaiTokenMock.abi,daiTokenAddress)
    this.setState({daiTokenContract: daiTokenContract})
    const balance = await daiTokenContract.methods.balanceOf(this.state.account).call()
    console.log(this.state.daiTokenContract)
    this.setState({balance:web3.utils.fromWei(balance.toString(),'ether')})
    console.log(this.state.balance)
    const transaction = await daiTokenContract.getPastEvents('Transfer',{fromBlock:0 ,toBlock:'latest',filter:{from: this.state.account}})
    console.log(transaction)
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      daiTokenContract: null,
      balance: 0,
      transactions: []
    }
  }




  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Dapp University
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
