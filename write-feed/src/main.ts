import * as core from '@actions/core'
import { Bee, BATCH_ID_HEX_LENGTH, REFERENCE_HEX_LENGTH } from '@ethersphere/bee-js'
import type { BatchId, Reference } from '@ethersphere/bee-js'

type Inputs = {
  beeUrl: string
  postageBatchId: BatchId
  topic: string
  signer: string
  reference: Reference
}

const run = async ({ beeUrl, postageBatchId, topic, signer, reference }: Inputs): Promise<void> => {
  const bee = new Bee(beeUrl)
  const feedWriter = bee.makeFeedWriter('sequence', topic, signer)
  const response = await feedWriter.upload(postageBatchId, reference)
  core.setOutput('reference', response)
}

const main = async (): Promise<void> => {
  const postageBatchId = core.getInput('postage-batch-id', { required: true })
  if (postageBatchId.length !== BATCH_ID_HEX_LENGTH) {
    throw new Error(`postage-batch-id must be ${BATCH_ID_HEX_LENGTH} characters long`)
  }

  const reference = core.getInput('reference', { required: true })
  if (reference.length !== REFERENCE_HEX_LENGTH) {
    throw new Error(`reference must be ${REFERENCE_HEX_LENGTH} characters long`)
  }

  return run({
    beeUrl: core.getInput('bee-url', { required: true }),
    signer: core.getInput('signer', { required: true }),
    topic: core.getInput('topic', { required: true }),
    postageBatchId: postageBatchId as BatchId,
    reference: reference as Reference,
  })
}

main().catch((err) => core.setFailed(err instanceof Error ? err.message : JSON.stringify(err)))
