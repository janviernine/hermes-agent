import assert from 'node:assert/strict'

import { test } from 'vitest'

import { quitKeepsRemoteBackend } from './remote-lifecycle'

// desktop.ssh_keep_backend_on_quit: quit may leave the owned remote serve running.
test('quit leaves the remote backend running only when opted in, or on a Windows remote', () => {
  assert.equal(quitKeepsRemoteBackend('Linux', true), true)
  assert.equal(quitKeepsRemoteBackend('Linux', false), false)
  // Windows remotes never had a POSIX lock/kill path; quit already leaves them alone.
  assert.equal(quitKeepsRemoteBackend('Windows', false), true)
  // An unknown platform must not be mistaken for Windows.
  assert.equal(quitKeepsRemoteBackend(undefined, false), false)
})
