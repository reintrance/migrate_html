var replace = require('replace'),
    files = process.argv.slice(2),
    jsfToNgTagPairs = {
      'sw:businessContextSelector': 'sw-businesscontextselector',
      'taxit:spacer': 'taxit-spacer',
      'taxit:dataTable': 'taxit-datatable',
      'taxit:column': 'taxit-column',
      'taxit:multiLang': 'taxit-multilang',
      'sw:booleanYesNo': 'sw-booleanyesno'
    },
    jsfToNgAttrPairs = {

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
    paths: files
  });
}

function processTags() {
  Object.keys(jsfToNgTagPairs).forEach(function (jsfTag) {
    replace({
      regex: jsfTag,
      replacement: jsfToNgTagPairs[jsfTag],
      paths: files
    });
  });
}

function removeJsfValueBrackets() {
  replace({
    regex: /#{(.*?)}/g,
    replacement: '$1',
    paths: files
  });
}

(function () {
  processTags();
  processSelfclosingTags();
  removeJsfValueBrackets();
})();