import type { PollFormData } from '~/components/topic/poll/types'

export const usePoll = (topicId: number) => {
  const getPoll = () => {
    return useLazyFetch(`/api/topic/${topicId}/poll/topic`, {
      query: { topic_id: topicId },
      ...kungalgameResponseHandler
    })
  }

  const createPoll = async (data: PollFormData) => {
    const res = await $fetch(`/api/topic/${topicId}/poll`, {
      method: 'POST',
      body: {
        ...data,
        options: data.options.map((o) => ({ text: o.text }))
      },
      ...kungalgameResponseHandler
    })
    return res
  }

  const updatePoll = async (pollId: number, data: PollFormData) => {
    const optionsPayload = {
      add: data.options
        .filter((o) => o._status === 'new')
        .map((o) => ({ text: o.text })),
      update: data.options
        .filter((o) => o._status === 'existing' && o.id)
        .map((o) => ({ option_id: o.id, text: o.text })),
      delete: data.options
        .filter((o) => o._status === 'deleted' && o.id)
        .map((o) => o.id)
    }

    const res = await $fetch(`/api/topic/${topicId}/poll`, {
      method: 'PUT',
      body: {
        poll_id: pollId,
        title: data.title,
        description: data.description,
        type: data.type,
        min_choice: data.min_choice,
        max_choice: data.max_choice,
        deadline: data.deadline,
        result_visibility: data.result_visibility,
        is_anonymous: data.is_anonymous,
        can_change_vote: data.can_change_vote,
        options: optionsPayload
      }
    })
    if (res) {
      useMessage(res, 'error')
    }
  }

  const deletePoll = async (pollId: number) => {
    const res = await useComponentMessageStore().alert(
      '确定要删除这个投票吗？',
      '删除投票后, 所有投票数据都将丢失, 该操作不可恢复!'
    )
    if (!res) {
      return
    }

    await $fetch(`/api/topic/${topicId}/poll`, {
      method: 'DELETE',
      query: { poll_id: pollId }
    })
  }

  const submitVote = async (pollId: number, optionIds: number[]) => {
    await $fetch(`/api/topic/${topicId}/poll/vote`, {
      method: 'POST',
      body: { poll_id: pollId, option_id_array: optionIds }
    })
  }

  return {
    getPoll,
    createPoll,
    updatePoll,
    deletePoll,
    submitVote
  }
}
