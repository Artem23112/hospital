import { Unsubscribe } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { RequireAuth } from "./components/HOC/access-restrictions/RequireAuth";
import { subscribeToUserAvailability } from "./firebase/subscribe-to-user-availability";
import { LoginPage } from "./pages/login-page/LoginPage";
import { ProfilePage } from "./pages/profile-page/ProfilePage";
import { SignUpPage } from "./pages/signup-page/SignUpPage";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { PATHS } from "./shared/constants/paths";

export const App = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(({ authentication }) => authentication.isAuth);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe: Unsubscribe = subscribeToUserAvailability(dispatch);
    return () => void unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuth) return;

    navigate(PATHS.profile.home);
  }, [isAuth]);

  return (
    <>
      <Routes>
        <Route path={PATHS.home} element={<Navigate to={PATHS.login} />} />
        <Route path={PATHS.login} element={<LoginPage />} />
        <Route path={PATHS.singUp} element={<SignUpPage />} />
        <Route
          path={`${PATHS.profile.home}*`}
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
      </Routes>
    </>
  );
};
