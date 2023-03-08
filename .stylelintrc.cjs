const bemMatching = /^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$/

module.exports = {
  "plugins": [
    "stylelint-scss"
  ],
  'extends': [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss',
    'stylelint-config-hudochenkov/order'
  ],
  'overrides': [
    {
      'files': [ '*.vue', '**/*.vue' ],
      'customSyntax': 'postcss-html',
      'rules': {
        'selector-pseudo-class-no-unknown': [
          true,
          {
            'ignorePseudoClasses': [ 'deep', 'slotted', 'global' ]
          }
        ]

      }
    }
  ],
  'rules': {
    // DEFAULT
    'indentation': 2,
    'no-empty-source': null,
    'selector-class-pattern': bemMatching,
    'max-nesting-depth': 2,
    'at-rule-no-unknown': null,
      "value-keyword-case": [
        "lower",
        {
          ignoreKeywords: [
            "/colors\..*\.DEFAULT/"
          ]
        }
      ],
      'import-notation': 'string',
    // ORDER
    'order/properties-alphabetical-order': null,
    // SCSS
    'scss/at-rule-no-unknown': [
      true,
      {
        'ignoreAtRules': []
      }
    ],
    'scss/no-global-function-names': null,
  }
}
