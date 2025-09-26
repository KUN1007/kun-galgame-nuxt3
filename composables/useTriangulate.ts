type Vertex = [number, number]

type TriangleIndices = [number, number, number]

type Triangle = [Vertex, Vertex, Vertex]

interface CircumCircle {
  i: number
  j: number
  k: number
  x: number
  y: number
  r: number
}

type MaybeRef<T> = T | Ref<T>

const EPSILON = 1.0 / 1048576.0

const superTriangle = (vertices: Vertex[]): Vertex[] => {
  let xmin = Number.POSITIVE_INFINITY
  let ymin = Number.POSITIVE_INFINITY
  let xmax = Number.NEGATIVE_INFINITY
  let ymax = Number.NEGATIVE_INFINITY

  for (const v of vertices) {
    if (v[0] < xmin) xmin = v[0]
    if (v[0] > xmax) xmax = v[0]
    if (v[1] < ymin) ymin = v[1]
    if (v[1] > ymax) ymax = v[1]
  }

  const dx = xmax - xmin
  const dy = ymax - ymin
  const dmax = Math.max(dx, dy)
  const xmid = xmin + dx * 0.5
  const ymid = ymin + dy * 0.5

  return [
    [xmid - 20 * dmax, ymid - dmax],
    [xmid, ymid + 20 * dmax],
    [xmid + 20 * dmax, ymid - dmax]
  ]
}

const circumCircle = (
  vertices: Vertex[],
  i: number,
  j: number,
  k: number
): CircumCircle => {
  const x1 = vertices[i][0],
    y1 = vertices[i][1]
  const x2 = vertices[j][0],
    y2 = vertices[j][1]
  const x3 = vertices[k][0],
    y3 = vertices[k][1]

  const fabsy1y2 = Math.abs(y1 - y2)
  const fabsy2y3 = Math.abs(y2 - y3)

  if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON) {
    throw new Error('Eek! Coincident points!')
  }

  let xc: number, yc: number

  if (fabsy1y2 < EPSILON) {
    const m2 = -((x3 - x2) / (y3 - y2))
    const mx2 = (x2 + x3) / 2.0
    const my2 = (y2 + y3) / 2.0
    xc = (x2 + x1) / 2.0
    yc = m2 * (xc - mx2) + my2
  } else if (fabsy2y3 < EPSILON) {
    const m1 = -((x2 - x1) / (y2 - y1))
    const mx1 = (x1 + x2) / 2.0
    const my1 = (y1 + y2) / 2.0
    xc = (x3 + x2) / 2.0
    yc = m1 * (xc - mx1) + my1
  } else {
    const m1 = -((x2 - x1) / (y2 - y1))
    const m2 = -((x3 - x2) / (y3 - y2))
    const mx1 = (x1 + x2) / 2.0
    const mx2 = (x2 + x3) / 2.0
    const my1 = (y1 + y2) / 2.0
    const my2 = (y2 + y3) / 2.0
    xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2)
    yc = fabsy1y2 > fabsy2y3 ? m1 * (xc - mx1) + my1 : m2 * (xc - mx2) + my2
  }

  const dx = x2 - xc
  const dy = y2 - yc
  return { i, j, k, x: xc, y: yc, r: dx * dx + dy * dy }
}

const dedup = (edges: number[]): void => {
  for (let j = edges.length; j > 0; ) {
    const b = edges[--j]
    const a = edges[--j]

    for (let i = j; i > 0; ) {
      const n = edges[--i]
      const m = edges[--i]

      if ((a === m && b === n) || (a === n && b === m)) {
        edges.splice(j, 2)
        edges.splice(i, 2)
        break
      }
    }
  }
}

const triangulate = (vertices: Vertex[]): TriangleIndices[] => {
  const n = vertices.length
  if (n < 3) {
    return []
  }

  const verticesCopy = [...vertices]

  const indices = Array.from({ length: n }, (_, i) => i)
  indices.sort((i, j) => verticesCopy[j][0] - verticesCopy[i][0])

  const st = superTriangle(verticesCopy)
  verticesCopy.push(st[0], st[1], st[2])

  const open: CircumCircle[] = [circumCircle(verticesCopy, n, n + 1, n + 2)]
  const closed: CircumCircle[] = []
  const edges: number[] = []

  for (const c of indices) {
    edges.length = 0

    for (let j = open.length; j--; ) {
      const dx = verticesCopy[c][0] - open[j].x
      if (dx > 0.0 && dx * dx > open[j].r) {
        closed.push(open[j])
        open.splice(j, 1)
        continue
      }

      const dy = verticesCopy[c][1] - open[j].y
      if (dx * dx + dy * dy - open[j].r > EPSILON) {
        continue
      }

      edges.push(
        open[j].i,
        open[j].j,
        open[j].j,
        open[j].k,
        open[j].k,
        open[j].i
      )
      open.splice(j, 1)
    }

    dedup(edges)

    for (let j = edges.length; j > 0; ) {
      const b = edges[--j]
      const a = edges[--j]
      open.push(circumCircle(verticesCopy, a, b, c))
    }
  }

  closed.push(...open)

  const result: TriangleIndices[] = []
  for (const t of closed) {
    if (t.i < n && t.j < n && t.k < n) {
      result.push([t.i, t.j, t.k])
    }
  }

  return result
}

export const contains = (tri: Triangle, p: Vertex): [number, number] | null => {
  if (
    (p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
    (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
    (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
    (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1])
  ) {
    return null
  }

  const a = tri[1][0] - tri[0][0]
  const b = tri[2][0] - tri[0][0]
  const c = tri[1][1] - tri[0][1]
  const d = tri[2][1] - tri[0][1]
  const i = a * d - b * c

  if (i === 0.0) return null

  const u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i
  const v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i

  if (u < 0.0 || v < 0.0 || u + v > 1.0) {
    return null
  }

  return [u, v]
}

export const useTriangulate = (vertices: MaybeRef<Vertex[]>) => {
  const triangles = computed(() => {
    const v = unref(vertices)
    return triangulate(v)
  })

  return {
    triangles
  }
}
