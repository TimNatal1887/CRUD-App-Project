const {convertToDollars} = require('./helpers')

const inform = console.log;

function cartList(cart){
    return cart.map(game => `${game.title}, Price: $${convertToDollars(game.priceInCents)}`).join('\n')
}
function add(games,gameId,cart){
    const gameFound = games.find(game=> game.id === gameId);
    if(!gameFound){
      inform(`Game with ID of ${gameId} could not be found`)
      return cart
    }else{
      cart.push(gameFound)
      inform(`${gameFound.title} has been added to your cart.`)
      return cart
    };
};

function remove(gameId,cart){
  const index = cart.findIndex((game) => game.id === gameId);
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

function getCartTotal(cart){
    inform('Games in your cart:' + '\n\n' + cartList(cart));
    const total = cart.reduce((acc,game)=> {
      acc += game.priceInCents
      return acc
      },0)
    
    return `\nCurrent total: $${convertToDollars(total)}`
}

function checkout(cart){
  if(!cart[0]){
    return 'Cart is empty.'
  }
    const thankYou = "Thank you for shopping with us! Here is your receipt \n------------------------\n"
    const gameList = cartList(cart);
    const totalPrice = cart.reduce((acc,game)=> {
      acc += game.priceInCents
      return acc
      },0)
    return thankYou + gameList + `\n------------------------\nTOTAL: $${convertToDollars(totalPrice)}\n\nCart is now empty.`

}

module.exports = {add,remove,emptyCart,getCartTotal,checkout}