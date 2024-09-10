import * as core from '@actions/core';
import { encodeManifestReference } from '@ethersphere/swarm-cid';

// Ensure 'reference' is a string
const reference: string = core.getInput('reference', { required: true });

// Explicitly define the return type of encodeManifestReference
// Assuming that it should return a string, adjust this if it returns something else
const cid: unknown = encodeManifestReference(reference);

if (typeof cid === 'string') {
  // Only call .toString() if it's already a string
  core.setOutput('cid', cid);
} else if (cid && typeof cid.toString === 'function') {
  // Fallback for objects that have a toString method
  core.setOutput('cid', cid.toString());
} else {
  // Handle the case where the result is not usable
  core.setFailed('Invalid CID returned from encodeManifestReference');
}

