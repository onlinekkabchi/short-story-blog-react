export async function countStory(dispatch) {
  const result = await fetch(
    "https://data.mongodb-api.com/app/young-klxvd/endpoint/storycounter"
  )
    .then((res) => res.json())
    .then((res) => parseInt(res))
    .then((res) => parseInt(res / 10))
    .then((res) => dispatch({ type: "SET_PAGE", index: res }))
    .catch((err) => alert("index error! : " + err));

  return result;
}

export async function createPageIndex(dispatch) {
  const result = await fetch(
    "https://data.mongodb-api.com/app/young-klxvd/endpoint/storycounter"
  )
    .then((res) => res.json())
    .then((res) => parseInt(res))
    .then((res) => parseInt(res / 10) + 1)
    .then((res) => dispatch({ type: "SET_PAGE_INDEX", index: res }))
    .catch((err) => alert("index error! : " + err));

  return result;
}

export async function getPage(dispatch, query, pageindex) {
  const result = await fetch(
    "https://data.mongodb-api.com/app/young-klxvd/endpoint/lasysender",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    }
  )
    .then((res) => res.json())
    .then((res) =>
      dispatch({
        type: "SET_STORY_FOR_THIS_PAGE",
        pageindex: pageindex,
        data: res,
      })
    )
    .then((res) => console.log("이야기 받아옴"))
    .catch((err) => console.log("이야기 받는데 문제가 있음" + err));

  return result;
}

export async function sendReplyRequest(query) {
  const result = await fetch(
    "https://data.mongodb-api.com/app/young-klxvd/endpoint/getReplyRequest",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    }
  )
    .then((res) => res.json())
    .then((res) => console.log(res));

  return result;
}

export async function getReplyList(query) {
  const result = await fetch(
    "https://data.mongodb-api.com/app/young-klxvd/endpoint/sendReplyList",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(query),
    }
  )
    .then((res) => res.json())
    .then((res) => console.log(res));

  return result;
}
