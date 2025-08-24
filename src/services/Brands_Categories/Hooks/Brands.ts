import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchBrandById, fetchBrands } from '../Brands-Categories_Api';

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}

export function useBrandById(brandId) {
  return useQuery({
    queryKey: ['brands', brandId],
    queryFn: () => fetchBrandById(brandId)
  });
}
