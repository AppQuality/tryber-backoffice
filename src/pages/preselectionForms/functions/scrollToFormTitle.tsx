export function scrollToFormTitle() {
  const selector = `[id="formTitle"]`;
  const formTitleElement = document.querySelector(selector) as HTMLElement;
  formTitleElement?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}
