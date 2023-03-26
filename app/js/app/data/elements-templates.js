angular.module('emailApp')
.run(['appCache',function (appCache) {
  appCache.put('elements-templates',
[
  {
    "type": "text",
    "style": {},
    "rawStyle":{},
    "content": "<p>Edit me :-)</p>"
  },
  {
    "type": "image",
    "style": {},
    "rawStyle":{},
    "src": `${APP_URL}/app/img/default.jpg`,
    "alignment": "center"
  },
  {
    "type": "button",
    "style": {},
    "rawStyle":{},
    "text": "Button",
    "url": "#",
    "textAlignment": "center",
    "buttonAlignment": "left",
    "coloring": "default",
    "sizing": "default",
    "expanded": false
  },
  {
    "type": "spacer",
    "style": {},
    "rawStyle":{},
    "height": 20
  },
  {
    "type": "divider",
    "style": {
      "padding-top":"10px",
      "padding-bottom":"10px"
    },
    "rawStyle":{}
  },
  {
    "type": "html",
    "content": "<style>\n.inline-heading-style{\ncolor: darkred;\n}\n</style>\n<h1 class=\"inline-heading-style\">Hello World</h1>\n<p>Let's talk ?</p>",
    "style": {},
    "rawStyle":{}
  }
]
  )
}]);
