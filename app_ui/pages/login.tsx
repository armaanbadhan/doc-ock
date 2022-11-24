import React, {ChangeEvent, CSSProperties, useEffect, useState} from "react";
import {NextPage} from "next";
import {Fade} from "react-awesome-reveal";
import Head from "next/head";
import {Button, FormControlLabel, InputLabel, Radio, RadioGroup, Tab, Tabs, TextField} from "@mui/material";
import axios from "axios";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    const [type, setType] = useState("user")
    const [savedUsername,setSavedUsername] = useState<string | null>()


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

    const changeConfirmPassword = (event : ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value)
    }

    const changeType = (event: ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value)
    }

    const handleLogin = ()=>{
        if(username==="" || password==="") {
            alert("One or more fields are empty")
            return
        }
        axios({
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            url : `${process.env.NEXTAUTH_URL}/login`,
            data : {
                username : username,
                password : password
            }
        }).then(response => {
            if(response.data === 0) {
                alert("Login failed, please check your details")
            }
            else {
                localStorage.setItem("docuser", username)
                localStorage.setItem("doctype", response.data === 1 ? "user" : "admin")
                router.push("/dashboard")
            }
        }).catch(error => {
            console.log(error)
            alert(error.response.data)
        })
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

        if(username.includes("-")) {
            alert("Heiphen not allowed in username :redeyes:")
            return
        }
        axios({
            method: "POST",
            url: `${process.env.NEXTAUTH_URL}/signup`,
            headers: {
                "Content-Type": "application/json"
            },
            data: {
                username: username,
                password: password,
                name: name,
                type: type,
                email: email
            }
        }).then(response=> {
            if(response.data === 1) {
                localStorage.setItem("docuser", username)
                localStorage.setItem("doctype", type)
                router.push("/dashboard")
            }
            else {
                alert("Sign up failed, username already exists")
            }
        }).catch(error=> {
            alert(error)
            console.log(`${process.env.NEXTAUTH_URL}`)
            console.log(error)
        })

    }

    useEffect(()=>{
        setSavedUsername(localStorage.getItem("docuser"))
        if(savedUsername) {
            router.push("/dashboard")
        }
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

                            <Fade
                                direction="up"
                                triggerOnce
                                className="w-[90%] flex items-center"
                            >
                                <div className="text-center w-full font-bold text-[20px]">Who are you?</div>
                                <RadioGroup aria-required onChange={changeType} value={type} className="flex-auto flex flex-row justify-evenly items-center">
                                    <FormControlLabel control={<Radio />} label="User" value="user" />
                                    <FormControlLabel control={<Radio />} label="Admin" value="admin" />
                                </RadioGroup>
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