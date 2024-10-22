import * as core from '@actions/core'
import type { BatchId, Reference } from '@ethersphere/bee-js'
import { Bee } from '@ethersphere/bee-js'
import { Objects, Types } from 'cafe-utility'
import { privateToAddress } from 'ethereumjs-util'

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

async function run(inputs: Inputs) {
  const bee = new Bee(inputs.beeUrl, { headers: inputs.headers })
  const topic = bee.makeFeedTopic(inputs.topic)

  const writer = bee.makeFeedWriter('sequence', topic, inputs.signer)
  const response = await writer.upload(inputs.postageBatchId, inputs.reference)
  const manifest = await bee.createFeedManifest(
    inputs.postageBatchId,
    'sequence',
    topic,
    signerToAddress(inputs.signer)
  )

  core.setOutput('reference', response)
  core.setOutput('manifest', manifest.reference)
}

async function main() {
  const postageBatchId = Types.asHexString(core.getInput('postage-batch-id', { required: true }), {
    name: 'postage-batch-id',
    byteLength: 32,
  }) as BatchId

  const reference = Types.asHexString(core.getInput('reference', { required: true }), {
    name: 'reference',
    byteLength: 32,
  }) as Reference

  return run({
    beeUrl: core.getInput('bee-url', { required: true }),
    signer: Types.asHexString(core.getInput('signer', { required: true }), { name: 'signer', byteLength: 32 }),
    topic: core.getInput('topic', { required: true }),
    postageBatchId,
    reference,
    headers: Objects.parseKeyValues(core.getMultilineInput('headers')),
  })
}

main().catch((err) => core.setFailed(err instanceof Error ? err.message : JSON.stringify(err)))
