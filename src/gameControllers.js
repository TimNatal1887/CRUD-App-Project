const { customAlphabet } = require('nanoid');
const _ = require("lodash");
const {alphanumeric} = require("nanoid-dictionary");
const {convertToDollars} = require('./cartController')

const platforms = ["Xbox","PlayStation","PC","Nintendo Switch"]

const generatePlatforms = (platforms) => {
    let platformList = []
    let count = _.random(1,4)
    for(let i = 0; i < count;i++){
        const randomPlatform = platforms[_.random(0,3)]
        if(!platformList.includes(randomPlatform)){
            platformList.push(randomPlatform)
        }
    }
    return platformList
}

function create(games, gameName,rating) {
    
  const foundGame = games.find(game => game.title === gameName)
    if(foundGame){
        return null
    }

    const randomId = customAlphabet(alphanumeric,4)
    const game = { 
        title: gameName, 
        id: randomId(),
        platform: generatePlatforms(platforms),
        priceInCents: Math.floor(_.random(1000,10000)/100)*100,
        releaseYear: _.random(1990,2023),
        reviewScore: +rating|| 'No user rating yet'
     };

    games.push(game);
    return games;
  };

  function index(games) {
    return games.map((game) => `ID: ${game.id} | Title: ${game.title} | Price: $${convertToDollars(game.priceInCents)}`).join('\n');
  };

  function show(games, gameId) {
    const game = games.find((game) => game.id === gameId);
    if(!game){
      return `Game with ID of ${gameId} could not be found.`
    }
    const platforms = game.platform.reduce((acc,platform) => game.platform.length === 1 ? acc+= platform: game.platform.indexOf(platform) === game.platform.length - 1 ? acc += `and ${platform}`:acc += `${platform}, `,'')
    return `ID: ${game.id} | Title: ${game.title} | Price: $${convertToDollars(game.priceInCents)}. Released in ${game.releaseYear}. Available on ${platforms}.`
  };

const inform = console.log;

function destroy(games, gameId) {
  const index = games.findIndex((game) => game.id === gameId);
  if (index > -1) {
    games.splice(index, 1);
    inform('Game successfully removed from library.');
    return games;
  } else {
    inform('Game could not be found. No action was taken');
    return games;
  };
};

function edit(games, gameId, updatedGame) {
    const index = games.findIndex((game) => game.id === gameId);
    if (index > -1) {
      games[index].title = updatedGame
      games[index].id = gameId;
      games[index].platform = games[index].platform
      games[index].priceInCents = games[index].priceInCents
      games[index].reviewScore = games[index].reviewScore
      inform('Game successfully updated');
      return games;
    } else {
      inform('Game could not be found. No action was taken');
      return games;
    };
  };

  function rate(games,gameId,rating) {
    const index = games.findIndex((game) => game.id === gameId);
    if(!(rating > 0 && rating <= 10)){
      inform('Rating must be between 1 and 10!')
      return games
    }else if (index > -1) {
      games[index].title = games[index].title
      games[index].id = gameId;
      games[index].platform = games[index].platform
      games[index].priceInCents = games[index].priceInCents
      games[index].reviewScore = +rating
      inform(`Rating of ${games[index].title} has successfully been updated!`)
      return games
    }else{
      inform("Game could not be found!")
      return games
    }
  };
  
  module.exports = {
    create,
    index,
    show,
    destroy,
    edit,
    rate,
    generatePlatforms
  };