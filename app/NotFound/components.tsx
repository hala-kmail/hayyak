import Link from 'next/link';
import { notFoundStyles } from './styles';

/**
 * NotFound Content Component
 * Following Single Responsibility Principle - only handles content display
 */
interface NotFoundContentProps {
  errorCode: string;
  title: string;
  backLinkText: string;
  backLinkHref: string;
}

export function NotFoundContent({
  errorCode,
  title,
  backLinkText,
  backLinkHref,
}: NotFoundContentProps) {
  return (
    <>
      <h1 className={notFoundStyles.errorCode}>{errorCode}</h1>
      <p className={notFoundStyles.title}>{title}</p>
      <Link href={backLinkHref} className={notFoundStyles.backLink}>
        {backLinkText}
      </Link>
    </>
  );
}
