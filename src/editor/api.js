export async function countStory() {
  const result = await fetch(
    "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/howManyStoriesThere"
  )
    .then((res) => res.json())
    .then((res) => console.log(res));

  return result;
}

export async function getPage(data) {
  const result = await fetch(
    "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/lazysample",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  )
    .then((res) => res.json())
    // .then((res) => JSON.parse(res))
    // .then((res) => (res.length > 0 ? getData(res, page) : null))
    // .then((res) => console.log(state));
    .catch((err) => console.log(err));

  return result;
}
