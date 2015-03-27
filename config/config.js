angular.module('sextant.config', [])
  .constant('configuration', {
        "EVENT_SERVICE_URL": "@@EVENT_SERVICE_URL",
        "MINION_SERVICE_URL": "@@MINION_SERVICE_URL",
        "POD_SERVICE_URL": "@@POD_SERVICE_URL",
        "RC_SERVICE_URL": "@@RC_SERVICE_URL",
        "DOCKERUI_SERVICE_URL": "@@DOCKERUI_SERVICE_URL",
        "NUMBER_OF_ITEMS_PER_PAGE": "@@NUMBER_OF_ITEMS_PER_PAGE",
        "NUMBER_OF_DISPLAYED_PAGES": "@@NUMBER_OF_DISPLAYED_PAGES"
    });

