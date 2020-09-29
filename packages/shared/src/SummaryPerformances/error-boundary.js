import React from 'react';

export class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.error(">>> For DEV ::: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1
        style={{
          display: "block",
          margin: "20px auto",
          color: "var(--n3)",
          fontSize: 20,
          fontWeight: 400,
          textAlign: "center",
        }}
      >The application has encountered an unknown error.</h1>;
    }
    return this.props.children;
  }
}

export default function withErrorBoundary(WrappedComponent) {
  const Final = props => (
    <ErrorBoundary>
      <WrappedComponent {...props}/>
    </ErrorBoundary>
  );
  return Final;
}
