export const updateCustomSlots = (element) => {
  const slots = element.querySelectorAll('[slot]');
  const containers = element.querySelectorAll('[slot-name]');

  if (containers.length && slots.length) {
    containers.forEach((entry) => {
      const found = Array.from(slots).filter(
        (slot: Element) => slot.getAttribute('slot') === entry.getAttribute('slot-name')
      );
      const parent = entry.parentNode;

      found.forEach((child) => parent.appendChild(child));
      parent.removeChild(entry);
    });
  }
};

export const debounceLoad = (callback, wait) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    // eslint-disable-next-line no-invalid-this
    timeout = setTimeout(() => callback.apply(this, args), wait);
  };
};
