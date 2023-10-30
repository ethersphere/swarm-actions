import * as core from '@actions/core'
import type { BatchId, BeeRequestOptions, CollectionUploadOptions } from '@ethersphere/bee-js'
import { BATCH_ID_HEX_LENGTH, Bee } from '@ethersphere/bee-js'
import { parseHeaders } from 'swarm-actions-libs'
import { toBoolean, toNumber, toString } from './options'

type Inputs = {
  beeUrl: string
  postageBatchId: BatchId
  dir: string
  headers: Record<string, string>
  options: CollectionUploadOptions
  requestOptions: BeeRequestOptions
}

const run = async ({ beeUrl, postageBatchId, dir, headers, options, requestOptions }: Inputs): Promise<void> => {
  const bee = new Bee(beeUrl, { headers })
  const { reference, tagUid } = await bee.uploadFilesFromDirectory(postageBatchId, dir, options, requestOptions)
  core.setOutput('reference', reference)
  core.setOutput('tagUid', tagUid)
}

const main = async (): Promise<void> => {
  const postageBatchId = core.getInput('postage-batch-id', { required: true })
  if (postageBatchId.length !== BATCH_ID_HEX_LENGTH) {
    throw new Error(`postage-batch-id must be ${BATCH_ID_HEX_LENGTH} characters long`)
  }

  const options: CollectionUploadOptions = {
    deferred: toBoolean(core.getInput('deferred')),
    encrypt: toBoolean(core.getInput('encrypt')),
    errorDocument: toString(core.getInput('error-document')),
    indexDocument: toString(core.getInput('index-document')),
    pin: toBoolean(core.getInput('pin')),
    tag: toNumber(core.getInput('tag')),
  }

  const requestOptions: BeeRequestOptions = {
    retry: toNumber(core.getInput('retry')),
    timeout: toNumber(core.getInput('timeout')),
  }

  return run({
    beeUrl: core.getInput('bee-url', { required: true }),
    dir: core.getInput('dir', { required: true }),
    postageBatchId: postageBatchId as BatchId,
    headers: parseHeaders(core.getInput('headers')),
    options,
    requestOptions,
  })
}

main().catch((err) => core.setFailed(err instanceof Error ? err.message : JSON.stringify(err)))
