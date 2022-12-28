export async function countStory() {
  const result = await fetch(
    "https://data.mongodb-api.com/app/application-1-qqykd/endpoint/howManyStoriesThere"
  )
    .then((res) => res.json().then((res) => parseInt(res)))
    .then((res) => console.log(res));

  return result;
}
