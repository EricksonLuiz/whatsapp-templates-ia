
import { useState } from "react";

export type WebhookTypes = "client" | "bm" | "category" | "template" | "phone";

export type WebhookURLs = {
  [K in WebhookTypes]: string;
};

const DEFAULT_URLS: WebhookURLs = {
  client: "",
  bm: "",
  category: "",
  template: "",
  phone: "",
};

const STORAGE_KEY = "webhook_urls";

function getURLs(): WebhookURLs {
  if (typeof window === "undefined") return DEFAULT_URLS;
  const content = localStorage.getItem(STORAGE_KEY);
  if (!content) return DEFAULT_URLS;
  try {
    return { ...DEFAULT_URLS, ...JSON.parse(content) };
  } catch {
    return DEFAULT_URLS;
  }
}

export function useWebhookSettings() {
  const [urls, setUrls] = useState<WebhookURLs>(getURLs());

  function updateURL(type: WebhookTypes, url: string) {
    const updated = { ...urls, [type]: url };
    setUrls(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function resetURLs() {
    setUrls(DEFAULT_URLS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_URLS));
  }

  return { urls, updateURL, resetURLs };
}
