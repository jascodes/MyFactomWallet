import React, { Component } from "react";
import logo from "./headerLogo.png";
import styled from "styled-components";
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import factomUtil from "factomjs-util/dist/factomjs-util";
import factomD from "factomdjs/dist/factomd";

class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 25,
      active: false,
    };
  }

  render() {
    const amount = this.state.amount;
    const amountStyle = {
      fontSize:'35px'
    };
    return (
      <div className={this.props.className} onClick={this.props.onClick}>
        My Wallet #{this.props.id}
        <br/><br/>
        <span style={amountStyle}>${amount}</span>
        <br/><br/>
        1,000,000,000 FCT
      </div>
    );
  }
}

function SendPage(props){

  function handleSendClick() {
    console.log('Send Handled');
  }

  function handleReceiveClick() {
    console.log('Receive Handled');
  }

  function handleBackupClick() {
    console.log('Backup Handled');
  }

  const walletID = props.match.params.walletID;
  return (
    <div>
      <MainSendHeader>
        <input onClick={handleSendClick} type="button" value="Send Factoid"/>
        <input onClick={handleReceiveClick} type="button" value="Receive Factoid" />
        <input onClick={handleBackupClick} type="button" value="Backup Wallet" />

      </MainSendHeader>
      <SendButton onClick={() => alert('Sent!')}>Send Funds</SendButton>
    </div>
  );
}



function Header(props){
  return(
    <div className={props.className}>
      <Logo src={logo} alt="logo" />
      <Title>My Factom Wallet</Title>
      <Help href="#">
        Help
      </Help>
    </div>
  );
}

class SidebarWallets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeWallet: 0,
    };
  }

  render() {
    const activeWallet = this.state.activeWallet;
    const sideBarO = this;
    const listWallets = this.props.wallets.map(function(item, index){
    if (activeWallet === index){
      return <Link key={index} to={"/wallet/send/" + item}><WalletSmall onClick={() => {sideBarO.handleClick(index)}} active id={item}/></Link>
    } else{
      return <Link key={index} to={"/wallet/send/" + item}><WalletSmall onClick={() => {sideBarO.handleClick(index)}} id={item}/></Link>
    }
    });
    return (
      <span className={this.props.className}>
        {listWallets}
      </span>
    );
  }

  handleClick = (index) => {
    this.setState({
      activeWallet: index,
    });
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {wallets: [1, 2]}
  }

  render() {
    return (
      <Router>
        <div>
          <StyledHeader/>
          <MainBody>
            <StyledSidebarWallets wallets={this.state.wallets}/>
            <Switch>
              <Route exact path="/" component={SendPage}/>
              <Route exact path="/wallet/send/:walletID" component={SendPage}/>
            </Switch>
          </MainBody>
        </div>
      </Router>
    );
  }
}

const StyledHeader = styled(Header)`
  text-align: left;
  padding-left: 81px;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  background-color: #001830;
  height: 90px;
  position:relative;
`;

const MainBody = styled.div`
  background-image: linear-gradient(to bottom, #002347, #001830);
  height: 939px;
  overflow: auto;
`;

const StyledSidebarWallets = styled(SidebarWallets)`
    float:left;
`;

const WalletSmall = styled(Wallet)`
    width: 343px;
    height: 150px;
    border-radius: 6px;
    background-color: #103151;
    box-shadow: 0 2px 13px 0 rgba(0, 9, 28, 0.5);
    margin-left:81px;
    color: #ffffff;
    padding-left: 19px;
    padding-top: 17px;
    font-size: 16px;
    text-align: left;
    position: relative;
    margin-Top: 43px;

    ${props => props.active ?
      'background-image: linear-gradient(to bottom, #06c7ff, #0372ff); box-shadow: 0 0 10px 0 #007eff;' :
      ''};
`;

const SendButton = styled.button`
  color: #ffffff;
  width: 730px;
  height: 60px;
  border-radius: 6px;
  background-image: linear-gradient(to bottom, #ffa539, #ff8600);
  margin-left:500px;
  margin-top:16px;
  font-size: 20px;
  font-weight: bold;
`;

const Logo = styled.img`
  margin-top: 30px;
  margin-right: 13px;
  width: 39.1px;
  height: 31.4px;
`;

const Title = styled.div`
  display: inline-block;
  padding-top: 35px;
  margin-right:1px;
`;

const Help = styled.a`
  position: absolute;
  right: 51px;
  bottom: 30px;
  font-size: 18px;
  text-align: left;
  color: #ffffff;
  text-decoration: none;
`;

const MainSendHeader = styled.div`
  width: 730px;
  height: 626px;
  border-radius: 6px;
  box-shadow: 0 2px 13px 0 rgba(0, 16, 53, 0.5);
  margin-top:44px;
  margin-left:500px;
  background-color: #eef1f4;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.4px;
  padding-top:10px;
`;

export default App;
