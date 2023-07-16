import {useRouteError} from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError()
    console.log(error)

    return (
        <div>
            <h1>Ошибка!</h1>
            <p>Извините, произошла ошибка при работе приложения.</p>
            <p>
                <i>{error.statusText || error.massage}</i>
            </p>
        </div>
    )
}