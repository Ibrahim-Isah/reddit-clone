import { Input } from '@chakra-ui/input';
import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { authModalState } from '../../../atoms/authModalAtom';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';

type Props = {};

const Login = (props: Props) => {
	const setAuthModalState = useSetRecoilState(authModalState);
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const [loginForm, setLoginForm] = useState({
		email: '',
		password: '',
	});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		signInWithEmailAndPassword(loginForm.email, loginForm.password);
	};
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
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
			{error && (
				<Text color='red.500' fontSize='9pt' textAlign='center'>
					{FIREBASE_ERRORS[error.message as keyof typeof FIREBASE_ERRORS]}
				</Text>
			)}

			<Button
				type='submit'
				width='100%'
				height='36px'
				mt={2}
				mb={2}
				isLoading={loading}
			>
				Log In
			</Button>
			<Flex justifyContent={'center'} mb={2}>
				<Text mr={1} fontSize='9pt'>
					Forgot your password?
				</Text>
				<Text
					color={'blue.500'}
					fontWeight={700}
					cursor={'pointer'}
					fontSize='9pt'
					onClick={() =>
						setAuthModalState((prev) => ({
							...prev,
							view: 'resetPassword',
						}))
					}
				>
					Reset it
				</Text>
			</Flex>
			<Flex fontSize='9pt' justifyContent={'center'}>
				<Text mr={1}>New here</Text>
				<Text
					color={'blue.500'}
					fontWeight={700}
					cursor={'pointer'}
					onClick={() =>
						setAuthModalState((prev) => ({
							...prev,
							view: 'signup',
						}))
					}
				>
					Sign Up
				</Text>
			</Flex>
		</form>
	);
};

export default Login;
