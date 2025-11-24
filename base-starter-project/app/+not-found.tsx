import { OButton, OText, OView } from '@/base';
import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <OView style={styles.container}>
        <OText className="text-2xl font-bold mb-4">This screen doesn't exist.</OText>
        <Link href="/" asChild>
          <OButton variant="primary">Go to home screen!</OButton>
        </Link>
      </OView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

