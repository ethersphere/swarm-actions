# reference-to-cid

Convert Swarm reference to CID.

## Getting Started

To run this action:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: filoozom/swarm-actions/reference-to-cid@v1
        with:
          reference: '0000000000000000000000000000000000000000000000000000000000000000'
```

## Inputs

| Name        | Required | Default | Description     |
| ----------- | -------- | ------- | --------------- |
| `reference` | `true`   | -       | Swarm reference |

## Outputs

| Name  | Description                           |
| ----- | ------------------------------------- |
| `cid` | Content ID corresponding to reference |
