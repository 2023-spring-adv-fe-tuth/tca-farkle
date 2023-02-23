import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';

const Setup: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Setup</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Setup</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p>
                    Some setup stuff here...
                </p>
                <IonButton routerLink="/play">
                    Start Game
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Setup;