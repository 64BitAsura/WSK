# nexus-pagination



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description         | Type     | Default     |
| --------- | --------- | ------------------- | -------- | ----------- |
| `current` | `current` | Current Page        | `number` | `undefined` |
| `max`     | `max`     | Max number of pages | `number` | `undefined` |


## Events

| Event         | Description                       | Type               |
| ------------- | --------------------------------- | ------------------ |
| `changeEvent` | Event fired when page is changed. | `CustomEvent<any>` |


## Dependencies

### Used by

 - [nexus-table](../nexus-table)

### Depends on

- [nexus-icon](../nexus-icon)

### Graph
```mermaid
graph TD;
  nexus-pagination --> nexus-icon
  nexus-table --> nexus-pagination
  style nexus-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------


