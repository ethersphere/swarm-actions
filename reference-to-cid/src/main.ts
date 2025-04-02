import * as core from '@actions/core'
import { Reference } from '@ethersphere/bee-js'

// Ensure 'reference' is a string
const reference: string = core.getInput('reference', { required: true })

const cid: unknown = new Reference(reference).toCid('manifest')

if (typeof cid === 'string') {
  core.setOutput('cid', cid)
} else {
  core.setFailed('Invalid CID returned from encodeManifestReference')
}
