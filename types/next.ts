// types/next.ts

import { NextPage } from 'next';

export type PageProps<T extends Record<string, string> = Record<string, string>> = {
  params: T;
  searchParams?: Record<string, string | string[] | undefined>;
};

export type NextPageWithProps<T = Record<string, unknown>> = NextPage<
  T & PageProps<Record<string, string>>
>;