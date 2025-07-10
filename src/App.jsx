import {Suspense, useState} from "react";
import "./App.css";
import i18n from "i18next";
import {initReactI18next, Trans, useTranslation} from "react-i18next";
import HttpBackend from "i18next-http-backend";

i18n
    .use(initReactI18next)
    .use(HttpBackend)
    .init({
        debug: true,
        option: "all",
        backend: {loadPath: "/translations/messages_{{lng}}.json"},
        fallbackLng: "en-GB",
        interpolation: {escapeValue: false},
    });

const App = () => {
    const {t} = useTranslation();
    const [count, setCount] = useState(0);
    const onChange = (event) => {
        i18n.changeLanguage(event.target.value);
        setCount((previousCount) => previousCount + 1);
    };
    return (
        <Suspense fallback={"Loading..."}>
            <div className="App">
                <header className="App-header">
                    <h1>{t("welcome")}</h1>
                    <p>
                        <Trans components={{bold: <strong/>, italic: <i/>}}>
                            sampleText
                        </Trans>
                    </p>
                    <p>{t("changed", {count})}</p>
                    <select name="language" onChange={onChange}>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                    </select>
                </header>
            </div>
        </Suspense>
    );
};

export default App;
