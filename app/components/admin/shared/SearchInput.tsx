'use client';

import React from 'react';
import { FaSearch } from 'react-icons/fa';
import type { SearchInputProps } from './types';
import { sharedStyles } from './styles';

/**
 * SearchInput Component
 * Following Single Responsibility Principle - only handles search input display
 */
export function SearchInput({ value, onChange, placeholder = 'ابحث...' }: SearchInputProps) {
  return (
    <div className={sharedStyles.searchContainer}>
      <div className={sharedStyles.searchWrapper}>
        <div className={sharedStyles.searchIcon}>
          <FaSearch className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className={sharedStyles.searchInput}
        />
      </div>
    </div>
  );
}
