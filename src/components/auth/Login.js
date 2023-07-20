import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("john.doe@example.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}&_embed=userRoles`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    let roles
                    fetch('http://localhost:8088/roles')
                        .then(res => res.json())
                        .then((data) => roles = data)
                        .then(() => {
                            user.roles = []
                            user.userRoles.forEach(role => {
                                user.roles.push(roles.find(r => r.id === role.roleId).name)
                            })
                            localStorage.setItem("crm_user", JSON.stringify({
                                id: user.id,
                                roles: user.roles,
                                firstName: user.firstName
                            }))

                            navigate("/")
                        })
                } else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Dunder Mifflin</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
        </main>
    )
}