const response = await fetch(`https://api.vndb.org/kana/vn`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    filters: ['id', '=', 'v19658'],
    fields:
      'id, developers{id,name,original,aliases,lang,type,extlinks{url,label}}, tags{id,name,aliases,category,spoiler,description}'
  })
})

const res = await response.json()

console.log(res)
