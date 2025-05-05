// version 1.0.1 - plugin to force save when toggling isFeaturedImage
(function () {
  const PLUGIN_ID = "trigger-save-featured";
  const PROPERTY_NAME = "isFeaturedImage";

  window.wwEditorSDK.plugin.register(PLUGIN_ID, async ({ store }) => {
    console.log(`[${PLUGIN_ID}] Plugin loaded`);

    // Watch for property changes
    store.subscribe(() => {
      const state = store.getState();
      const activeComponentId = state.editor.activeComponentId;
      if (!activeComponentId) return;

      const component = state.components.byId[activeComponentId];
      if (!component || !component.properties) return;

      const newValue = component.properties[PROPERTY_NAME];

      if (window.__lastFeaturedImageValue === undefined) {
        // first-time setup
        window.__lastFeaturedImageValue = newValue;
        return;
      }

      if (newValue !== window.__lastFeaturedImageValue) {
        console.log(`[${PLUGIN_ID}] ${PROPERTY_NAME} changed to`, newValue);
        window.__lastFeaturedImageValue = newValue;

        // Mark article dirty so it gets saved
        store.dispatch({
          type: "EDITOR_MARK_DIRTY",
          payload: {
            isDirty: true,
          },
        });
      }
    });
  });
})();
