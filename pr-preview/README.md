# pr-preview

GitHub Actions bundle to upload Pull Requests to Swarm.

## Getting Started

To run this action:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: ethersphere/swarm-actions/pr-preview@v1
        with:
          bee-url: https://api.gateway.ethswarm.org
          postage-batch-id: '0000000000000000000000000000000000000000000000000000000000000000'
          dir: ./dist
          preview: true
          headers: |
            Authorization: Bearer ...
            X-Header: Value
```

## Inputs

| Name               | Required | Default                                                            | Description                                                         |
| ------------------ | -------- | ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `bee-url`          | `false`  | `https://api.gateway.ethswarm.org`                                 | URL of Bee node                                                     |
| `bzz-link-url`     | `false`  | `https://<<CID>>.bzz.link`                                         | URL of for Bzz.link                                                 |
| `postage-batch-id` | `false`  | `0000000000000000000000000000000000000000000000000000000000000000` | Batch ID of Postage Stamp that will be used for upload              |
| `dir`              | `false`  | `./build`                                                          | Path to build directory that should be uploaded. Default: ./build   |
| `token`            | `false`  | `GITHUB_TOKEN`                                                     | Token to be used for creating the PR comment. Default: GITHUB_TOKEN |
| `headers`          | `false`  | -                                                                  | Headers used for the HTTP call to bee                               |

## Outputs

| Name         | Description                        |
| ------------ | ---------------------------------- |
| `swarm-hash` | Swarm hash of the uploaded content |
| `url`        | Bzz link URL                       |

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
