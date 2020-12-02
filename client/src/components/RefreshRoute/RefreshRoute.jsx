import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RefreshRoute = ({ component: Component, socket, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      socket ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => ({
  socket: state.socket,
});

export default connect(mapStateToProps)(RefreshRoute);
