import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';

const Setup: React.FC = () => {
    const hist = useHistory();

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Play</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Play</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <p>
                    Some data collection stuff here...
                </p>
                <IonButton 
                    onClick={(e) => hist.go(-2)}
                >
                    Done
                </IonButton>            
            </IonContent>
        </IonPage>
    );
};

export default Setup;