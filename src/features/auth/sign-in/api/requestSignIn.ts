interface RequestSignInParams {
  email: string;
  password: string;
}

export async function requestSignIn({ email, password }: RequestSignInParams) {
  console.log("TODO: auth 연결 전 임시 로그인 요청", {
    email,
    password,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    ok: true,
  };
}
