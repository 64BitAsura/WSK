# Nexus Component Library - React

## Install

1. Click the link below to navigate to the Azure projects artifact feed
   - https://fso-to.visualstudio.com/Nexus%20for%20Banking/_packaging?_a=package&feed=Nexus&view=overview&package=%40nexus%2Freact&protocolType=Npm
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
   yarn add @nexus/core @nexus/react
   ```

   or

   ```bash
   npm i @nexus/core @nexus/react
   ```

## Setup

### Import components

The following example shows how you would import and use the compoenents to create a form input:

```javascript
import React, { useState } from 'react';
import { NexusFormField, NexusInput, NexusLabel } from '@nexus/react';

const App = () => {
  const [value, setValue] = useState('');

  return (
    <>
      <NexusFormField>
        <NexusLabel>First name</NexusLabel>
        <NexusInput value={value} onInput={(event) => setValue(event.target.value)}></NexusInput>
      </NexusFormField>
    </>
  );
};

export default App;
```

## Public Styles

The default styles for the application live in the `src/styles/_default.scss` file. In particular, the parent default
app styles - with the class selector `.nexus`, will target anything that is a lower in the class hierarchy. In order to
make these styles available for your application, you must add the class `nexus` to the public html file of your
respective app(s).

In React, the application will be injected into the div with the id selector `root`, add the nexus class on that body as
the example below shows.

`index.html`

```
<body class="nexus">
  <div id="root"></div>
</body>
```

## SCSS

Import `styles.scss` into your main css file: `index.css`

```scss
$nexus-font-path: '~@nexus/core/dist/assets/fonts';

@import '~@nexus/core/dist/styles';
```

You can also import specific partials to your scss files as needed for variables and mixins:

```scss
@import '~@nexus/core/dist/styles/mixins';
@import '~@nexus/core/dist/styles/variables';
```

## Known Issues

### Events

Because React implements its own synthetic event system, it cannot listen for DOM events coming from Custom Elements
without the use of a workaround.

[@stencil/react-output-target](https://github.com/ionic-team/stencil-ds-output-targets) has solved this resolved most of
these issues by creating a wrapper with most necessary bindings. See more here:
https://github.com/ionic-team/stencil-ds-output-targets#react

The only caveat to this is the react `onChange` synthetic event. React actually attaches listeners for `onChange` to
what the DOM event `oninput` would natively do. As such we cannot use the `onChange` synthetic event with web
components. Instead you should use `onInput` to follow the browser spec. See more
here:https://stackoverflow.com/questions/38256332/in-react-whats-the-difference-between-onchange-and-oninput

You can also use a `ref` to addEvent listeners to and element and watch the browser events.

Example:

```js
import React, { useState, useRef, useEffect } from 'react';
import { NexusFormField, NexusInput, NexusLabel } from '@nexus/react';

const App = () => {
  const [value, setValue] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.addEventListener('change', (event) => {
      setValue(event.target.value);
    });
  }, []);

  return (
    <>
      <NexusFormField>
        <NexusLabel>Input with ref</NexusLabel>
        <NexusInput value={value} ref={inputRef}></NexusInput>
      </NexusFormField>
    </>
  );
};

export default App;
```
