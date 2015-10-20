var replace = require('replace'),
    files = process.argv.slice(2),
    jsfToNgTagPairs = {
      'sw:businessContextSelector': 'sw-businesscontextselector',
      'taxit:spacer': 'taxit-spacer',
      'taxit:dataTable': 'taxit-datatable',
      'taxit:column': 'taxit-column',
      'taxit:multiLang': 'taxit-multilang',
      'sw:booleanYesNo': 'sw-booleanyesno',
      'sw:organization': 'sw-organization',
      'sw:partner': 'sw-partner',
      'taxit:toolBar': 'taxit-tool-bar',
      'taxit:toolBarItem': 'taxit-tool-bar-item',
      'taxit:grid': 'taxit-grid'
    },
    jsfToNgAttrPairs = {
      'value': 'taxit-value',
      'defaultValue': 'default-value',
      'id': 'tid',
      'label': 'taxit-label',
      'selectionColumn': 'selection-column',
      'descriptionField': 'description-field',
      'defaultButton': 'default-button',
      'selectionMode': 'selection-mode',
      'catalog': 'taxit-catalog',
      'catalogParams': 'taxit-catalog-params',
      'showValues': 'data-show-values',
      'showFields': 'data-show-fields',
      'entityList': 'entity-list',
      'sortingExpression': 'sorting-expression'
    };

// all files in the current directory
if (files.length === 0) {
  files.push('.');
}

// adds enclosing tag where needed
function processSelfclosingTags() {
  replace({
    regex: /<\s*([^\s>]+)([^>]*)\/\s*>/g,
    replacement: '<$1$2></$1>',
    paths: files,
    silent: true
  });
}

function processTags() {
  Object.keys(jsfToNgTagPairs).forEach(function (jsfTag) {
    replace({
      regex: jsfTag,
      replacement: jsfToNgTagPairs[jsfTag],
      paths: files,
      silent: true
    });
  });
}

function removeJsfValueBrackets() {
  replace({
    regex: /#{(.*?)}/g,
    replacement: '$1',
    paths: files,
    silent: true
  });
}

function processAttrNames() {
  Object.keys(jsfToNgAttrPairs).forEach(function (jsfAttr) {
    var expr = new RegExp('([\\s\'\"])' + jsfAttr +'=', 'g');
    replace({
      regex: expr,
      replacement: '$1' + jsfToNgAttrPairs[jsfAttr] + '=',
      paths: files,
      silent: true
    });
  })
}

(function () {
  processTags();
  processSelfclosingTags();
  removeJsfValueBrackets();
  processAttrNames();
})();