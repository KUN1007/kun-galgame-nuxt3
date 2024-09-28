export interface ParsedGitHubUrl {
  path: string
  pathName: string
  hash: string
  username: string | null
  filepath: string | null
  repositoryName: string | null
  branch?: string
  // repository label, example: KUN1007/kun-galgame-nuxt3
  repository?: string | null
  blob?: string | null
}

const isChecksum = (str: string): boolean => {
  return /^[a-f0-9]{40}$/i.test(str)
}

const getBranch = (str: string, obj: ParsedGitHubUrl): string => {
  const segments = str.split('#')
  let branch = segments.length > 1 ? segments[segments.length - 1] : null
  if (!branch && obj.hash && obj.hash.charAt(0) === '#') {
    branch = obj.hash.slice(1)
  }
  return branch || 'master'
}

const getRepositoryName = (str: string | undefined): string | null => {
  return str ? str.replace(/\.git$/, '') : null
}

const getUsername = (str: string | undefined): string | null => {
  if (!str) {
    return null
  }
  const idx = str.indexOf(':')
  return idx > -1 ? str.slice(idx + 1) : str
}

/* Test url:
 * https://raw.githubusercontent.com/KUN1007/kun-galgame-vue/SSR/SSR/docs/zh/README.md
 * https://github.com/KUN1007/tenshi-patch-fix/blob/main/README.md
 * https://github.com/KUN1007/kun-galgame-vue/blob/SSR/docs/zh/README.md
 * https://github.com/Dir-A/Dir-A_Essays_MD/blob/main/Reverse/%5BQLIE%5D%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%88%86%E6%9E%90/%5BQLIE%5D%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%88%86%E6%9E%90%20%5BP1%E5%87%86%E5%A4%87%5D.md
 */
export const parseGithubUrl = (str: string): ParsedGitHubUrl | null => {
  if (typeof str !== 'string' || !str.length) {
    return null
  }

  if (str.includes('git@gist') || str.includes('//gist')) {
    return null
  }

  const url = new URL(
    str.startsWith('git@')
      ? `http://${str.replace(/git@([^:]+):/, '$1/')}`
      : str
  )

  const obj: ParsedGitHubUrl = {
    path: url.pathname,
    pathName: '',
    hash: url.hash,
    username: '',
    repositoryName: '',
    filepath: ''
  }

  if (obj.path.startsWith('repos')) {
    obj.path = obj.path.slice(6)
  }

  const seg = obj.path.split('/').filter(Boolean)
  const hasBlob = seg[2] === 'blob'
  if (hasBlob && !isChecksum(seg[3])) {
    obj.branch = seg[3]
    if (seg.length > 4) {
      obj.filepath = seg.slice(4).join('/')
    }
  }

  const blobIndex = str.indexOf('blob')
  if (hasBlob && blobIndex !== -1) {
    obj.blob = str.slice(blobIndex + 5)
  }

  const hasTree = seg[2] === 'tree'
  const treeIndex = str.indexOf('tree')
  if (hasTree && treeIndex !== -1) {
    let branch = str.slice(treeIndex + 5)
    const slash = branch.indexOf('/')
    if (slash !== -1) {
      branch = branch.slice(0, slash)
    }
    obj.branch = branch
  }

  obj.username = getUsername(seg[0])
  obj.repositoryName = getRepositoryName(seg[1])

  if (seg.length > 1 && obj.username && obj.repositoryName) {
    obj.repository = `${obj.username}/${obj.repositoryName}`
  } else {
    const href = url.href.split(':')
    if (href.length === 2 && !url.href.includes('//')) {
      obj.repository = obj.repository || href[href.length - 1]
      const repoSegments = obj.repository.split('/')
      obj.username = repoSegments[0]
      obj.repositoryName = repoSegments[1]
    } else {
      const match = url.href.match(/\/([^/]*)$/)
      obj.username = match ? match[1] : null
      obj.repository = null
    }

    if (obj.repository && (!obj.username || !obj.repositoryName)) {
      const segments = obj.repository.split('/')
      if (segments.length === 2) {
        obj.username = segments[0]
        obj.repositoryName = segments[1]
      }
    }
  }

  if (!obj.branch) {
    obj.branch = seg[2] || getBranch(obj.path, obj)
    if (seg.length > 3) {
      obj.filepath = seg.slice(3).join('/')
    }
  }

  obj.pathName = obj.path.replace(/\/[^/]+\.md$/, '')

  return obj
}
