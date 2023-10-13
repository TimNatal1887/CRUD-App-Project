const { readJSONFile, writeJSONFile } = require('./src/helpers');
const games = readJSONFile('./data', 'games.json');
const {create,index,show,destroy,edit,rate} = require('./src/gameControllers')

const inform = console.log;

function run() {
  let writeToFile = false;
  let updatedGames = []
  const action = process.argv[2];
  const game = process.argv[3];

  switch (action) {
    case 'index':
      const gamesView = index(games);
      inform(gamesView);
      break;
    case 'create':
      updatedGames = create(games,game);
      if(updatedGames){
        inform(`${game} has been added to your library.`)
        writeToFile = true;
      }else{
        inform(`${game} already exists in your library!`)
      }
      break;
    case 'show':
      const gameView = show(games,game);
      inform(gameView);
      break;
    case 'update':
      updatedGames = edit(games,game,process.argv[4]);
      writeToFile = true;
      break;
    case 'destroy':
      updatedAnimals = destroy(games,game);
      writeToFile = true;
      break;
    case 'rate':
      inform(`Game rating of ${process.argv[4]} to ${game}.`);
      break;
    default:
      inform('There was an error.');
  };
  if(writeToFile){
    writeJSONFile('./data', 'games.json', updatedGames);
  };
};

run();
