import { useKUNGalgameUserStore } from '@/store/modules/kungalgamer'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

type FetchOptions = {
  method: HttpMethod
  credentials: 'include'
  headers?: Record<string, string>
  body?: BodyInit
}

const kunFetchRequest = async (url: string, options: FetchOptions) => {
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${useKUNGalgameUserStore().getToken()}`,
  }

  return await $fetch(`api${url}`, { ...options, headers })
}

const fetchGet = async (url: string, headers?: Record<string, string>) => {
  const options: FetchOptions = {
    method: 'GET',
    credentials: 'include',
    headers: headers,
  }

  return await kunFetchRequest(url, options)
}

const fetchPost = async (
  url: string,
  body?: Record<string, any>,
  headers?: Record<string, string>
) => {
  const options: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  }

  return await kunFetchRequest(url, options)
}

const fetchPut = async (
  url: string,
  body?: Record<string, any>,
  headers?: Record<string, string>
) => {
  const options: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify(body),
  }

  return await kunFetchRequest(url, options)
}

const fetchDelete = async (url: string, headers?: Record<string, string>) => {
  const options: FetchOptions = {
    method: 'DELETE',
    credentials: 'include',
    headers: headers,
  }

  return await kunFetchRequest(url, options)
}

const fetchPostWithFormData = async (
  url: string,
  formData: FormData,
  headers?: Record<string, string>
) => {
  const options: FetchOptions = {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
    },
    body: formData,
  }

  return await kunFetchRequest(url, options)
}

export { fetchGet, fetchPost, fetchPut, fetchDelete, fetchPostWithFormData }
