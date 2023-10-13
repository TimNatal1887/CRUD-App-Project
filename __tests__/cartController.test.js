const {add,remove,checkout,emptyCart,cartList, getCartTotal} = require('../src/cartController')


describe("cartController",()=>{
    describe("cartList()",()=>{
        it("should list every game in the users Cart array into one string, where each game has its title and price listed",()=>{
            const games = [
                {
                  "title": "Call of Duty",
                  "id": "BV6i",
                  "platform": [
                    "Xbox",
                    "PlayStation"
                  ],
                  "priceInCents": 9800,
                  "releaseYear": 2010,
                  "reviewScore": 7
                },
                {
                  "title": "Jak and Daxter",
                  "id": "ppQb",
                  "platform": [
                    "Xbox"
                  ],
                  "priceInCents": 4000,
                  "releaseYear": 2008,
                  "reviewScore": null
                }
              ];
            const actual = cartList(games);
            const expected = "Call of Duty, Price: $98.00\nJak and Daxter, Price: $40.00";
            expect(actual).toEqual(expected);
        });
    });

    describe("add()",()=>{
        it("should add a game object matched with the given userID into the cart array",() =>{
            const games = [    {
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              },
              {
                "title": "Jak and Daxter",
                "id": "ppQb",
                "platform": [
                  "Xbox"
                ],
                "priceInCents": 4000,
                "releaseYear": 2008,
                "reviewScore": null
              }
            ];
            const cart = []
            const input = "BV6i";
            const actual = add(games,input,cart);
            const expected = [ {
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              },];
            expect(actual).toEqual(expected);
        });

        it("should not alter the cart if an incorrect id was given",() =>{
            const games = [{
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              }];
            const cart = [];
            const input = "incorrect id";
            const actual = add(games,input,cart);
            const expected = [];
            expect(actual).toEqual(expected);
        });
    });

    describe("remove()",() =>{
        it("should correctly remove the game object from the cart with the given ID",() =>{
            const cart = [{
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              },
              {
                "title": "Jak and Daxter",
                "id": "ppQb",
                "platform": [
                  "Xbox"
                ],
                "priceInCents": 4000,
                "releaseYear": 2008,
                "reviewScore": null
              }];
              const input = "BV6i";
              const actual = remove(input,cart);
              const expected = [{
                "title": "Jak and Daxter",
                "id": "ppQb",
                "platform": [
                  "Xbox"
                ],
                "priceInCents": 4000,
                "releaseYear": 2008,
                "reviewScore": null
              }];
              expect(actual).toEqual(expected);
        });

        it("should not alter the cart if an incorrect id was given",() =>{
            const cart = [{
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              },
              {
                "title": "Jak and Daxter",
                "id": "ppQb",
                "platform": [
                  "Xbox"
                ],
                "priceInCents": 4000,
                "releaseYear": 2008,
                "reviewScore": null
              }];
              const input = "incorrect id";
              const actual = remove(input,cart);
              const expected = [{
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              },
              {
                "title": "Jak and Daxter",
                "id": "ppQb",
                "platform": [
                  "Xbox"
                ],
                "priceInCents": 4000,
                "releaseYear": 2008,
                "reviewScore": null
              }];
              expect(actual).toEqual(expected);
        });
    });

    describe("getCartTotal()",()=>{
        it("should correctly add up the total of all items in the cart",()=>{
            const cart = [
                {
                  "title": "Call of Duty",
                  "id": "BV6i",
                  "platform": [
                    "Xbox",
                    "PlayStation"
                  ],
                  "priceInCents": 9800,
                  "releaseYear": 2010,
                  "reviewScore": 7
                },
                {
                  "title": "Jak and Daxter",
                  "id": "ppQb",
                  "platform": [
                    "Xbox"
                  ],
                  "priceInCents": 4000,
                  "releaseYear": 2008,
                  "reviewScore": null
                },
                {
                  "title": "Jak and Daxter",
                  "id": "ppQb",
                  "platform": [
                    "Xbox"
                  ],
                  "priceInCents": 4000,
                  "releaseYear": 2008,
                  "reviewScore": null
                }
              ];
            const actual = getCartTotal(cart);
            const expected = "Current total: $178.00";
            expect(actual).toEqual(expected);
        })
    })

    describe("emptyCart()",()=>{
        it("should empty the cart completely",()=>{
            const cart = [{
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              },
              {
                "title": "Jak and Daxter",
                "id": "ppQb",
                "platform": [
                  "Xbox"
                ],
                "priceInCents": 4000,
                "releaseYear": 2008,
                "reviewScore": null
              }];
            const actual = emptyCart(cart);
            const expected = [];
            expect(actual).toEqual(expected);
        });
    });

    describe("checkout()",() =>{
        it("should correctly print out a receipt with all purchases, and a total price",() =>{
            const cart = [{
                "title": "Call of Duty",
                "id": "BV6i",
                "platform": [
                  "Xbox",
                  "PlayStation"
                ],
                "priceInCents": 9800,
                "releaseYear": 2010,
                "reviewScore": 7
              },
              {
                "title": "Jak and Daxter",
                "id": "ppQb",
                "platform": [
                  "Xbox"
                ],
                "priceInCents": 4000,
                "releaseYear": 2008,
                "reviewScore": null
              }];
             const actual = checkout(cart);
             const expected = "Thank you for shopping with us! Here is your receipt \n------------------------\nCall of Duty, Price: $98.00\nJak and Daxter, Price: $40.00\n------------------------\nTOTAL: $138.00\n\nCart is now empty."
             expect(actual).toEqual(expected);
            });

        it("should return an error if the cart is empty",() =>{
            const cart = [];
            const actual = checkout(cart);
            const expected = "Cart is empty.";
            expect(actual).toEqual(expected);
        })
    })
})