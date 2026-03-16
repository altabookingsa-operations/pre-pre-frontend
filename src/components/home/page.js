"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import InitialHomepage from "./initialHomePage";
import SearchLoader from "./searchLoader";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axiosInstanceAi from "@/utils/axiosInstanceForAi";
const HomePage = () => {
  const [searchLoader, setSearchLoader] = useState(false);
  const [resultPageShow, setResultPageShow] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const debounceTimer = useRef(null);
  const handleSearchRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [coords, setCoords] = useState(null);
  const [citiesData, setCitiesData] = useState(null);
  const [answerData, setAnswerData] = useState(null);
  // geo on initial modal open
  useEffect(() => {
    const handleLocation = (location) => setCoords(location);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (pos?.coords?.latitude && pos?.coords?.longitude) {
            handleLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
          } else {
            getLocation();
          }
        },
        () => getLocation(),
      );
    } else {
      getLocation();
    }
  }, []);

  const searchHandler = useCallback(
    async (queryValue, coordsVal) => {
      try {
        setSearchLoader(true);
        resetTranscript();
        const payload = {
          query: queryValue,
          location: { latitude: coordsVal?.lat, longitude: coordsVal?.lng },
        };
        console.log("Search payload:", payload);
        const response = await axiosInstanceAi.post("/process-query", payload);
        if (response?.status) {
          setResultPageShow(true);
          console.log("Searching for:", response);
          setSearchLoader(false);
          setAnswerData(response?.data?.answer || null);
          console.log("Searching for Cities Data:", response?.data?.cities);
          setCitiesData(response?.data?.cities);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setSearchLoader(false);
      }
    },
    [resetTranscript],
  );

  useEffect(() => {
    handleSearchRef.current = (query, coords) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        if (query.trim()) searchHandler?.(query, coords);
      }, 2000);
    };
    return () => clearTimeout(debounceTimer.current);
  }, [searchHandler]);

  useEffect(() => {
    if (transcript) {
      setSearchQuery(transcript);
      handleSearchRef.current?.(transcript, coords);
    }
    return () => clearTimeout(debounceTimer.current);
  }, [transcript, coords]);

  const getLocation = async () => {
    try {
      const res = await fetch(
        "https://pro.ip-api.com/json/?key=OviSLFVZm5We5p7",
      );
      const data = await res.json();
      console.log("IP Location data:", data);
      if (data?.lat && data?.lon) {
        setCoords({ lat: data.lat, lng: data.lon });
      }
    } catch (err) {
      console.error("IP location error", err);
    }
  };
  const startListening = () => {
    setSearchQuery("");
    SpeechRecognition.startListening({ continuous: true });
  };
  return (
    <>
      {searchLoader ? (
        <SearchLoader />
      ) : (
        <InitialHomepage
          setSearchLoader={setSearchLoader}
          resultPageShow={resultPageShow}
          resetTranscript={resetTranscript}
          transcript={transcript}
          handleSearchRef={handleSearchRef}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          coords={coords}
          citiesData={citiesData}
          answerData={answerData}
          startListening={startListening}
          searchHandler={searchHandler}
        />
      )}
    </>
  );
};
export default HomePage;
