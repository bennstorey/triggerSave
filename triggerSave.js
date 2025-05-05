// triggerSave.js - version 1.0.0

(function () {
  console.log('[triggerSave.js] Plugin loaded');

  // Wait for the editor to be fully initialized
  const interval = setInterval(() => {
    const checkbox = document.querySelector('[name="isFeaturedImage"] input[type="checkbox"]');
    if (checkbox) {
      clearInterval(interval);
      console.log('[triggerSave.js] Found isFeaturedImage checkbox');

      checkbox.addEventListener('change', () => {
        console.log('[triggerSave.js] isFeaturedImage toggled, attempting to trigger save');
        const event = new Event('input', { bubbles: true });
        checkbox.dispatchEvent(event);

        // Look for a global save routine
        if (window.__store__?.dispatch) {
          try {
            window.__store__.dispatch({ type: 'DOCUMENT_MARK_AS_DIRTY' });
            console.log('[triggerSave.js] Dispatch: DOCUMENT_MARK_AS_DIRTY');
          } catch (e) {
            console.warn('[triggerSave.js] Dispatch failed:', e);
          }
        } else {
          console.warn('[triggerSave.js] Store dispatch not available');
        }
      });
    }
  }, 1000);
})();
