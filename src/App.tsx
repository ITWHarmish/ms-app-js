import "./App.scss";

import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { auth } from "./firebase";
import { readHoliday } from "./redux/actions/holidayAction";
import { readProject } from "./redux/actions/projectAction";
import { readTask } from "./redux/actions/taskAction";
import { readTodo } from "./redux/actions/todoAction";
import { readTrainingList } from "./redux/actions/trainingListAction";
import { getAllUsers } from "./redux/actions/userAction";
import { useAppDispatch } from "./redux/hooks";
import AppRoutes from "./routes/AppRoutes";
import { getUserById } from "./services/auth.crud";
import { USER_ROLE_TYPE } from "./util/enums";
import { socket } from "./util/lib";
import { API_URL } from "./util/secrets";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const [userAccess, setUserAccess] = useState(null);
  const [isExecutor, setIsExecutor] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserById(user.uid).then((userData) => {
          setCurrentUser({ uid: user.uid, ...userData });
          setIsExecutor(userData.type === USER_ROLE_TYPE.EXECUTOR ? true : false);
          dispatch(readProject());
          dispatch(readHoliday());
          dispatch(getAllUsers());
          dispatch(readTask());
          dispatch(readTodo({ uid: user.uid }));
          dispatch(readTrainingList());
        });
        axios
          .get(`${API_URL}/checkaccess/${user.uid}`)
          .then((response) => {
            setUserAccess(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        navigate("/login");
      }
    });

    socket.on("connect", () => console.info("socket connected!"));
    socket.on("project-change", () => dispatch(readProject()));
    socket.on("holiday-change", () => dispatch(readHoliday()));
    socket.on("task-change", () => dispatch(readTask()));

    
  }, []);

  return (
    <div className="App">
      <AuthProvider value={{ currentUser, isExecutor, userAccess }}>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
};

export default App;
