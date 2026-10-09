import React from "react";

export default class ErrorBoundary extends React.Component<React.PropsWithChildren & { fallback?: React.ReactNode }, { hasError: boolean }> {
    constructor(props: { children?: React.ReactNode | undefined; }) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(_error: unknown) {
        return {hasError: true};
    }

    componentDidCatch(error: unknown, errInfo: React.ErrorInfo) {
        console.error("ErrorBoundary caught an error", error, errInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}