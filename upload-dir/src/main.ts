import * as core from '@actions/core'
import { Bee } from '@ethersphere/bee-js'
import type { BatchId } from '@ethersphere/bee-js'

type Inputs = {
  beeUrl: string
  postageBatchId: BatchId
  dir: string
}

const run = async ({ beeUrl, postageBatchId, dir }: Inputs): Promise<void> => {
  const bee = new Bee(beeUrl)
  const { reference, tagUid } = await bee.uploadFilesFromDirectory(postageBatchId, dir)
  core.setOutput('reference', reference)
  core.setOutput('tagUid', tagUid)
}

const main = async (): Promise<void> => {
  const postageBatchId = core.getInput('postage-batch-id', { required: true })
  if (postageBatchId.length !== 64) {
    throw new Error('postage-batch-id must be 64 characters long')
  }

  return run({
    beeUrl: core.getInput('bee-url', { required: true }),
    dir: core.getInput('dir', { required: true }),
    postageBatchId: postageBatchId as BatchId,
  })
}

try {
  await main()
} catch (err) {
  core.setFailed(err instanceof Error ? err.message : JSON.stringify(err))
}
