import * as Notificaitons from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export function Notificaiton() {
	Notificaitons.setNotificationHandler({
		handleNotification: async (): Promise<Notificaitons.NotificationBehavior> => ({
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: true,
			shouldShowBanner: true,
			shouldShowList: true,
		}),
	});

	useEffect(() => {
		if (Platform.OS === 'android') {
			Notificaitons.setNotificationChannelAsync('default', {
				name: 'Default',
				importance: Notificaitons.AndroidImportance.MAX,
				sound: 'default',
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C',
			});
		}

		const subRecieved = Notificaitons.addNotificationReceivedListener((notification) => {
			console.log(notification.request.content.data);
		});

		return () => {
			subRecieved.remove();
		};
	}, []);

	return <></>;
}
