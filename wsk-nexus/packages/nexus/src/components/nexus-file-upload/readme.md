# nexus-file-upload



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description                                                                                                   | Type      | Default |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| `accept`   | `accept`   | Specifies file types the user can select from.                                                                | `string`  | `'*'`   |
| `attrId`   | `attr-id`  | The Unique identifier for the input and the label to match. If none is provided one will be added by default. | `string`  | `''`    |
| `disabled` | `disabled` | Whether the input is disabled.                                                                                | `boolean` | `false` |
| `multiple` | `multiple` | Whether you can upload multiple files at once.                                                                | `boolean` | `false` |
| `required` | `required` | Whether the input is required.                                                                                | `boolean` | `false` |


## Events

| Event        | Description                                                                                                                  | Type               |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `errorEvent` | Event fired if an error occurs. IE11 does not support dynamically setting files on an input so this error will be triggered. | `CustomEvent<any>` |


## Dependencies

### Depends on

- [nexus-icon](../nexus-icon)

### Graph
```mermaid
graph TD;
  nexus-file-upload --> nexus-icon
  style nexus-file-upload fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


