# Angular Test Project

## For better component generating
In angular.json:

```json
"schematics": {
    "@schematics/angular": {
        "component": {
        "inlineTemplate": true,
        "inlineStyle": true,
        "skipTests": true,
        "flat": true
        }
    }
},
```

## Add ngxtension
`npm install -D ngxtension-plugin`

`ng g ngxtension-plugin:init`

## Add tailwind
`npm install -D tailwindcss@3 postcss autoprefixer`

`npx tailwindcss init`

tailwind.config.js:
```json
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

styles.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

https://v3.tailwindcss.com/docs/guides/angular

## Angular Material
`ng add @angular/material@17`

https://v17.material.angular.io/guide/getting-started


## Use Environments
`ng add @ngx-env/builder@17`

.env, env.d.ts


## Set Local proxy
proxy.conf.json:

```json
{
  "/picsum": {
    "target": "https://picsum.photos",
    "secure": true,
    "changeOrigin": true,
    "pathRewrite": {
      "^/picsum": ""
    }
  }
}
```


angular.json:

```json
{
  "projects": {
    "angular-lms": {
      "architect": {
        "serve": {
          "options": {
            "proxyConfig": "src/proxy.conf.json"
          }
        }
      }
    }
  }
}