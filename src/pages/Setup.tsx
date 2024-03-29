import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonGrid,
  IonCol,
  IonRow,
  IonItem,
  IonCheckbox,
  IonLabel,
  IonList,
  IonFabButton,
  IonIcon,
  IonText,
  IonNavLink,
  IonInput,
} from '@ionic/react';
import { personAddOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { SetupInfo } from '../front-end-model';
import "./pageCSS/Setup.css"

export interface SetupProps {
  previousPlayers: string[];
  setSetupInfo: (info: SetupInfo) => void;
}

export const Setup: React.FC<SetupProps> = ({
  previousPlayers
  , setSetupInfo
}) => {

  // 
  // State hooks...
  // 
  const h = useHistory();
  const [newPlayerName, setNewPlayerName] = useState("");
  const [chosenPlayers, setChosenPlayers] = useState(
    previousPlayers.map(x => ({
      name: x
      , checked: false
    }))
  );

  const togglePlayer = (name: string) => setChosenPlayers(
    chosenPlayers.map(x => ({
      ...x
      , checked: x.name == name ? !x.checked : x.checked
    }))
  );

  const startGame = () => {
    console.log(chosenPlayers);

    setSetupInfo({
      start: new Date().toISOString()
      , chosenPlayers: chosenPlayers
        .filter(x => x.checked)
        .map(x => x.name)
    });
    h.push("/play");
  }

  const validateAndAddNewPlayer = () => {
    console.log("validatedplayer", newPlayerName);
    // Validate first
    if (
      newPlayerName.length == 0
      || chosenPlayers.some(x => x.name.localeCompare(newPlayerName) == 0)
    ) {
      return;
    }
    setChosenPlayers(
      [
        ...chosenPlayers
        , {
          name: newPlayerName
          , checked: true
        }
      ]
    );
    setNewPlayerName("");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Farkle Companion App</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonGrid>

          <IonRow>
            <IonCol>
              <IonTitle id='setupTitle'>Setup</IonTitle>
              <IonText id='setupText'>Select who's playing or add someone new</IonText>

              <IonList id='IonListandNewPlayerbutton'>
                <IonItem
                  id='newPlayerNameInput'
                  fill="solid"
                >
                  <IonLabel position="floating">Add Player</IonLabel>
                  <IonInput
                    placeholder="Enter text"
                    value={newPlayerName}
                    onIonChange={(e: any) => setNewPlayerName(e.target.value)} 
                  >
                  </IonInput>
                </IonItem>

                <IonFabButton size="small" onClick={validateAndAddNewPlayer}>
                  <IonIcon icon={personAddOutline}></IonIcon>
                </IonFabButton>
              </IonList>
            </IonCol>
          </IonRow>
          {
            chosenPlayers.map(x => (
              <IonRow>
                <IonCol>
                  <IonList>
                    <IonItem>
                      <IonCheckbox slot="start"
                        checked={x.checked}
                        onIonChange={() => togglePlayer(x.name)}>{x.name}
                      </IonCheckbox>
                      <IonLabel>{x.name}</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCol>
              </IonRow>
            ))
          }
          <IonRow>
            <IonCol>
              <IonNavLink routerDirection="forward">
                <IonButton onClick={startGame} color="success">Start Game</IonButton>
              </IonNavLink>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

// new ionic 7 input cleaner not sure if I should upgrade yet
{/* Before
<IonItem>
  <IonLabel position="floating">Email:</IonLabel>
  <IonInput></IonInput>
</IonItem>

After
<IonItem>
  <IonInput label="Email:" labelPlacement="floating"></IonInput>
</IonItem> */}

