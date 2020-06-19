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
    const transactions = await daiTokenContract.getPastEvents('Transfer',{fromBlock:0 ,toBlock:'latest',filter:{from: this.state.account}})
    this.setState({transactions: transactions})
    console.log(transactions)
  }

  transfer(recipient,amount) {
    this.state.daiTokenContract.methods.transfer(recipient,amount).send({from:this.state.account})
  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      daiTokenContract: null,
      balance: 0,
      transactions: []
    }

    this.transfer = this.transfer.bind(this)
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
            Exchange Wallet
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto" style={{width: "500px"}}>
                <a>
                  <img src={logo} width="150" />
                </a>
    <h1>{this.state.balance} Token</h1>
                <form onSubmit ={(event)=>{
                    
                    event.preventDefault()
                    const recipient = this.recipient.value
                    const amount = window.web3.utils.toWei(this.amount.value,'Ether') 
                    this.transfer(recipient,amount)
                    


                  }}>
                   <div className="form-group mr-sm-2">
                     <input
                      id = "recipient"
                      type="text"
                      ref={(input)=>{this.recipient = input}}
                      className="form-control"
                      placeholder="Recipient Address"
                      required 
                      />
                     </div> 
                     <div className="form-group mr-sm-2">
                     <input
                      id = "amount"
                      type="text"
                      ref={(input)=>{this.amount = input}}
                      className="form-control"
                      placeholder="Amount"
                      required 
                      />
                     </div> 

                     <button type="submit" className="btn btn-primary btn-block">Send</button>
                 </form>

                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Recipient</th>
                        <th scope="col">Value</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                    {this.state.transactions.map((tx,index)=>{
                      console.log('tx',tx)
                      return(
                        <tr key={index}>
                          <td>{tx.returnValues.to}</td>
                          <td>{window.web3.utils.fromWei(tx.returnValues.value.toString(),'Ether')}</td>
                        </tr>
                      )
                    })}
                    </tbody>
                  </table>
              </div>
            </main>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
