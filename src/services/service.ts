import axios from 'axios';

export async function getStars(username: String){
  const repos = await getUserRepos(username);
  const stars = getUserStars(repos);
  return stars;
}

async function getUserRepos(username: String){
  const { data }: {data:{}[]} = await axios.get(
    `https://api.github.com/users/${username}/repos`
  );

  return data;
}

function getUserStars(repos: any[]): number{
  let stars = 0;

  repos.forEach(repo => {
    stars += repo.stargazers_count;
  });

  return stars;
}

export function battle(firsUser: {stars: number, name: string}, secondUser: {stars: number, name: string}){
  const { stars: firstUserStars, name: firstUserName } = firsUser;
  const { stars: secondUserStars, name: secondUserName } = secondUser;
  const results = { winner: null, loser: null, draw: true };

  if (firstUserStars > secondUserStars) 
    return resultFactory(firstUserName, secondUserName, false);
  else if (firstUserStars < secondUserStars) 
    return resultFactory(secondUserName, firstUserName, false);
  else
    return results;
}

function resultFactory(winner: string, loser: string, draw: boolean){

  winner = winner || null;
  loser = loser || null;

  return { winner, loser, draw };
}