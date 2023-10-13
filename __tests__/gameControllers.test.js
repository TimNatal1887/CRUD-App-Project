const {create,index,show,destroy,edit,rate,} = require('../src/gameControllers');
const _ = require("lodash");
const {alphanumeric} = require("nanoid-dictionary");


describe("gameController",()=>{
    describe("create()",()=>{
        it("should create a games object with a title key that has the inputted name",()=>{
            const games = [];
            const input = "Kingdom Hearts";
            const actual = create(games,input)[0].title;
            const expected = "Kingdom Hearts";
            expect(actual).toEqual(expected);
        });

        it("should not list duplicate platforms when creating the platforms array",() =>{
          const games = [];
          const input = "Minecraft"
          const outcome = create(games,input)[0].platform;
          const actual = outcome.every(platform => outcome.lastIndexOf(platform) === outcome.indexOf(platform))
          const expected = true
          expect(actual).toEqual(expected);
        })

        it("should return null if a game with the given name is already in the list",()=>{
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
            }];
           const input = "Call of Duty";
           const actual = create(games,input);
           const expected = null;
           expect(actual).toEqual(expected);
        })

        it("should add a games object to an existing array",() =>{
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
                }];
            const input = "Red Dead Redemption 2";
            const actual = create(games,input).length;
            const expected = 2;
            expect(actual).toEqual(expected);
        });

        it("should add a given user rating to the reviewScore key",() =>{
            const games = [];
            const input1 = 'Minecraft';
            const input2 = 7;
            const actual = create(games,input1,input2)[0].reviewScore;
            const expected = 7;
            expect(actual).toEqual(expected);
        });
    });

    describe("index()",()=>{
        it("should list every game in the array into one string, where each game has its id, title, and price listed",()=>{
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
            const actual = index(games);
            const expected = "ID: BV6i | Title: Call of Duty | Price: $98.00\nID: ppQb | Title: Jak and Daxter | Price: $40.00";
            expect(actual).toEqual(expected);
        });
    });

    describe("show()",()=>{
        it("should return specific details about a given games ID, title, price, release year, and platforms",() =>{
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
            const input = "BV6i";
            const actual = show(games,input);
            const expected = "ID: BV6i | Title: Call of Duty | Price: $98.00. Released in 2010. Available on Xbox, and PlayStation.";
            expect(actual).toEqual(expected);
        });

        it("if the game is only available on one platform, will correctly list the one platform",()=>{
          const games = [
            {
              "title": "Call of Duty",
              "id": "BV6i",
              "platform": [
                "Xbox"
              ],
              "priceInCents": 9800,
              "releaseYear": 2010,
              "reviewScore": 7
            }];
          const input = "BV6i";
          const actual = show(games,input);
          const expected = "ID: BV6i | Title: Call of Duty | Price: $98.00. Released in 2010. Available on Xbox."
        })

        it("should return an error if a game with the given id cannot be found",() =>{
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
            const input = "unknown-id";
            const actual = show(games,input);
            const expected = `Game with ID of unknown-id could not be found.`;
        });
    })

    describe("destroy()",()=>{
        it("should remove the game object that matches the given ID from the array",()=>{
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
                const input = "BV6i";
                const actual = destroy(games,input);
                const expected = [
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
                expect(actual).toEqual(expected);
            });

            it("should return the original array if a game with given ID cannot be found",()=>{
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
            const input = "incorrect-id";
            const actual = destroy(games,input);
            const expected =  [    {
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
        expect(actual).toEqual(expected);
        });
     });

    describe("edit()",() =>{
        it("should update an existing games title when matched with an ID",() =>{
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
            const input1 = "BV6i";
            const input2 = "Team Fortress 2";
            const actual = edit(games,input1,input2)[0].title
            const expected = "Team Fortress 2";
            expect(actual).toEqual(expected);
        });

        it("should return the original array if an incorrect id was given",() =>{
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

            const input1 = "incorrect id";
            const input2 = "Halo";
            const actual = edit(games,input1,input2);
            const expected = [    {
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
            expect(actual).toEqual(expected);
        });
    });

    describe("rate()",() =>{
      it("should return the original array if the rating is not between 1 and 10",() =>{
          const games =  [
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
            }];

            const input = 0;
            const actual = rate(games,input);
            const expected =[
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
              }];
              expect(actual).toEqual(expected);
        });

        it("should update an existing games rating when matched with an ID",() =>{
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
            const input1 = "BV6i";
            const input2 = "9";
            const actual = rate(games,input1,input2)[0].reviewScore
            const expected = 9;
            expect(actual).toEqual(expected);
        });

        it("should return the original array if an incorrect id was given",() =>{
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

            const input1 = "incorrect id";
            const input2 = "10";
            const actual = rate(games,input1,input2);
            const expected = [    {
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
            expect(actual).toEqual(expected);
        });
    });
});