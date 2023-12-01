
import { Button } from "reactstrap";
import { useAppSelector } from "../hooks";
import { RootState } from "../store";





const Home: React.FC = () =>  {
   
   const user = useAppSelector((state: RootState) => state.user)
   return (
      <Button onClick={() => console.log(user)} />
      )
}

 export default Home;