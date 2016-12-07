import React, { Component, PropTypes } from "react";

import { Provider } from "react-redux";
import configureStore, { subscribe, setupRemote } from "../store";

import Controller from "../utils/controller";

const store = configureStore();

export default class Spectacle extends Component {
  static propTypes = {
    children: PropTypes.node,
    history: PropTypes.object,
    remote: PropTypes.object,
    theme: PropTypes.object
  };

  componentWillMount() {
    const { remote } = this.props;

    if (remote) {
      subscribe(remote);
      setupRemote(remote);
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Controller theme={this.props.theme} store={store} history={this.props.history}>
          {this.props.children}
        </Controller>
      </Provider>
    );
  }
}
