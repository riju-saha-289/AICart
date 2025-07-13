import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ai from "../assets/ai.jpg";
import { Context } from "../context/Context";

export default function Ai() {
  const { searchOpen, setSearchOpen } = useContext(Context);
  const navigate = useNavigate();
  const recogRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  const speak = (msg) => {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
  };

  const playClickSound = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(900, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.12);
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Browser doesn't support Speech Recognition");
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.lang = "en-US";
    recogRef.current = recog;

    recog.onresult = (e) => {
      const transcript = e.results[0][0].transcript.trim().toLowerCase();
      const has = (word) => transcript.includes(word);

      if (has("search") && has("open") && !searchOpen) {
        speak("Opening search");
        setSearchOpen(true);
        navigate("/collection");
      } else if (has("search") && has("close") && searchOpen) {
        speak("Closing search");
        setSearchOpen(false);
      } else if (
        has("collection") ||
        has("collections") ||
        has("product") ||
        has("products")
      ) {
        speak("Opening collections page");
        navigate("/collection");
      } else if (has("about")) {
        speak("Opening about page");
        navigate("/about");
        setSearchOpen(false);
      } else if (has("home")) {
        speak("Opening home page");
        navigate("/");
        setSearchOpen(false);
      } else if (has("cart")) {
        speak("Opening your cart");
        navigate("/cart");
        setSearchOpen(false);
      } else if (has("contact")) {
        speak("Opening contact page");
        navigate("/contact");
        setSearchOpen(false);
      } else if (
        has("order") ||
        has("orders") ||
        has("my order") ||
        has("my orders")
      ) {
        speak("Opening your orders");
        navigate("/orders");
        setSearchOpen(false);
      } else {
        speak("Sorry, I didn't catch that. Try again!");
        toast.error("Sorry, I didn't catch that. Try again!");
      }
    };

    return () => recog.abort();
  }, [navigate, searchOpen, setSearchOpen]);

  const handleClick = () => {
    recogRef.current && recogRef.current.start();
    playClickSound();
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%] z-[9999] flex items-center justify-center"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Activate voice assistant"
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
    >
      <div className="relative w-[60px] sm:w-[80px] md:w-[100px] lg:w-[110px] h-[60px] sm:h-[80px] md:h-[100px] lg:h-[110px] rounded-full p-1 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 animate-spin-slow shadow-2xl shadow-pink-300">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center transition-transform duration-300 transform hover:scale-110 active:scale-125">
          <img
            src={ai}
            alt="AI assistant"
            className="max-w-full max-h-full rounded-full object-contain"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}
