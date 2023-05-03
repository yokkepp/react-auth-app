import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig";
import { Navigate } from "react-router-dom";

function Login() {
	const [loginEmail, setLoginEmail] = useState("");
	const [loginPassword, setLoginPassword] = useState("");

	const handleEmailChange = (e) => {
		setLoginEmail(e.target.value);
	};
	const handlePasswordChange = (e) => {
		setLoginPassword(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
		} catch (error) {
			alert("メールアドレスまたはパスワードが間違いっています");
		}
	};

	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});
	}, []);

	return (
		<>
			{!loading && (
				<>
					{user ? (
						<Navigate to={`/`} />
					) : (
						<>
							<h1>ログインページ</h1>
							<form onSubmit={handleSubmit}>
								<div>
									<label htmlFor='email'>メールアドレス</label>
									<input
										type='email'
										name='email'
										value={loginEmail}
										onChange={handleEmailChange}
									/>
								</div>
								<div>
									<label htmlFor='email'>パスワード</label>
									<input
										type='password'
										name='password'
										value={loginPassword}
										onChange={handlePasswordChange}
									/>
								</div>
								<button>ログイン</button>
							</form>
						</>
					)}
				</>
			)}
		</>
	);
}

export default Login;
