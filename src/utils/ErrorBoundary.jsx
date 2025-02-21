/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // This lifecycle method is triggered when an error is thrown in a child component.
    // It should return an object that will be merged into the current state.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    // console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // If the state indicates an error, render a fallback UI
      return <h1>Something went wrong.</h1>;
    }

    // Otherwise, render the children
    return this.props.children; 
  }
}


ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ErrorBoundary;