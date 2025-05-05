/**
 * Trigger save when isFeaturedImage checkbox is toggled.
 * v2.0 - Fix for Studio Digital Editor, DigitalArticle only
 */
(function triggerSavePlugin() {
  if (!window.csde) {
    console.warn('[triggerSave] CSDE not available');
    return;
  }

  window.csde.registerPlugin('triggerSave', {
    onLoad(context) {
      console.info('[triggerSave] Plugin loaded v2.0');

      // Watch when properties are changed
      context.eventBus.on('propertyChange', ({ component, property, value }) => {
        if (property === 'isFeaturedImage') {
          console.info('[triggerSave] isFeaturedImage changed:', value);

          try {
            const editor = context.editor;
            const doc = editor?.document;

            if (doc?.markDirty && doc?.save) {
              doc.markDirty();
              doc.save().then(() => {
                console.info('[triggerSave] Save triggered after isFeaturedImage change');
              }).catch((err) => {
                console.error('[triggerSave] Save failed:', err);
              });
            } else {
              console.warn('[triggerSave] Document or save function not available');
            }
          } catch (e) {
            console.error('[triggerSave] Error during save trigger:', e);
          }
        }
      });
    }
  });
})();
