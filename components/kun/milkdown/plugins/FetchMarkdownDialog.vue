<script setup lang="ts">
import type { UseEditorReturn } from '@milkdown/vue'
import type { FetchConfig } from './fetchGitHubMarkdown'
import { fetchGitHubMarkdown } from './fetchGitHubMarkdown'

const EXAMPLE_URL =
  'https://github.com/KUN1007/kun-galgame-nuxt3/blob/master/README.md'

const props = defineProps<{
  editorInfo: UseEditorReturn
  show: boolean
}>()

const emits = defineEmits<{
  insert: [href: string, text: string]
  cancel: []
}>()

const { get, loading } = props.editorInfo
const fetchUrl = ref('')
const fetchConfig = reactive<FetchConfig>({
  username: '',
  repository: '',
  branch: '',
  filename: ''
})

const handleFetchMarkdown = async () => {
  const markdown = await fetchGitHubMarkdown(fetchUrl.value)
  console.log(markdown)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="insert">
      <div
        class="mask"
        tabindex="0"
        v-if="show"
        @keydown.enter="handleFetchMarkdown"
        @keydown.esc="emits('cancel')"
      >
        <div class="dialog" @click.stop>
          <h2 class="title">从 GitHub 导入 Markdown</h2>
          <pre>
            https://raw.githubusercontent.com/KUN1007/kun-galgame-vue/SSR/SSR/docs/zh/README.md
            https://github.com/KUN1007/tenshi-patch-fix/blob/main/README.md
            https://github.com/KUN1007/kun-galgame-vue/blob/SSR/docs/zh/README.md
            https://github.com/Dir-A/Dir-A_Essays_MD/blob/main/Reverse/%5BQLIE%5D%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%88%86%E6%9E%90/%5BQLIE%5D%20%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F%E5%88%86%E6%9E%90%20%5BP1%E5%87%86%E5%A4%87%5D.md
          </pre>

          <input
            id="LinkURLInput"
            type="url"
            v-model="fetchUrl"
            :placeholder="EXAMPLE_URL"
            class="input"
          />

          <pre v-if="fetchConfig">{{ fetchConfig }}</pre>

          <div class="button-group">
            <button @click="emits('cancel')" class="cancel-btn">
              {{ $t('edit.topic.link.cancelInsert') }}
            </button>

            <button @click="handleFetchMarkdown" class="confirm-btn">
              {{ $t('edit.topic.link.confirmInsert') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--kungalgame-mask-color-0);
  transition: opacity 0.3s ease;
  color: var(--kungalgame-font-color-3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog {
  width: 600px;
  padding: 17px;
  background-color: var(--kungalgame-white);
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 17px;
  }
}

.input {
  background-color: transparent;
  border: 2px solid var(--kungalgame-trans-blue-2);
  border-radius: 5px;
  color: var(--kungalgame-font-color-3);
  padding: 8px;
  margin-bottom: 17px;

  &:focus {
    border: 2px solid var(--kungalgame-blue-5);
  }
}

.button-group {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;

  button {
    padding: 7px 17px;
    border-radius: 5px;
    color: var(--kungalgame-blue-5);
    background-color: transparent;
    border: 1px solid var(--kungalgame-blue-5);

    &:last-child {
      margin-left: 10px;
    }

    &:hover {
      color: var(--kungalgame-white);
      background-color: var(--kungalgame-blue-5);
    }
  }
}

.insert-enter-from {
  opacity: 0;
}

.insert-leave-to {
  opacity: 0;
}

.insert-enter-from .container,
.insert-leave-to .container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media (max-width: 700px) {
  .dialog {
    margin: 0 17px;
  }
}
</style>
