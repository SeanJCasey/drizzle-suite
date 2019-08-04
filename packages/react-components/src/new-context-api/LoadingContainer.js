import React, { Children, Component } from "react";
import PropTypes from "prop-types";

/*
 * Create component.
 */

class LoadingContainer extends Component {
  render() {
    if (this.props.drizzleState) {
      if (this.props.drizzleState.web3.status === "failed") {
        if (this.props.errorComp) {
          return this.props.errorComp;
        }

        return (
          <main className="container loading-screen">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <h1>⚠️</h1>
                <p>
                  This browser has no connection to the Ethereum network. Please
                  use the Chrome/FireFox extension MetaMask, or dedicated
                  Ethereum browsers Mist or Parity.
                </p>
              </div>
            </div>
          </main>
        );
      }

      if (this.props.drizzleState.web3.networkMismatch) {
        if (this.props.networkMismatchComp) {
          return this.props.networkMismatchComp;
        }

        return (
          <main className="container network-warning">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <h1>⚠️</h1>
                <p>This dapp does not support this network.</p>
              </div>
            </div>
          </main>
        );
      }

      if (
        this.props.drizzleState.web3.status === "initialized" &&
        Object.keys(this.props.drizzleState.accounts).length === 0
      ) {
        return (
          <main className="container loading-screen">
            <div className="pure-g">
              <div className="pure-u-1-1">
                <h1>🦊</h1>
                <p>
                  <strong>{"We can't find any Ethereum accounts!"}</strong>{" "}
                  Please check and make sure Metamask or your browser are
                  pointed at the correct network and your account is unlocked.
                </p>
              </div>
            </div>
          </main>
        );
      }

      if (this.props.drizzleState.drizzleStatus.initialized) {
        return Children.only(this.props.children);
      }
    }

    if (this.props.loadingComp) {
      return this.props.loadingComp;
    }

    return (
      <main className="container loading-screen">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>⚙️</h1>
            <p>Loading dapp...</p>
          </div>
        </div>
      </main>
    );
  }
}

LoadingContainer.propTypes = {
  drizzleState: PropTypes.object,
  children: PropTypes.node,
  loadingComp: PropTypes.node,
  errorComp: PropTypes.node,
  networkMismatchComp: PropTypes.node,
};

export default LoadingContainer;
