import * as core from '@actions/core'
import { encodeManifestReference } from '@ethersphere/swarm-cid'

const reference = core.getInput('reference', { required: true })
const cid = encodeManifestReference(reference)
core.setOutput('cid', cid.toString())
