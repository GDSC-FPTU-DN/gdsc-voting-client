import { useEffect, useRef, useState } from "react";
import "./App.css";
import Loading from "./components/Loading";
import Background from "./components/Background";
import logo from "./assets/logo.png";
import CandidateCard from "./components/Candidate";
import Indicator from "./components/Indicator";
import Spacer from "./components/Spacer";
import { useSearchParams } from "react-router-dom";
import { getSchema } from "./apis/getSchema";
import { Position } from "./types/position";
import { postSubmit } from "./apis/postSubmit";
import getIp from "./apis/getIp";
import getImageUrl from "./utils/getImageUrl";
import { getLanguage } from "./utils/languages";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCandidate, setSelectedCandidate] = useState(-1);
  const [endpoint, _] = useSearchParams();
  const [data, setData] = useState<Position[]>([] as Position[]);
  const [status, setStatus] = useState<number>(0);
  const language = useRef(getLanguage());

  function handleSelectCandidate(index: number) {
    setSelectedCandidate(index);
  }

  function handleChangePage(index: number) {
    setCurrentPage(index);
    setSelectedCandidate(-1);
    if (index > 1) {
      handlePostVote();
    }
  }

  async function handlePostVote() {
    const body = {
      position: data[currentPage - 1].title,
      candidate: data[currentPage - 1].candidates[selectedCandidate].name,
      ip: await getIp(),
    };
    postSubmit(endpoint.get("endpoint") || "", body).then((res) => {
      console.log(res);
      setStatus(res.status);
    });
  }

  useEffect(() => {
    getSchema(endpoint.get("endpoint") || "").then((res) => {
      setStatus(res?.status || 0);
      if (res?.status === 200) {
        setData(res.data);
        setIsLoaded(true);
      }
    });
  }, [endpoint.get("endpoint")]);

  return (
    <div
      className="App"
      style={{
        boxShadow: `0 -1.5rem 2rem -1.5rem var(--color-${
          status === 200 ? "green" : "red"
        }) inset`,
      }}
    >
      {isLoaded ? (
        <div className="contents-container">
          <div className="contents-logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="contents-wrapper">
            <div
              className="contents-choices"
              style={{
                width: `${(data.length + 2) * 100}%`,
                transform: `translateX(-${
                  (currentPage * 100) / (data.length + 2)
                }%)`,
              }}
            >
              <div className="contents-choice">
                <div className="choice-welcome-title">
                  {language.current.welcomeScreen.message}{" "}
                  {language.current.appName}
                  <Spacer size={16} />
                  <span>
                    {language.current.welcomeScreen.instructionPrefix}{" "}
                    <code>{language.current.buttons.next}</code>{" "}
                    {language.current.welcomeScreen.instructionSuffix}
                  </span>
                </div>
              </div>
              {data.map((_data, index) => (
                <div key={index} className="contents-choice">
                  <div className="choice-title">{_data.title}</div>
                  <div className="choice-description">{_data.description}</div>
                  {_data.candidates.map((candidate, index) => (
                    <CandidateCard
                      key={index}
                      name={candidate.name}
                      description={candidate.description}
                      imageUrl={getImageUrl(
                        endpoint.get("endpoint") || "",
                        candidate.imageUrl || ""
                      )}
                      isActive={index === selectedCandidate}
                      onClick={() => handleSelectCandidate(index)}
                    />
                  ))}
                </div>
              ))}
              <div className="contents-choice">
                <div className="choice-welcome-title">
                  {language.current.finishScreen.message}
                </div>
              </div>
            </div>
          </div>
          <Indicator length={data.length + 1} currentSelect={currentPage} />
          <div className="contents-navigator">
            <div
              className="navigator-prev"
              onClick={() =>
                currentPage === data.length + 1
                  ? handleChangePage(0)
                  : handleChangePage(currentPage - 1)
              }
              style={
                currentPage === 0
                  ? {
                      flex: "0",
                      fontSize: "0px",
                      padding: "0px",
                    }
                  : {
                      flex: "1",
                      fontSize: "2rem",
                      padding: "1rem",
                    }
              }
            >
              {currentPage === data.length + 1
                ? language.current.buttons.return
                : language.current.buttons.previous}
            </div>
            <div
              className="navigator-next"
              onClick={() =>
                selectedCandidate === -1 && currentPage !== 0
                  ? null
                  : handleChangePage(currentPage + 1)
              }
              style={
                currentPage === data.length + 1
                  ? {
                      flex: "0",
                      fontSize: "0px",
                      padding: "0px",
                    }
                  : {
                      flex: "1",
                      fontSize: "2rem",
                      padding: "1rem",
                      backgroundColor:
                        selectedCandidate === -1 && currentPage !== 0
                          ? "var(--color-gray)"
                          : "var(--color-mate-black)",
                    }
              }
            >
              {currentPage === data.length
                ? language.current.buttons.finish
                : language.current.buttons.next}
            </div>
          </div>
          <Background />
        </div>
      ) : (
        <div className="loading-container">
          {language.current.appName}
          <Loading />
          {endpoint.get("endpoint") ? null : (
            <div>
              {language.current.splashScreen.message} <code>endpoint</code>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
