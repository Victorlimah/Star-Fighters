import axios from 'axios';
import * as repository from '../repositories/repository.js';

export async function getStars(username: string){
  const repos = await getUserRepos(username);
  const stars = getUserStars(repos);

  const user = await repository.findUser(username);
  if(user.rows.length === 0) await repository.createUser(username);

  return stars;
}

async function getUserRepos(username: string){
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
  let results = { winner: null, loser: null, draw: true };

  if (firstUserStars > secondUserStars){
    results = resultFactory(firstUserName, secondUserName, false);
    insertInfoDB(firstUserName, secondUserName, results);
  }
  else if (firstUserStars < secondUserStars){
    results = resultFactory(secondUserName, firstUserName, false);
    insertInfoDB(firstUserName, secondUserName, results);
  }
  else{
    insertInfoDB(firstUserName, secondUserName, results);
  }
  return results; 
}

function resultFactory(winner: string, loser: string, draw: boolean){
  winner = winner || null;
  loser = loser || null;

  return { winner, loser, draw };
}

async function insertInfoDB(first: string, second: string, result: {winner: string, loser: string, draw: boolean}){
  const { winner, loser, draw } = result;

  if(winner){
    await repository.updateUser(winner, "wins");
    await repository.updateUser(loser, "losses");
  } else if(draw){
    await repository.updateUser(first, "draws");
    await repository.updateUser(second, "draws");
  }
}

export async function getRanking(){
  const ranking = await repository.getRanking();

  return ranking;
}