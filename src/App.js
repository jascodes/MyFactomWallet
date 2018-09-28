import React, { Component } from 'react';
import LandingPage from './LandingPage/LandingPage.js';
import Header from './Header/Header.js';
import WalletManager from './WalletManager/WalletManager.js';
import Help from './Help/Help.js';
import Vote from './Vote/Listing/VoteListing.js';
import ViewVote from './Vote/View/ViewVote.js';
import CreateVoteStepper from './Vote/Create/CreateVoteStepper.js';
import ManageVoterList from './Vote/VoterList/ManageVoterList.js';
import { HashRouter as Router, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRootTheme from './withRootTheme';
import fctUtils from 'factomjs-util/dist/factomjs-util';
import WalletController from './WalletController.js';

const {
	isValidFctPublicAddress,
	//	FactomCli,
} = require('factom/dist/factom-struct');
const { FactomCli } = require('factom/dist/factom');

function FactomWallet(id, publicAddress, balance) {
	if (!publicAddress) {
		const privateKey = fctUtils.randomPrivateKey();

		publicAddress = fctUtils.publicFactoidKeyToHumanAddress(
			fctUtils.privateKeyToPublicKey(privateKey)
		);
	}

	this.id = id;
	this.public_address = publicAddress;
	this.balance = balance ? balance : '?';
}

class App extends Component {
	state = {
		activeWalletID: 1,
		factomWallets: [
			new FactomWallet(1, undefined, 5000),
			new FactomWallet(2, undefined, 500),
			new FactomWallet(3, undefined, 5),
		],
	};

	async componentDidMount() {
		const cli = new FactomCli({
			host: 'localhost',
			port: 3000,
			path: '/v2', // Path to V2 API. Default to /v2
			debugPath: '/debug', // Path to debug API. Default to /debug
			protocol: 'http', // http or https. Default to http
			rejectUnauthorized: true, // Set to false to allow connection to a node with a self-signed certificate
			retry: {
				retries: 4,
				factor: 2,
				minTimeout: 500,
				maxTimeout: 2000,
			},
		});

		//console.log(
		//isValidFctPublicAddress(
		//	'FA3FCjUbH3qSiaB4JAF3Dpsa8JVCsXwhfMrnyWJMqNe2LrEfDBoi'
		//)
		//);
		//console.log(cli.call('get head'));

		//const response = await cli.getHeights();
		//const response = await cli.chainExists(
		//	'df3ade9eec4b08d5379cc64270c30ea7315d8a8a1a69efe2b98a60ecdd69e604'
		//);
		//console.log(response);

		//const db = await cli.getDirectoryBlock(
		//	'f55a19d9562843b642f1a20b34fcbb71e70f438c4d98d223fc2228ca2dd0c54a'
		//);
		//const json = await db.json();
		//console.log(json);
	}

	render() {
		const { classes } = this.props;

		return (
			<Router>
				<div>
					<Header />
					<WalletController>
						{(walletSnapshot) => (
							<div className={classes.body}>
								<Route
									exact
									path="/"
									render={() => <LandingPage addWallet={this.addWallet} />}
								/>
								<Route
									path="/wallet/manage/"
									render={() => (
										<WalletManager
											addWallet={this.addWallet}
											selectWallet={this.selectWallet}
											wallets={this.state.factomWallets}
											activeWalletID={this.state.activeWalletID}
											addFactoidWallet={walletSnapshot.addFactoidWallet}
											addECWallet={walletSnapshot.addECWallet}
											factoidWallets={walletSnapshot.factoidWallets}
											ecWallets={walletSnapshot.ecWallets}
										/>
									)}
								/>
								<Route exact path="/vote" component={Vote} />
								<Route exact path="/viewVote" component={ViewVote} />
								<Route exact path="/createVote" component={CreateVoteStepper} />
								<Route exact path="/manageVoters" component={ManageVoterList} />
								<Route exact path="/help" component={Help} />
							</div>
						)}
					</WalletController>
				</div>
			</Router>
		);
	}

	addWallet = (publicAddress) => {
		this.setState((prevState) => ({
			factomWallets: prevState.factomWallets.concat(
				new FactomWallet(
					prevState.factomWallets.length + 1,
					publicAddress,
					undefined
				)
			),
			activeWalletID: prevState.factomWallets.length + 1,
		}));
	};

	selectWallet = (walletID) => {
		this.setState((prevState) => ({
			activeWalletID: walletID,
		}));
	};
}
App.propTypes = {
	classes: PropTypes.object.isRequired,
};

const styles = (theme) => ({
	body: {
		width: '1200px',
		margin: '0 auto',
	},
});

export default withRootTheme(withStyles(styles)(App));
