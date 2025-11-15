"use client";

import { useEffect, useRef } from "react";

interface IProps {
  children: React.ReactNode;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  fetchNextPage: () => void;
}

export const InfiniteScroll: React.FC<IProps> = ({
  children,
  isLoading,
  isFetchingNextPage,
  hasNextPage = true,
  fetchNextPage,
}) => {
  const loader = useRef<HTMLDivElement>(null);
  const fetchNextPageRef = useRef(fetchNextPage);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    fetchNextPageRef.current = fetchNextPage;
  }, [fetchNextPage]);

  useEffect(() => {
    isFetchingRef.current = isFetchingNextPage || isLoading;
  }, [isFetchingNextPage, isLoading]);

  useEffect(() => {
    function handleIntersection(entries: IntersectionObserverEntry[]) {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting && !isFetchingRef.current && hasNextPage) {
          isFetchingRef.current = true;
          fetchNextPageRef.current();
        }
      });
    }

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleIntersection, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage]);

  return (
    <>
      {children}

      {hasNextPage && <div ref={loader} id="loader"></div>}
    </>
  );
};
