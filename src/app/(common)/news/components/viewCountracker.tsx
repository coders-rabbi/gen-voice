"use client";

import { useEffect, useRef } from "react";
import { incrementNewsView } from "@/services/news/news.service";

const NewsViewTracker = ({ newsId }: { newsId: string }) => {
  const hasTracked = useRef(false);

  useEffect(() => {
    if (hasTracked.current || !newsId) return;
    hasTracked.current = true;

    incrementNewsView(newsId).catch(() => {
     
    });
  }, [newsId]);

  return null;
};

export default NewsViewTracker;
