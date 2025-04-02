import * as core from '@actions/core'
import { BatchId, Bee, PrivateKey, Reference, Topic } from '@ethersphere/bee-js'
import { Objects, Types } from 'cafe-utility'

type Inputs = {
  beeUrl: string
  postageBatchId: BatchId
  topic: string
  signer: string
  reference: Reference
  headers: Record<string, string>
}

async function run(inputs: Inputs) {
  const bee = new Bee(inputs.beeUrl, { headers: inputs.headers })
  const topic = Topic.fromString(inputs.topic)

  const signer = new PrivateKey(inputs.signer)
  const writer = bee.makeFeedWriter(topic, inputs.signer)
  const response = await writer.uploadReference(inputs.postageBatchId, inputs.reference)
  const manifest = await bee.createFeedManifest(inputs.postageBatchId, topic, signer.publicKey().address())

  core.setOutput('reference', response.reference.toHex())
  core.setOutput('manifest', manifest.toHex())
}

async function main() {
  const postageBatchId = new BatchId(
    Types.asHexString(core.getInput('postage-batch-id', { required: true }), {
      name: 'postage-batch-id',
      byteLength: 32,
    })
  )

  const reference = new Reference(
    Types.asHexString(core.getInput('reference', { required: true }), {
      name: 'reference',
      byteLength: 32,
    })
  )

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
