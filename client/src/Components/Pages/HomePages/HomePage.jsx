import HomeLinks from "../../HomLinks/HomeLinks"
import s from "./HomePage.module.css"
import {Outlet} from "react-router-dom"

const HomePage = () => {
  return (
    <div className={s.container}>
      <HomeLinks />
      <Outlet />
    </div>
  )
}

export default HomePage
