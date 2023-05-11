const openInWordpress = (
  event: React.MouseEvent<Element, MouseEvent>,
  type: string,
  options?: Record<string, unknown>
) => {
  window.parent.postMessage(
    JSON.stringify({
      type,
      newTab: event.ctrlKey || event.metaKey ? true : undefined,
      ...(options ? options : {}),
    }),
    "*"
  );
};

export default openInWordpress;
