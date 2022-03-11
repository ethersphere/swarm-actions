# write-feed

Write to a Swarm feed.

## Getting Started

To run this action:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ethersphere/swarm-actions/write-feed@v1
        with:
          bee-url: http://localhost:1633
          postage-batch-id: '0000000000000000000000000000000000000000000000000000000000000000'
          reference: '0000000000000000000000000000000000000000000000000000000000000000'
          topic: my.website/topic
          signer: '0x634fb5a872396d9693e5c9f9d7233cfa93f395c093371017ff44aa9ae6564cdd'
          headers: |
            Authorization: Bearer ...
            X-Header: Value
```

## Inputs

| Name               | Required | Default                                                            | Description                                            |
| ------------------ | -------- | ------------------------------------------------------------------ | ------------------------------------------------------ |
| `bee-url`          | `false`  | `https://api.gateway.ethswarm.org`                                 | URL of Bee node                                        |
| `postage-batch-id` | `false`  | `0000000000000000000000000000000000000000000000000000000000000000` | Batch ID of Postage Stamp that will be used for upload |
| `reference`        | `true`   | -                                                                  | Swarm reference                                        |
| `topic`            | `true`   | -                                                                  | Topic for the feed                                     |
| `signer`           | `true`   | -                                                                  | Signer used to update the feed                         |
| `headers`          | `false`  | -                                                                  | Headers used for the HTTP call to bee                  |

## Outputs

| Name        | Description                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------- |
| `reference` | Reference to the Single Owner Chunk that contains the new update and pointer to the updated chunk reference |

## Comments

### Headers

Headers can be used with the following syntax (don't forget the `|`):

```yaml
with:
  headers: |
    Authorization: Bearer ...
    X-Header: Value
```

For single headers, this can be shortened to:

```yaml
with:
  headers: 'Authorization: Bearer ...'
```
