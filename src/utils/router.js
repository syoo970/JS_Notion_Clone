const ROUTE_CHANGE_EVENT = "routeChange";

export const initRoute = (onRoute) => {
  window.addEventListener(ROUTE_CHANGE_EVENT, (e) => {
    const { url } = e.detail;
    if (!url) return;
    history.pushState(null, null, url);
    onRoute(url);
  });
};

export const push = (url) => {
  window.dispatchEvent(
    new CustomEvent(ROUTE_CHANGE_EVENT, { detail: { url } })
  );
};
