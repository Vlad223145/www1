import { useCallback } from "react";

interface AnalyticsEvent {
  event: string;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

export function useAnalytics() {
  const track = useCallback((eventData: AnalyticsEvent) => {
    // In production, this would integrate with your analytics provider
    console.log("Analytics Event:", eventData);

    // Example GTM/GA4 integration:
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", eventData.action || eventData.event, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
        ...eventData.customData,
      });
    }

    // Example custom analytics endpoint:
    if (typeof window !== "undefined") {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...eventData,
          timestamp: Date.now(),
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      }).catch(console.error);
    }
  }, []);

  const trackCTAClick = useCallback(
    (location: string) => {
      track({
        event: "hero_CTA_click",
        category: "engagement",
        action: "click",
        label: location,
      });
    },
    [track],
  );

  const trackCouponCopy = useCallback(() => {
    track({
      event: "coupon_copy",
      category: "conversion",
      action: "copy_code",
    });
  }, [track]);

  const trackPartnerModal = useCallback(
    (partnerName: string) => {
      track({
        event: "open_partner_modal",
        category: "engagement",
        action: "modal_open",
        label: partnerName,
      });
    },
    [track],
  );

  const trackFAQSearch = useCallback(
    (query: string) => {
      track({
        event: "faq_search",
        category: "engagement",
        action: "search",
        label: query,
      });
    },
    [track],
  );

  const trackMenuItemView = useCallback(
    (itemName: string, savings: number) => {
      track({
        event: "menu_item_view",
        category: "product",
        action: "view",
        label: itemName,
        value: savings,
      });
    },
    [track],
  );

  return {
    track,
    trackCTAClick,
    trackCouponCopy,
    trackPartnerModal,
    trackFAQSearch,
    trackMenuItemView,
  };
}
