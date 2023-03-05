const bemMatching = /^[a-z]([a-z0-9-]+)?(__([a-z0-9]+-?)+)?(--([a-z0-9]+-?)+){0,2}$/

module.exports = {
  'extends': [
    'stylelint-config-standard',
    'stylelint-config-hudochenkov/order'
  ],
  "ignoreFiles": [
    "index.html"
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
    'function-no-unknown': [
      true,
      {
        'ignoreFunctions': [
          'theme'
        ]
      }
    ],
    'selector-class-pattern': bemMatching,
    'max-nesting-depth': 2,
    'at-rule-no-unknown': [
        true,
        {
          'ignoreAtRules': [
            'tailwind',
            'layer',
            'apply',
            'variants',
            'responsive',
            'screen'
          ]
        }
      ],
      "value-keyword-case": [
        "lower",
        {
          ignoreKeywords: [
            "/colors\..*\.DEFAULT/"
          ]
        }
      ],
      "string-quotes": "single",
    // ORDER
    'order/properties-alphabetical-order': null,
  }
}
