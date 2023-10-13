const { customAlphabet } = require('nanoid');
const _ = require("lodash")
const {alphanumeric} = require("nanoid-dictionary")

function create(games, gameName,rating) {
    const foundGame = games.find(game => game.title === gameName)
    if(foundGame){
        return null
    }
    const platforms = ["Xbox","PlayStation","PC","Nintendo Switch"]
    const generatePlatforms = () => {
        let platformList = []
        for(let i = 0; i < _.random(1,4);i++){
            const randomPlatform = platforms[_.random(0,3)]
            if(!platformList.includes(randomPlatform)){
                platformList.push(randomPlatform)
            }
        }
        return platformList
    }
    const randomId = customAlphabet(alphanumeric,4)
    const game = { 
        title: gameName, 
        id: randomId(),
        platform: generatePlatforms(),
        priceInCents: Math.floor(_.random(1000,10000)/100)*100,
        releaseYear: _.random(1990,2023),
        reviewScore: +rating|| 'No user rating yet'
     };
    games.push(game);
    return games;
  };

  function index(games) {
    return games.map((game) => `ID: ${game.id} | Title: ${game.title} | Price: $${(game.priceInCents/100).toFixed(2)}`).join('\n');
  };

  function show(games, gameId) {
    const game = games.find((game) => game.id === gameId);
    const platforms = game.platform.reduce((acc,platform) => game.platform.length === 1 ? acc+= platform: game.platform.indexOf(platform) === game.platform.length - 1 ? acc += `and ${platform}`:acc += `${platform}, `,'')
    return `ID: ${game.id} | Title: ${game.title} | Price: $${(game.priceInCents/100).toFixed(2)}. Released in ${game.releaseYear}. Available on ${platforms}.`|| `Game with ID of ${gameID} could not be found.`
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
      return 'Rating must be between 1 and 10!'
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
}
function cartList(cart){
    return cart.map(game => `${game.title}, Price: $${(game.priceInCents/100).toFixed(2)}`).join('\n')
}
function add(games,gameId,cart){
    const gameFound = games.find(game=> game.id === gameId);
    if(!gameFound){
      inform(`Game with ID of ${gameId} could not be found`)
      return cart
    }else{
      cart.push(gameFound)
      return cart
    };
};

function remove(games,gameId,cart){
  const index = games.findIndex((game) => game.id === gameId);
  if (index > -1) {
    cart.splice(index, 1);
    inform('Game successfully removed from cart.');
    return cart;
  } else {
    inform('Game could not be found. No action was taken');
    return cart;
  };
}

function emptyCart(cart){
  cart = []
  return cart
}

function checkout(cart){
  if(!cart[0]){
    return 'Cart is empty.'
  }
    const thankYou = "Thank you for shopping with us! Here is your receipt \n------------------------\n"
    const gameList = cartList(cart);
    const totalPrice = ((cart.reduce((acc,game)=> {
        acc += game.priceInCents
        return acc
    },0))/100).toFixed(2)
    return thankYou + gameList + `\n------------------------\nTOTAL: $${totalPrice} \n\nCart is now empty.`

}

  
  module.exports = {
    create,
    index,
    show,
    destroy,
    edit,
    rate,
    cartList,
    add,
    remove,
    checkout,
    emptyCart
  };