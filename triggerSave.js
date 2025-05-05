// Studio Digital Editor Plugin to persist 'isFeaturedImage' toggle
// Assumes the property is defined in components-definition.json with dataType: 'data'

(function () {
  window.ContentStation && ContentStation.require && ContentStation.require(["app", "repository", "pubsub"], function (app, repo, pubsub) {
    // Wait for editor to load a component
    pubsub.subscribe("component-editor:component-loaded", function (data) {
      const { component, componentEditor } = data;
      if (!component || !componentEditor) return;

      // Check if component has our custom field
      const fieldEl = componentEditor.el.querySelector('[data-property-name="isFeaturedImage"] input[type="checkbox"]');
      if (!fieldEl) return;

      // Set initial state from model
      fieldEl.checked = !!component.model.get("isFeaturedImage");

      // Attach change listener
      fieldEl.addEventListener("change", function () {
        const value = fieldEl.checked;
        component.model.set("isFeaturedImage", value);
        component.model.trigger("change"); // Trigger model change
        componentEditor.markDirty(); // Mark editor as dirty so Save is enabled
      });
    });
  });
})();
