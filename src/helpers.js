/* Packages */
import moment from 'moment'

export function sortByCreateTweet(newTweetToAdd) {

    newTweetToAdd.sort(function (a, b) {
      return moment(b.create_tweet).diff(a.create_tweet);
    });

}