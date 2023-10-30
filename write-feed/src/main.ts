import * as core from '@actions/core'
import type { BatchId, Reference } from '@ethersphere/bee-js'
import { BATCH_ID_HEX_LENGTH, Bee, REFERENCE_HEX_LENGTH } from '@ethersphere/bee-js'
import { privateToAddress, stripHexPrefix } from 'ethereumjs-util'
import { parseHeaders } from 'swarm-actions-libs'

type Inputs = {
  beeUrl: string
  postageBatchId: BatchId
  topic: string
  signer: string
  reference: Reference
  headers: Record<string, string>
}

const signerToAddress = (signer: string): string => {
  return privateToAddress(Buffer.from(signer, 'hex')).toString('hex')
}

const run = async ({
  beeUrl,
  postageBatchId,
  topic: topicString,
  signer: signerString,
  reference,
  headers,
}: Inputs): Promise<void> => {
  const bee = new Bee(beeUrl, { headers })
  const signer = stripHexPrefix(signerString)
  const topic = bee.makeFeedTopic(topicString)

  const writer = bee.makeFeedWriter('sequence', topic, signer)
  const response = await writer.upload(postageBatchId, reference)
  const manifest = await bee.createFeedManifest(postageBatchId, 'sequence', topic, signerToAddress(signer))

  core.setOutput('reference', response)
  core.setOutput('manifest', manifest)
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
    headers: parseHeaders(core.getInput('headers')),
  })
}

main().catch((err) => core.setFailed(err instanceof Error ? err.message : JSON.stringify(err)))
