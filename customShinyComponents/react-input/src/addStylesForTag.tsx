/**
 * Add styles to the dom for a given tag but only once.
 * @param tag Name of the tag to add styles for
 * @param styles Styles to add
 */
export function addStylesForTag(tag: string, styles: string) {
  // If the styles are already in the dom, don't add them again
  if (document.querySelector(`style[data-wcstyles="${tag}"]`)) {
    return;
  }
  const styleEl = document.createElement("style");
  styleEl.dataset[`wcstyles`] = tag;
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
}
