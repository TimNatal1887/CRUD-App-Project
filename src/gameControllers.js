const {nanoid} = require('nanoid');
const _ = require("lodash")

function create(games, gameName) {
    const foundGame = games.find(game => game.title === gameName)
    if(foundGame){
        return null
    }
    const platforms = ["Xbox","PlayStation","PC","Nintendo Switch"]
    const generatePlatforms = () => {
        let platformList = []
        for(let i = 0; i < _.random(1,4);i++){
            platformList.push(platforms[i])
        }
        return platformList
    }
    const game = { 
        title: gameName, 
        id: nanoid(4),
        platform: generatePlatforms(),
        priceInCents: Math.floor(_.random(1000,10000)/100)*100,
        releaseYear: _.random(1990,2023),
        reviewScore: null
     };
    games.push(game);
    return games;
  };

  function index(games) {
    return games.map((game) => `ID: ${game.id} | Title: ${game.title} | Price: $${(game.priceInCents/100).toFixed(2)}`).join('\n');
  };

  function show(games, gameId) {
    const game = games.find((game) => game.id === gameId);
    const platforms = game.platform.reduce((acc,platform) => game.platform.indexOf(platform) === game.platform.length - 1 ? acc+= `and ${platform}`:acc += `${platform}, `,'')
    return `ID: ${game.id} | Title: ${game.title} | Price: $${(game.priceInCents/100).toFixed(2)}. Released on ${game.releaseYear}. Available on ${platforms}.`|| `Game with ID of ${gameID} could not be found.`
  };

const inform = console.log;

function edit(games, gameId, updatedGame) {
    const index = games.findIndex((game) => game.id === gameId);
    if (index > -1) {
      games[index].title = updatedGame
      games[index].id = gameId;
      games[index].platform = games[index].platform
      games[index].priceInCents = games[index].price
      games[index].rate = games[index].rate
      inform('Game successfully updated');
      return games;
    } else {
      inform('Game could not be found. No action was taken');
      return games;
    };
  };


  module.exports = {
    create,
    index,
    show,
    destroy,
    edit,
    rate
  };