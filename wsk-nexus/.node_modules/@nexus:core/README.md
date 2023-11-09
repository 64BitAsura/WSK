# Nexus Stencil Component Library

## Install

1. Click the link below to navigate to the Azure projects artifact feed
    * https://fso-to.visualstudio.com/Nexus%20for%20Banking/_packaging?_a=package&feed=Nexus&view=overview&package=%40nexus%2Fcore&protocolType=Npm
2. Follow the instructions to "Connect to feed". Example .npmrc file:
    ```
    registry=https://registry.npmjs.org/
    @nexus:registry=https://fso-to.pkgs.visualstudio.com/7bc545d8-bf8c-477e-bb91-17a982c30c2e/_packaging/Nexus/npm/registry/
    @ey-studio-phl:registry=https://npm.ey-intuitive.com

    always-auth=true
    save-exact=true

    <Your Auth Token Here>
    ```
3. Install the package

    ```bash
    yarn add @nexus/core
    ```

    or

    ```bash
    npm i @nexus/core
    ```

## HTML Setup

Example of pulling packages from node modules:

```html
<html lang="en">
<head>

    <script type="module" src="./node_modules/@nexus/core/dist/nexus/nexus.esm.js"></script>

    <link rel="stylesheet" type="text/css" media="screen" href="./node_modules/@nexus/core/dist/nexus/nexus.css">

</head>

<body class="nexus">

    <nexus-input></nexus-input>

</body>
</html>
```
## Public Styles

The default styles for the application live in the `src/styles/_default.scss` file. In particular, the parent default app styles - with the class selector `.nexus`, will target anything that is a lower in the class hierarchy. In order to make these styles available for your application, you must add the class `nexus` to the public html file of your respective app(s).

`index.html`
```
<body class="nexus">
    ...
</body>
``` 


## SCSS

If you are using scss you can import `@nexus/core/dist/styles` into your `.scss`. instead of importing the `css` file.

```scss
$nexus-font-path: '~@nexus/core/dist/assets/fonts';

@import '~@nexus/core/dist/styles';
```

* Note: you may need to tell scss where to get your fonts as shown above.
