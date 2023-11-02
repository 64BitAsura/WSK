# Nexus Component Library - Angular

## Install

1. Click the link below to navigate to the Azure projects artifact feed
    * https://fso-to.visualstudio.com/Nexus%20for%20Banking/_packaging?_a=package&feed=Nexus&view=overview&package=%40nexus%2Fangular&protocolType=Npm
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
    yarn add @nexus/core @nexus/angular
    ```

    or

    ```bash
    npm i @nexus/core @nexus/angular
    ```

## Setup

### Import the entire library (not recommended)

This can be fine for development but it will include everything whether you use it or not.

For production it is recommended to use tree shaking by including individual modules as needed.

Add the NexusAngularModule to your main app module (EX: app.module.ts)

```javascript
import { NexusAngularModule } from '@nexus/angular';

@NgModule({
  imports: [
    NexusAngularModule
  ]
});
```

### Import individual modules (recommended)

```javascript
import { NexusFormField, NexusLabel, NexusInput } from '@nexus/angular';


@NgModule({
  declarations: [
    NexusFormField,
    NexusLabel,
    NexusInput
  ]
});
```
## Public Styles

The default styles for the application live in the `src/styles/_default.scss` file. In particular, the parent default app styles - with the class selector `.nexus`, will target anything that is a lower in the class hierarchy. In order to make these styles available for your application, you must add the class `nexus` to the public html file of your respective app(s).

`index.html`
```
<body class="nexus"></body>
``` 




## SCSS

Import styles.scss into your main css file: src/styles.css


```scss
$nexus-font-path: '~@nexus/core/dist/assets/fonts';

@import '~@nexus/core/dist/styles';

```

You can also import specific partials to your scss files as needed for variables and mixins:

```scss
@import '~@nexus/core/dist/styles/mixins';
@import '~@nexus/core/dist/styles/variables';
```
