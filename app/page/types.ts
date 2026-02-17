/**
 * Type definitions for HomePage component
 * Following Interface Segregation Principle - separate interfaces for different concerns
 */

export interface HomePageProps {
  // No props needed currently - prepared for future extensibility
}

export interface LoadingStateProps {
  message?: string;
}

export interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}
