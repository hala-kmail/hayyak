import Link from 'next/link';
import { NotFoundContent } from './NotFound/components';
import { notFoundStyles } from './NotFound/styles';
import { NOT_FOUND_CONTENT } from './NotFound/constants';

/**
 * NotFound Component
 * Following SOLID Principles:
 * - Single Responsibility: Only orchestrates the not found page layout
 * - Open/Closed: Extensible via constants without modifying component logic
 * - Dependency Inversion: Depends on abstractions (components, constants) not concrete implementations
 */
export default function NotFound() {
  return (
    <div className={notFoundStyles.container} dir="rtl">
      <NotFoundContent
        errorCode={NOT_FOUND_CONTENT.errorCode}
        title={NOT_FOUND_CONTENT.title}
        backLinkText={NOT_FOUND_CONTENT.backLinkText}
        backLinkHref={NOT_FOUND_CONTENT.backLinkHref}
      />
    </div>
  );
}
