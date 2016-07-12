angular.module('emailApp')
.run(['appCache',function (appCache) {
  appCache.put('default-page',
{
  "type": "page",
  "style": {
    "background-color": "#f3f3f3"
  },
  "rawStyle":{},
  "sections": [
    {
      "type": "section",
      "template-name": "100",
      "style": {
        "background-color": "#fefefe"
      },
      "rawStyle":{},
      "wrapper":{
        "style":{},
        "rawStyle":{}
      },
      "columns": [
        {
          "type": "column",
          "grid-width": "12",
          "style":{
            "padding-top": "0px",
            "padding-left": "16px",
            "padding-bottom": "16px",
            "padding-right": "16px"
          },
          "rawStyle":{
            "padding-top": 0,
            "padding-left": 16,
            "padding-bottom": 16,
            "padding-right": 16
          },
          "elements": [
            {
              "style": {},
              "rawStyle":{},
              "type": "text",
              "content": "<h1 style=\"text-align: center;\">Hello Joseph</h1>"
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "template-name": "50-50",
      "style": {
        "background-color": "#fefefe"
      },
      "rawStyle":{},
      "wrapper":{
        "style":{},
        "rawStyle":{}
      },
      "columns": [
        {
          "type": "column",
          "grid-width": "6",
          "style":{
            "padding-top": "0px",
            "padding-left": "16px",
            "padding-bottom": "16px",
            "padding-right": "8px"
          },
          "rawStyle":{
            "padding-top": 0,
            "padding-left": 16,
            "padding-bottom": 16,
            "padding-right": 8
          },
          "elements": [
            {
              "style": {},
              "rawStyle":{},
              "type": "text",
              "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula ante nec velit molestie commodo. Vivamus quis suscipit dui. Etiam quis laoreet enim. Praesent ornare aliquam dolor ut scelerisque. Aliquam varius tincidunt eros vel ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec nec consectetur leo, vitae dictum leo. Cras semper nisi eget auctor blandit. Cras mattis risus et libero mollis, sit amet mollis ex placerat. Proin nibh velit, ornare sit amet elit nec, tempor cursus turpis.</p>"
            }
          ]
        },
        {
          "type": "column",
          "grid-width": "6",
          "style":{
            "padding-top": "0px",
            "padding-left": "8px",
            "padding-bottom": "16px",
            "padding-right": "16px"
          },
          "rawStyle":{
            "padding-top": 0,
            "padding-left": 8,
            "padding-bottom": 16,
            "padding-right": 16
          },
          "elements": [
            {
              "style": {},
              "rawStyle":{},
              "type": "image",
              "src": "http://atj-remotedev.cloudapp.net/email-builder/app/img/default.jpg",
              "height": 186.66666666666666,
              "width": 280,
              "alignment": "center"
            }
          ]
        }
      ]
    },
    {
      "type": "section",
      "template-name": "100",
      "style": {
        "background-color": "#fefefe"
      },
      "rawStyle":{},
      "wrapper":{
        "style":{},
        "rawStyle":{}
      },
      "columns": [
        {
          "type": "column",
          "grid-width": "12",
          "style":{
            "padding-top": "0px",
            "padding-left": "16px",
            "padding-bottom": "16px",
            "padding-right": "16px"
          },
          "rawStyle":{
            "padding-top": 0,
            "padding-left": 16,
            "padding-bottom": 16,
            "padding-right": 16
          },
          "elements": [
            {
              "style": {},
              "rawStyle":{},
              "type": "text",
              "content": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vehicula ante nec velit molestie commodo. Vivamus quis suscipit dui.</p>"
            }
          ]
        }
      ]
    }
  ]
}
  )
}]);