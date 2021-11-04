export function sortByCreateTweet(newTweetToAdd) {
  return newTweetToAdd.sort((a,b) => new Date(b.date) - new Date(a.date));
}