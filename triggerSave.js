/**
 * triggerSave v1.1.0
 * Force trigger Studio save when 'isFeaturedImage' toggle is changed
 */
(function () {
  console.log("[triggerSave] Plugin loaded v1.1.0");

  // Wait until CSDE is available
  const interval = setInterval(() => {
    if (!window.CSDE || !window.CSDE.componentApi) return;

    clearInterval(interval);
    const { componentApi } = window.CSDE;

    // Hook into all components when loaded
    componentApi.onComponentMount((componentCtx) => {
      const { component, updateProperty } = componentCtx;

      // Only apply to image components
      if (component.name !== "image") return;

      // Listen to property changes
      componentCtx.onPropertyChange("isFeaturedImage", (newValue) => {
        console.log("[triggerSave] isFeaturedImage changed to:", newValue);

        // Mark the document dirty to force Studio Editor to trigger Save
        const editor = window.CSDE?.editor;
        if (editor && typeof editor.markDirty === "function") {
          editor.markDirty();
          console.log("[triggerSave] editor marked dirty");
        } else {
          console.warn("[triggerSave] editor.markDirty not available");
        }
      });
    });
  }, 500);
})();
