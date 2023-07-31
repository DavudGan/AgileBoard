import { useSelector } from "react-redux"

export function useAuth() {
    const {name, pass, id} = useSelector(state => state.user)

    return {
        isAuth: !!name,
        name,
        pass,
        id,
    }
}