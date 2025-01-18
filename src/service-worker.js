import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

// キャッシュするファイルのルート
precacheAndRoute(self.__WB_MANIFEST || []);

// APIのキャッシュ戦略
registerRoute(
  ({ request }) => request.destination === "document",
  new StaleWhileRevalidate()
);

// インストールイベント
self.addEventListener("install", (event) => {
  console.log("Service Worker installed");
});

// 有効化イベント
self.addEventListener("activate", (event) => {
  console.log("Service Worker activated");
});
