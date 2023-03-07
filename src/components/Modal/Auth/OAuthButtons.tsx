import { Button, Flex, Image, Text } from '@chakra-ui/react';
import { User } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebase/clientApp';

const OAuthButtons = () => {
	const [signInWithGoogle, userCred, loading, error] =
		useSignInWithGoogle(auth);

	useEffect(() => {
		if (userCred) {
			createUserDocument(userCred.user);
		}
	}, [userCred]);
	const createUserDocument = async (user: User) => {
		const userDocRef = doc(firestore, 'users', user.uid);
		await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
	};
	return (
		<>
			<Flex direction={'column'} width='100%' mb={4}>
				<Button
					variant={'oauth'}
					mb={2}
					isLoading={loading}
					onClick={() => signInWithGoogle()}
				>
					<Image
						src='/images/googlelogo.png'
						alt='google'
						height={'20px'}
						mr={4}
					/>
					Continue with Google
				</Button>
				{/* <Button variant={'oauth'}>Continue with Twitter</Button> */}
				{error && <Text color='red'>{error.message}</Text>}
			</Flex>
		</>
	);
};

export default OAuthButtons;
