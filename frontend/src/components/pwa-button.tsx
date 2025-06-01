import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const handleInstallClick = useCallback(() => {
    if (!deferredPrompt)
      return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.warn("✅ User accepted install");
      }
      else {
        console.warn("❌ User dismissed install");
        localStorage.setItem("pwa-dismissed", "true");
      }
      setDeferredPrompt(null);
    });
  }, [deferredPrompt]);

  useEffect(() => {
    const isStandalone = window.matchMedia("(display-mode: standalone)").matches;
    const dismissed = localStorage.getItem("pwa-dismissed");

    if (isStandalone || dismissed)
      return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);

      toast("📲 Install this app?", {
        action: {
          label: "Install",
          onClick: handleInstallClick,
        },
        cancel: {
          label: "Dismiss",
          onClick: () => {
            localStorage.setItem("pwa-dismissed", "true");
          },
        },
        duration: 10000,
      });
    };

    const handleAppInstalled = () => {
      localStorage.setItem("pwa-dismissed", "true");
      console.warn("✅ PWA installed");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [handleInstallClick]);

  return null;
}
