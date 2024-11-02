import { useEffect } from "react"
import HomeLinks from "../../HomLinks/HomeLinks"
import s from "./HomePage.module.css"
import {Outlet, useNavigate} from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    let token = localStorage.getItem("proManage")
    if(!token) navigate("/auth/login")
  })
  return (
    <div className={s.container}>
      <HomeLinks />
      <Outlet />
    </div>
  )
}

export default HomePage
