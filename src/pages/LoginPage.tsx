// src/pages/LoginPage.tsx

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // useLocation 추가
import { signIn, signInWithGoogle, getAuthErrorMessage } from "@/lib/auth";

function LoginPage() {
  // ... 기존 상태들 ...

  const navigate = useNavigate();
  const location = useLocation(); // 추가

  // 로그인 전에 가려던 페이지 (없으면 홈으로)
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true }); // 수정: 원래 페이지로 이동
    } catch (err: unknown) {
      // ... 에러 처리 ...
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setIsLoading(true);

    try {
      await signInWithGoogle();
      navigate(from, { replace: true }); // 수정: 원래 페이지로 이동
    } catch (err: unknown) {
      // ... 에러 처리 ...
    } finally {
      setIsLoading(false);
    }
  };

  // ... 나머지 JSX ...
}
