import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import Qrcode from "../../app/components/Qrcode";
import { BrowserRouter, MemoryRouter, Route, Router } from "react-router-dom";
import { UserContext } from "../../context/userContext";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn().mockReturnValue({ id: 1 }),
    useNavigate: jest.fn()
}))

function renderQrcodeWithUserProvider(user){
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <UserContext.Provider value={user}>
                <Qrcode />
            </UserContext.Provider>
        </Router>,
    )
}

// jest.mock("userContext", () => ({
//     user: React.useContext(userContext)
// }))

describe("Qrcode component", () => {
    
    // test("Qrcode will redirect to signin with id in url", () => {
    //     const id = 1
    //     // jest.spyOn(Router, 'useParams').mockReturnValue({ id: id })
    //     renderQrcodeWithUserProvider(null)
    //     expect(history.location.pathname).toBe(`/signin/${id}`)
    // })
    // test("Qrcode will redirect to select player with id in url", () => {
    //     const user = { id: 1, name: "test" }
    //     const id = 1
    //     // jest.spyOn(Router, 'useParams').mockReturnValue({ id: id })
    //     renderQrcodeWithUserProvider(user)
    //     console.log(history);
    //     // expect(history.location.pathname).toBe(`/game/${id}/select-player`)
    // })

    const history = createMemoryHistory();
    render(
            <Router >
                <Qrcode />
            </Router>
    )
    // expect(history.location.pathname).toBe(`/signin/1`)
    console.log(history);
})
