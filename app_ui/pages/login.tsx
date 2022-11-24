import React, {CSSProperties, useEffect, useState} from "react";
import {NextPage} from "next";
import {Fade} from "react-awesome-reveal";
import Head from "next/head";
import {Button, InputLabel, Tab, Tabs, TextField} from "@mui/material";
import axios from "axios";
import {useRouter} from "next/router";

const Login : NextPage = () => {

    const buttonStyle : CSSProperties = {
        fontSize : "23px",
        backgroundColor : "black",
        color : "turquoise"
    }

    const router = useRouter()

    const [tab,setTab] = useState(0)
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [savedUsername,setSavedUsername] : [string | null, any] = useState(null)


    const changeTab = (event: any, newTab: number)=>{
        setUsername("")
        setPassword("")
        setName("")
        setEmail("")
        setConfirmPassword("")
        setTab(newTab)
    }

    const changeUsername = (event : any) => {
        setUsername(event.target.value)
    }

    const changePassword = (event : any) => {
        setPassword(event.target.value)
    }

    const changeName = (event : any) => {
        setName(event.target.value)
    }

    const changeEmail = (event : any) => {
        setEmail(event.target.value)
    }

    const changeConfirmPassword = (event : any) => {
        setConfirmPassword(event.target.value)
    }

    const handleLogin = ()=>{
        if(username==="" || password==="") {
            alert("One or more fields are empty")
            return
        }
        // axios({
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json"
        //     },
        //     url : `${process.env.REACT_APP_API_BASE_URL}/authenticate`,
        //     data : {
        //         username : username,
        //         password : password
        //     }
        // }).then(response => {
        //     localStorage.setItem("sadchatUsername",username)
        //     localStorage.setItem("sadchatJwtToken",response.data.token)
        //     router.push("/dashboard")
        // }).catch(error => {
        //     console.log(error)
        //     alert(error.response.data)
        // })
    }

    const handleSignUp = ()=>{
        if(username==="" || password==="" || email==="" || name==="" || password==="") {
            alert("One or more fields are empty")
            return
        }
        if(password!==confirmPassword) {
            alert("Password and confirm password do not match")
            return
        }
        console.log(password)
        // axios({
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json"
        //     },
        //     url : `${process.env.REACT_APP_API_BASE_URL}/user`,
        //     data : {
        //         "username" : username,
        //         "password" : password,
        //         "firstName" : firstName,
        //         "lastName" : lastName,
        //         "email" : email
        //     }
        // }).then(response => {
        //     localStorage.setItem("sadchatUsername",username)
        //     localStorage.setItem("sadchatJwtToken",response.data.token)
        //     router.push("/dashboard")
        // }).catch(error => {
        //     console.log(error)
        //     alert(error.response.data)
        // })
    }

    useEffect(()=>{
        // setSavedUsername(localStorage.getItem("sadchatUsername"))
        // console.log(savedUsername)
        // if(savedUsername) {
        //     router.push("/dashboard")
        // }
    },[])

    return (
        <div className="flex flex-col items-center w-[100%]">
            <Head>
                <title>Login</title>
            </Head>
            <Fade direction="up" triggerOnce className="text-[70px] font-bold m-[15px] text-center">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Let's upload some docs hehe
            </Fade>
            <div className="rounded-[10px] w-[70%] shadow-xl">
                <Tabs
                    value={tab}
                    onChange={changeTab}
                    indicatorColor="primary"
                    variant="fullWidth"
                    className="rounded-t-[10px]">
                    <Tab
                        label="Login"
                        style={buttonStyle}/>
                    <Tab
                        label="Sign up"
                        style={buttonStyle}/>
                </Tabs>
                {
                    (tab==0) ? (
                        <div className="p-[10px] h-[500px] flex flex-col items-center justify-evenly">
                            <Fade
                                direction="left"
                                triggerOnce
                                className="w-[90%]">
                                <TextField
                                    variant="outlined"
                                    value={username}
                                    onChange={changeUsername}
                                    label="Username"
                                    style={{
                                        width : "100%"
                                    }}
                                    required/>
                            </Fade>

                            <Fade
                                direction="right"
                                triggerOnce
                                className="w-[90%]">
                                <TextField
                                    variant="outlined"
                                    value={password}
                                    onChange={changePassword}
                                    type="password"
                                    label="Password"
                                    style={{
                                        width : "100%"
                                    }}
                                    required/>
                            </Fade>


                            <Button
                                style={buttonStyle}
                                onClick={handleLogin}>
                                Login
                            </Button>
                        </div>
                    ) : (
                        <div className="p-[10px] h-[500px] flex flex-col items-center justify-evenly">
                            <Fade
                                direction="left"
                                triggerOnce
                                className="w-[90%]">
                                <TextField
                                    variant="outlined"
                                    value={name}
                                    onChange={changeName}
                                    label="Name"
                                    style={{
                                        width : "100%"
                                    }}
                                    required/>
                            </Fade>

                            <Fade
                                direction="left"
                                triggerOnce
                                className="w-[90%]">
                                <TextField
                                    variant="outlined"
                                    value={username}
                                    onChange={changeUsername}
                                    label="Username"
                                    style={{
                                        width : "100%"
                                    }}
                                    required/>
                            </Fade>

                            <Fade
                                direction="right"
                                triggerOnce
                                className="w-[90%]">
                                <TextField
                                    variant="outlined"
                                    value={email}
                                    onChange={changeEmail}
                                    label="Email"
                                    style={{
                                        width : "100%"
                                    }}
                                    required/>
                            </Fade>

                            <Fade
                                direction="left"
                                triggerOnce
                                className="w-[90%]">
                                <TextField
                                    variant="outlined"
                                    value={password}
                                    onChange={changePassword}
                                    type="password"
                                    label="Password"
                                    style={{
                                        width : "100%"
                                    }}
                                    required/>
                            </Fade>
                            <Fade
                                direction="right"
                                triggerOnce
                                className="w-[90%]">
                                <TextField
                                    variant="outlined"
                                    value={confirmPassword}
                                    onChange={changeConfirmPassword}
                                    type="password"
                                    label="Confirm Password"
                                    style={{
                                        width : "100%"
                                    }}
                                    required/>
                            </Fade>
                            <Button
                                style={buttonStyle}
                                onClick={handleSignUp}>
                                Sign Up
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Login