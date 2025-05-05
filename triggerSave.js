// Studio Digital Editor Plugin: Trigger Save on isFeaturedImage toggle
// Version: 1.0
(function () {
    ContentStationSdk.showNotification({
        content: 'triggerSave.js plugin loaded (v1.0)',
    });

    DigitalEditorSdk.onOpenArticle(function (article) {
        const observer = new MutationObserver(() => {
            article.save(); // manually trigger save when checkbox changes
            ContentStationSdk.showNotification({
                content: 'Triggered save from isFeaturedImage toggle',
            });
        });

        const checkForToggle = () => {
            const checkbox = document.querySelector('[name="isFeaturedImage"] input[type="checkbox"]');
            if (checkbox) {
                observer.observe(checkbox, {
                    attributes: true,
                    attributeFilter: ['aria-checked', 'checked'],
                });
                ContentStationSdk.showNotification({
                    content: 'isFeaturedImage checkbox observer attached',
                });
            } else {
                // Retry until it appears
                setTimeout(checkForToggle, 500);
            }
        };

        checkForToggle();
    });
})();
