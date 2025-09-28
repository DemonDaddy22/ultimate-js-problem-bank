'use client';

import { Component, ErrorInfo } from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo): void => {
    // runs after changes are committed to the UI
    // can be used for logging/reporting
    console.log({ error, errorInfo });
  };

  static getDerivedStateFromError = () => {
    // runs before rendering
    // update the error flag in order to show fallback UI in next render
    return {
      hasError: true,
    };
  };

  render = () => {
    return this.state.hasError ? <h2>Something went wrong</h2> : this.props.children;
  };
}
