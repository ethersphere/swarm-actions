import * as core from '@actions/core'
import { BatchId, Bee, BeeRequestOptions, CollectionUploadOptions } from '@ethersphere/bee-js'
import { Objects, Types } from 'cafe-utility'
import { toBoolean, toNumber } from './options'

type Inputs = {
  beeUrl: string
  postageBatchId: BatchId
  dir: string
  headers: Record<string, string>
  options: CollectionUploadOptions
  requestOptions: BeeRequestOptions
}

async function run(inputs: Inputs) {
  const bee = new Bee(inputs.beeUrl, { headers: inputs.headers })
  const { reference, tagUid } = await bee.uploadFilesFromDirectory(
    inputs.postageBatchId,
    inputs.dir,
    inputs.options,
    inputs.requestOptions
  )
  core.setOutput('reference', reference)
  core.setOutput('tagUid', tagUid)
}

async function main() {
  const postageBatchId = new BatchId(
    Types.asHexString(core.getInput('postage-batch-id', { required: true }), {
      name: 'postage-batch-id',
      byteLength: 32,
    })
  )

  const options: CollectionUploadOptions = {
    deferred: toBoolean(core.getInput('deferred')),
    encrypt: toBoolean(core.getInput('encrypt')),
    errorDocument: core.getInput('error-document'),
    indexDocument: core.getInput('index-document'),
    pin: toBoolean(core.getInput('pin')),
    tag: toNumber(core.getInput('tag')),
  }

  Objects.removeEmptyValues(options as Record<string, unknown>)

  const requestOptions: BeeRequestOptions = {
    timeout: toNumber(core.getInput('timeout')),
  }

  return run({
    beeUrl: core.getInput('bee-url', { required: true }),
    dir: core.getInput('dir', { required: true }),
    postageBatchId,
    headers: Objects.parseKeyValues(core.getMultilineInput('headers')),
    options,
    requestOptions,
  })
}

main().catch((err) => core.setFailed(err instanceof Error ? err.message : JSON.stringify(err)))
