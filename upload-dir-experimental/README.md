# upload-dir-experimental

Upload directories to Swarm.

## Getting Started

To run this action:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ethersphere/swarm-actions/upload-dir@v1
        with:
          bee-url: https://api.gateway.ethswarm.org
          postage-batch-id: '0000000000000000000000000000000000000000000000000000000000000000'
          dir: ./dist
          headers: |
            Authorization: Bearer ...
            X-Header: Value
```

## Inputs

| Name               | Required | Default                                                            | Description                                                                                          |
| ------------------ | -------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `bee-url`          | `false`  | `https://api.gateway.ethswarm.org`                                 | URL of Bee node.                                                                                     |
| `postage-batch-id` | `false`  | `0000000000000000000000000000000000000000000000000000000000000000` | Batch ID of Postage Stamp that will be used for upload.                                              |
| `dir`              | `true`   | -                                                                  | Path to directory that should be uploaded.                                                           |
| `headers`          | `false`  | -                                                                  | Headers used for the HTTP call to bee.                                                               |
| `deferred`         | `false`  | `true`                                                             | Determines if the uploaded data should be sent to the network immediately or in a deferred fashion.  |
| `error-document`   | `false`  | `undefined`                                                        | Configure custom error document to be returned when a specified path can not be found in collection. |
| `index-document`   | `false`  | `undefined`                                                        | Default file to be returned when the root hash of collection is accessed.                            |
| `timeout`          | `false`  | `undefined`                                                        | Timeout of requests in milliseconds.                                                                 |

## Outputs

| Name        | Description                        |
| ----------- | ---------------------------------- |
| `reference` | Swarm hash of the uploaded content |
| `tagUid`    | Automatically created tag's UID    |

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
