export { getFilePathAbsolute }
export { getFilePathVite }

import type { ResolvedConfig } from 'vite'
import { assertPosixPath, toPosixPath } from './filesystemPathHandling'
import { assert } from './assert'
import path from 'path'
import { assertIsNotProductionRuntime } from './assertIsNotProductionRuntime'
import { isNpmPackageImport } from './isNpmPackage'
import { assertPathIsFilesystemAbsolute } from './assertPathIsFilesystemAbsolute'

assertIsNotProductionRuntime()

// Vite handles paths such as /pages/index.page.js which are relative to `config.root`.
// Make them absolute starting from the filesystem root.
// Also resolve plus files living in npm packages such as restack/renderer/+onRenderHtml.js
function getFilePathAbsolute(filePath: string, config: ResolvedConfig): string {
  assertPosixPath(filePath)

  if (filePath.startsWith('/@fs/')) {
    return filePath
  }

  let filePathUnresolved: string
  if (isNpmPackageImport(filePath)) {
    filePathUnresolved = filePath
  } else {
    assert(filePath.startsWith('/'))
    const { root } = config
    assertPathIsFilesystemAbsolute(root)
    filePathUnresolved = path.posix.join(root, filePath)
    assertPathIsFilesystemAbsolute(filePathUnresolved)
  }

  let filePathAbsolute: string
  try {
    filePathAbsolute = require.resolve(filePathUnresolved, { paths: [config.root] })
  } catch (err) {
    console.error(err)
    assert(false)
  }
  filePathAbsolute = toPosixPath(filePathAbsolute)
  assertPathIsFilesystemAbsolute(filePathAbsolute)
  return filePathAbsolute
}

function getFilePathVite(filePath: string, userRootDir: string, alwaysRelativeToRoot = false): string {
  assertPosixPath(filePath)
  assertPosixPath(userRootDir)
  const filePathRelativeToRoot = path.posix.relative(userRootDir, filePath)
  if (!filePath.startsWith(userRootDir)) {
    if (alwaysRelativeToRoot) {
      return filePathRelativeToRoot
    } else {
      return filePath
    }
  }
  assert(!filePathRelativeToRoot.startsWith('.') && !filePathRelativeToRoot.startsWith('/'))
  const filePathVite = `/${filePathRelativeToRoot}`
  return filePathVite
}
