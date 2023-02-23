import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Farkle Companion App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Farkle Companion App</IonTitle>
          </IonToolbar>
        </IonHeader>

        <Link to="/setup">
          Play Farkle
        </Link>

        {/* <IonButton
          onClick={(e) => {
            e.preventDefault();
            history.push('/setup');
          }}
        >
          Play Farkle
        </IonButton> */}
        
        {/* <ExploreContainer /> */}
      </IonContent>
    </IonPage>
  );
};

export default Home;
