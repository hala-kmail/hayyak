'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import type { PartnerCardData } from './types';
import { partnersStyles as styles } from './styles';

interface PartnerCardProps {
  partner: PartnerCardData;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  const isSakani = partner.id === 'sakani';
  const isAlhabib = partner.id === 'alhabib';
  const [expanded, setExpanded] = useState(false);

  // Requested brand backgrounds
  const bgClass = isSakani ? 'bg-navy-blue' : isAlhabib ? 'bg-gold' : 'bg-white';

  // Keep text readable
  const textClass = isAlhabib ? 'text-navy-blue' : 'text-white';
  const mutedTextClass = isAlhabib ? 'text-navy-blue/80' : 'text-white/85';

  const cardBorderClass = isAlhabib ? 'border-r-navy-blue border-r-4' : 'border-gold border-r-4';
  const logoBorderColor = isAlhabib
    ? 'rgba(12, 49, 68, 0.18)'
    : 'rgba(255, 255, 255, 0.35)';

  const statBoxClass = isAlhabib
    ? 'bg-white/45 border-gold'
    : 'bg-white/15 border-white/30';

  const ctaClass = isAlhabib
    ? 'bg-white/45 hover:bg-white/55 text-navy-blue'
    : 'bg-white/15 hover:bg-white/20  text-white';

  const { primaryBlock, extraBlocks, hasExtras } = useMemo(() => {
    const [first, ...rest] = partner.blocks;
    const hasMoreText = rest.length > 0;
    const hasStats = Boolean(partner.stats && partner.stats.length > 0);
    return {
      primaryBlock: first,
      extraBlocks: rest,
      hasExtras: hasMoreText || hasStats,
    };
  }, [partner.blocks, partner.stats]);

  return (
    <article
      className={`${styles.card} ${bgClass} ${textClass} ${cardBorderClass}`}
      aria-label={partner.name}
    >
      <div className={styles.cardInner}>
        <div className={styles.topRow}>
          <div>
            <div className={styles.name}>{partner.name}</div>
            {(partner.kicker || partner.shortLabel) && (
              <div className={`${styles.kicker} ${mutedTextClass}`}>
                {partner.kicker ? partner.kicker : partner.shortLabel}
              </div>
            )}
          </div>

          <div className={styles.logoBox} style={{ borderColor: logoBorderColor }}>
            <Image
              src={partner.logoSrc}
              alt={partner.name}
              width={180}
              height={64}
              className={styles.logoImg}
            />
          </div>
        </div>

        {primaryBlock && (
          <div className={styles.block}>
            {primaryBlock.title && (
              <div className={styles.blockTitle}>{primaryBlock.title}</div>
            )}
            <p className={`${styles.blockText} ${mutedTextClass}`}>{primaryBlock.text}</p>
          </div>
        )}

        {expanded &&
          extraBlocks.map((block) => (
            <div key={block.title ?? block.text.slice(0, 20)} className={styles.block}>
              {block.title && <div className={styles.blockTitle}>{block.title}</div>}
              <p className={`${styles.blockText} ${mutedTextClass}`}>{block.text}</p>
            </div>
          ))}

        {expanded && partner.stats && partner.stats.length > 0 && (
          <div className={styles.statsRow}>
            {partner.stats.map((s) => (
              <div key={s.label} className={`${styles.statBox} ${statBoxClass}`}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={`${styles.statLabel} ${mutedTextClass}`}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {(hasExtras || partner.linkUrl) && (
          <div className={styles.actionsRow}>
            {hasExtras ? (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className={styles.toggle}
                aria-expanded={expanded}
              >
                {expanded ? 'إخفاء التفاصيل' : 'عرض المزيد'}
              </button>
            ) : (
              <span />
            )}

            {partner.linkUrl && (
              <a
                href={partner.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cta} ${ctaClass}`}
              >
                زيارة الموقع
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
