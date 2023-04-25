import { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Home, Setup, Play } from './pages';
import {
  GameResult,
  calculateLeaderboard,
  SetupInfo,
  getPreviousPlayers,
  getShortestGameDuration,
  getLongestGameDuration,
  getAvgGameDuration,
  getPercentGamesReallyCoolThingHappened,
  countZeroTurns,
} from './front-end-model';

import localforage from "localforage";
import { loadGamesFromCloud, saveGameToCloud } from "./tca-cloud-api";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
setupIonicReact();


// const hardcodedGameResults: GameResult[] = [
//   {
//     winner: "Tom"
//     , players: [
//       {
//         name: "Tom",

//       },
//       {
//         name: "Taylor",

//       }
//     ]
//     , start: "2023-03-23T17:38:03.023Z"
//     , end: "2023-03-23T17:40:03.023Z"
//     , reallyCoolThingHappened: false
//     , turns: []
//   }
//   , {
//     winner: "Taylor"
//     , players: [
//       {
//         name: "Jack",

//       },
//       {
//         name: "Taylor",

//       }
//     ]
//     , start: "2023-03-23T17:38:03.023Z"
//     , end: "2023-03-23T17:40:03.023Z"
//     , reallyCoolThingHappened: false
//     , turns: []

//   }
//   , {
//     winner: "Taylor"
//     , players: [
//       {
//         name: "Tom",

//       },
//       {
//         name: "Taylor",

//       },
//       {
//         name: "Jack",

//       }
//     ]
//     , start: "2023-03-23T17:38:03.023Z"
//     , end: "2023-03-23T17:40:03.023Z"
//     , reallyCoolThingHappened: false
//     , turns: []

//   }
//   , {
//     winner: "X"
//     , players: [
//       {
//         name: "X",

//       },
//       {
//         name: "Joe",

//       }
//     ]
//     , start: "2023-03-23T17:38:03.023Z"
//     , end: "2023-03-23T17:40:03.023Z"
//     , reallyCoolThingHappened: false
//     , turns: []

//   }
//   , {
//     winner: "X"
//     , players: [
//       {
//         name: "X",

//       },
//       {
//         name: "Joe",

//       }
//     ]
//     , start: "2023-03-23T17:38:03.023Z"
//     , end: "2023-03-23T17:40:03.023Z"
//     , reallyCoolThingHappened: false
//     , turns: []
//   }
//   , {
//     winner: "Joe"
//     , players: [
//       {
//         name: "X",

//       },
//       {
//         name: "Joe",

//       }
//     ]
//     , start: "2023-03-23T17:38:03.023Z"
//     , end: "2023-03-23T17:40:03.023Z"
//     , reallyCoolThingHappened: false
//     , turns: []
//   }
//   , {
//     winner: "Jack"
//     , players: [
//       {
//         name: "X",

//       },
//       {
//         name: "Joe",

//       },
//       {
//         name: "Jack",

//       }
//     ]
//     , start: "2023-03-23T17:38:03.023Z"
//     , end: "2023-03-23T17:48:03.023Z"
//     , reallyCoolThingHappened: false
//     , turns: []
//   }
// ];

const App = () => {
  const [results, setGameResults] = useState<GameResult[]>([]);
  // const [results, setGameResults] = useState([]);

  const [setupInfo, setSetupInfo] = useState<SetupInfo>({
    start: ""
    , chosenPlayers: []
  });

  // 
  // State hooks...
  // 
  const [emailKeySaved, setEmailKeySaved] = useState("");

  // 
  // useEffect hook
  // 
  useEffect(
    () => {
      const loadEmailKeyAndGameResults = async () => {

        try {
          const ek = String(await localforage.getItem("emailKey")) ?? "";

          if (ek.length > 0) {
            const resultsFromCloud = await loadGamesFromCloud(
              ek
              , "tca-farkle"
            );

            if (!ignore) {
              setGameResults(resultsFromCloud);
            }
          }

          if (!ignore) {
            setEmailKeySaved(ek);
          }
        } catch (err) {
          console.error(err);
        }
      };
      let ignore = false;
      loadEmailKeyAndGameResults();
      return () => {
        ignore = true;
      };
    }, [emailKeySaved]
  );

  //
  // Helper functions...
  //
  const saveEmailKey = async (email: string) => {
    try {
      await localforage.setItem(
        "emailKey"
        , email
      );

      setEmailKeySaved(email);
    }
    catch (err) {
      console.error(err);
    }
  };

  const addGameResult = (r: GameResult) => {
    // Save the game result to the cloud
    saveGameToCloud(
      emailKeySaved
      , "tca-farkle"
      , r.end
      , r
    );

    setGameResults([
      ...results
      , r
    ]);
  };

  //
  // JSX
  //

  return (
    <IonApp>

      <IonReactHashRouter>
        <IonRouterOutlet>
          <Route exact path="/">
            <Home
              leaderboardData={calculateLeaderboard(results)}
              shortestGameDuration={getShortestGameDuration(results)}
              longestGameDuration={getLongestGameDuration(results)}
              avgGameDuration={getAvgGameDuration(results)}
              reallyCoolThingHappenedPercent={getPercentGamesReallyCoolThingHappened(results)}
              countZeroTurns={countZeroTurns(results)}
              saveEmailKeyFunc={saveEmailKey}
              currentEmail={emailKeySaved}
            />
          </Route>

          <Route exact path="/setup">
            <Setup
              previousPlayers={getPreviousPlayers(results)}
              setSetupInfo={setSetupInfo}
            />
          </Route>

          <Route exact path="/play">
            <Play addGameResultFunc={addGameResult}
              setupInfo={setupInfo}
            />
          </Route>
        </IonRouterOutlet>
      </IonReactHashRouter>
    </IonApp >
  );
};
export default App;
// remeber onIonChange not onChange send tom a $1 everytime read

