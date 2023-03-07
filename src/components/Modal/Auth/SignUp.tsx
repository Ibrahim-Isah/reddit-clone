import { Input } from '@chakra-ui/input';
import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { auth, firestore } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const SignUp = () => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [error, setError] = useState('');
	const [createUserWithEmailAndPassword, userCred, loading, userError] =
		useCreateUserWithEmailAndPassword(auth);
	const [signUpForm, setSignUpForm] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (error) setError('');
		if (signUpForm.password !== signUpForm.confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
	};
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSignUpForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	useEffect(() => {
		if (userCred) {
			createUserDocument(userCred.user);
		}
	}, [userCred]);

	const createUserDocument = async (user: User) => {
		await addDoc(
			collection(firestore, 'users'),
			JSON.parse(JSON.stringify(user))
		);
	};
	return (
		<form onSubmit={onSubmit}>
			<Input
				required
				type={'email'}
				name='email'
				placeholder='Email'
				mb={2}
				onChange={onChange}
				fontSize='10pt'
				_placeholder={{
					color: 'gray.500',
				}}
				_hover={{
					bg: 'white',

					border: '1px solid',
					borderColor: 'blue.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				bg='gray.50'
			/>
			<Input
				required
				type={'password'}
				name='password'
				placeholder='password'
				onChange={onChange}
				fontSize='10pt'
				mb={2}
				_placeholder={{
					color: 'gray.500',
				}}
				_hover={{
					bg: 'white',

					border: '1px solid',
					borderColor: 'blue.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				bg='gray.50'
			/>
			<Input
				required
				type={'password'}
				name='confirmPassword'
				placeholder='Confirm Password'
				onChange={onChange}
				fontSize='10pt'
				mb={2}
				_placeholder={{
					color: 'gray.500',
				}}
				_hover={{
					bg: 'white',

					border: '1px solid',
					borderColor: 'blue.500',
				}}
				_focus={{
					outline: 'none',
					bg: 'white',
					border: '1px solid',
					borderColor: 'blue.500',
				}}
				bg='gray.50'
			/>
			<Text color='red.500' fontSize='9pt' mb={2} textAlign='center'>
				{error ||
					FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
			</Text>
			<Button
				type='submit'
				width='100%'
				height='36px'
				mt={2}
				mb={2}
				isLoading={loading}
			>
				Sign Up
			</Button>
			<Flex fontSize='9pt' justifyContent={'center'}>
				<Text mr={1}>Already a Redditor? </Text>
				<Text
					color={'blue.500'}
					fontWeight={700}
					cursor={'pointer'}
					onClick={() =>
						setAuthModalState((prev) => ({
							...prev,
							view: 'login',
						}))
					}
				>
					Log In
				</Text>
			</Flex>
		</form>
	);
};

export default SignUp;
