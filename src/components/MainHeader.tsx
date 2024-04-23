import { 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonRow,
    IonCol
} from "@ionic/react";
import { DarkMode } from "./DarkMode";

export const MainHeader: React.FC = () => {
	return (
		<IonHeader translucent={true}>
			<IonToolbar>
				<IonTitle>Farkle App</IonTitle>
				
                <IonRow>
					<IonCol className="darkModeContainer">
						<DarkMode />
					</IonCol>
				</IonRow>
			
            </IonToolbar>
		</IonHeader>
	);
};
