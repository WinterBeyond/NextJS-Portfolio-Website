"use client";

import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryProps = {
  fallback?: ReactNode;
  children: ReactNode;
};

type ErrorBoundaryState = {
  error?: Error;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState,
  never
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error({ error, errorInfo });
  }

  render() {
    if (this.state.error) return this.props.fallback;
    return this.props.children;
  }
}
