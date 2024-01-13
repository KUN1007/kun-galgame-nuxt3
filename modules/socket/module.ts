import { fileURLToPath, pathToFileURL } from 'url'
import {
  defineNuxtModule,
  addServerHandler,
  addPlugin,
  addImports,
  addTemplate,
  createResolver,
} from '@nuxt/kit'
import fg from 'fast-glob'
import { Server as SocketServer, type ServerOptions } from 'socket.io'

export interface ModuleOptions {
  addPlugin: boolean
  serverOptions: Partial<ServerOptions>
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-socket.io',
    configKey: 'socket',
  },
  defaults: {
    addPlugin: true,
    serverOptions: {},
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const extGlob = '**/*.{ts,js,mjs}'
    const files: string[] = []

    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    nuxt.hook('builder:watch', async (e, path) => {
      if (e === 'change') {
        return
      }
      if (path.includes('server/socket')) {
        await scanHandlers()
        await nuxt.callHook('builder:generateApp')
      }
    })

    await scanHandlers()

    addTemplate({
      filename: 'io-dev-functions.mjs',
      write: true,
      getContents() {
        return `
          import jiti from 'jiti';
          const _require = jiti(process.cwd(), { interopDefault: true, esmResolve: true });

          ${files
            .map(
              (file, index) =>
                `const function${index} = _require('${file.replace(
                  '.ts',
                  ''
                )}');`
            )
            .join('\n')}
          export {
            ${files.map((_, index) => `function${index}`).join(',\n')}
          }
        `
      },
    })

    if (nuxt.options.dev) {
      const devFunctionsPath = pathToFileURL(
        resolve(nuxt.options.buildDir, 'io-dev-functions.mjs')
      ).toString()

      nuxt.hook('listen', (httpServer) => {
        nuxt.hook('app:templatesGenerated', async () => {
          const io = new SocketServer(httpServer, options.serverOptions)
          const functions = await import(devFunctionsPath)
          Object.keys(functions).forEach((fn) => {
            functions[fn](io)
          })
        })
      })
    }

    if (options.addPlugin) {
      addPlugin(resolve(runtimeDir, 'plugin.client'))

      addImports([
        {
          name: 'useSocket',
          from: resolve(runtimeDir, 'composables'),
        },
        {
          name: 'useIO',
          from: resolve(runtimeDir, 'composables'),
        },
      ])
    }

    addServerHandler({
      middleware: true,
      handler: resolve(nuxt.options.buildDir, 'io-handler.ts'),
    })

    addTemplate({
      filename: 'io-handler.ts',
      write: true,
      getContents() {
        return `
          import { createIOHandler } from '${resolve(runtimeDir, 'server')}';
          ${files
            .map(
              (file, index) =>
                `import function${index} from '${file.replace('.ts', '')}'`
            )
            .join('\n')}
          export default createIOHandler({
            ${files.map((_, index) => `function${index}`).join(',\n')}
          }, ${JSON.stringify(options.serverOptions)})
        `
      },
    })

    async function scanHandlers() {
      files.length = 0
      const updatedFiles = await fg(extGlob, {
        cwd: resolve(nuxt.options.srcDir, 'server/socket'),
        absolute: true,
        onlyFiles: true,
      })
      files.push(...new Set(updatedFiles))
      return files
    }
  },
})
