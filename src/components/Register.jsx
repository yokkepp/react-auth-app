import React, { useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { Navigate } from "react-router-dom";

function Register() {
	const [registerEmail, setRegisterEmail] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");

	const handleEmailChange = (e) => {
		setRegisterEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setRegisterPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await createUserWithEmailAndPassword(
				auth,
				registerEmail,
				registerPassword
			);
		} catch (error) {
			alert("正しく入力してください");
		}
	};

	const [user, setUser] = useState("");

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
	}, []);

	return (
		<>
			{user ? (
				<Navigate to={`/`} />
			) : (
				<>
					<h1>新規登録</h1>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor='email'>メールアドレス</label>
							<input
								type='email'
								name='email'
								value={registerEmail}
								onChange={handleEmailChange}
							/>
						</div>
						<div>
							<label htmlFor='email'>パスワード</label>
							<input
								type='password'
								name='password'
								value={registerPassword}
								onChange={handlePasswordChange}
							/>
						</div>
						<button>登録する</button>
					</form>
				</>
			)}
		</>
	);
}

export default Register;
